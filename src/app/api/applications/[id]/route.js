import { connectDB } from '@/lib/db';
import Application from '@/models/Application';
import Notification from '@/models/Notification';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const data = await req.json();
    await connectDB();

    const application = await Application.findById(params.id)
      .populate('internship')
      .populate('student');

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // Verify the admin owns this internship
    if (application.internship.postedBy.toString() !== session.user.id) {
      return errorResponse('Not authorized to update this application', 403);
    }

    // Update status
    application.status = data.status;
    await application.save();

    // Create notification for student
    const notification = new Notification({
      title: `Application ${data.status}`,
      message: `Your application for "${application.internship.title}" has been ${data.status}`,
      type: 'application',
      recipient: application.student._id,
    });
    await notification.save();

    return successResponse(application);
  } catch (error) {
    console.error('Application update error:', error);
    return errorResponse('Failed to update application', 500);
  }
} 