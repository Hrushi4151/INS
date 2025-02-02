import { connectDB } from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { uploadFile } from '@/lib/upload';
import Notification from '@/models/Notification';
import { uploadConfig } from '@/config/upload';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    const applications = await Application.find({ student: session.user.id })
      .sort({ createdAt: -1 })
      .populate('internship');

    return successResponse(applications);
  } catch (error) {
    console.error('Applications fetch error:', error);
    return errorResponse('Failed to fetch applications', 500);
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'student') {
      return errorResponse('Unauthorized', 401);
    }

    const formData = await req.formData();
    const internshipId = formData.get('internshipId');
    const resumeFile = formData.get('resume');

    if (!internshipId || !resumeFile) {
      return errorResponse('Missing required fields', 400);
    }

    await connectDB();

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: session.user.id,
      internship: internshipId,
    });

    if (existingApplication) {
      return errorResponse('You have already applied for this internship', 400);
    }

    // Upload resume
    const resumeUrl = await uploadFile(resumeFile, 'resumes');

    // Create application
    const application = new Application({
      student: session.user.id,
      internship: internshipId,
      resume: resumeUrl,
      status: 'pending',
    });

    await application.save();

    // Create notification for admin
    const internship = await Application.findById(internshipId).populate('postedBy');
    const notification = new Notification({
      title: 'New Application',
      message: `A new application has been submitted for ${internship.title}`,
      type: 'application_update',
      recipient: internship.postedBy._id,
    });
    await notification.save();

    return successResponse(application, 201);
  } catch (error) {
    console.error('Application creation error:', error);
    return errorResponse('Failed to create application', 500);
  }
} 