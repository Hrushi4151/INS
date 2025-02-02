import { connectDB } from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const { status } = await req.json();
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return errorResponse('Invalid status', 400);
    }

    await connectDB();
    const application = await Application.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate('student', 'name email');

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    return successResponse(application);
  } catch (error) {
    console.error('Application status update error:', error);
    return errorResponse('Failed to update application status', 500);
  }
} 