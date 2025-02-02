import { connectDB } from '@/lib/db';
import Internship from '@/models/Internship';
import Application from '@/models/Application';
import Notification from '@/models/Notification';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const internship = await Internship.findById(params.id)
      .populate('postedBy', 'name email');

    if (!internship) {
      return errorResponse('Internship not found', 404);
    }

    return successResponse(internship);
  } catch (error) {
    console.error('Internship fetch error:', error);
    return errorResponse('Failed to fetch internship', 500);
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const data = await req.json();
    await connectDB();

    const internship = await Internship.findById(params.id);
    if (!internship) {
      return errorResponse('Internship not found', 404);
    }

    // Verify ownership
    if (internship.postedBy.toString() !== session.user.id) {
      return errorResponse('Not authorized to edit this internship', 403);
    }

    // Update fields
    Object.assign(internship, data);
    await internship.save();

    // Notify applicants about the update
    const applications = await Application.find({ internship: internship._id })
      .populate('student', '_id');

    if (applications.length > 0) {
      const notifications = applications.map(app => ({
        title: 'Internship Updated',
        message: `The internship "${internship.title}" has been updated`,
        type: 'general',
        recipient: app.student._id,
      }));

      await Notification.insertMany(notifications);
    }

    return successResponse(internship);
  } catch (error) {
    console.error('Internship update error:', error);
    return errorResponse('Failed to update internship', 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    const internship = await Internship.findById(params.id);

    if (!internship) {
      return errorResponse('Internship not found', 404);
    }

    // Verify ownership
    if (internship.postedBy.toString() !== session.user.id) {
      return errorResponse('Not authorized to delete this internship', 403);
    }

    // Delete associated applications
    await Application.deleteMany({ internship: internship._id });

    // Delete the internship
    await internship.deleteOne();

    return successResponse({ message: 'Internship deleted successfully' });
  } catch (error) {
    console.error('Internship deletion error:', error);
    return errorResponse('Failed to delete internship', 500);
  }
} 