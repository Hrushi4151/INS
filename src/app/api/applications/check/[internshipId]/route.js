import { connectDB } from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    const application = await Application.findOne({
      student: session.user.id,
      internship: params.internshipId,
    });

    return successResponse(application);
  } catch (error) {
    console.error('Application check error:', error);
    return errorResponse('Failed to check application', 500);
  }
} 