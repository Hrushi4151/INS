import { connectDB } from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'student') {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    const applications = await Application.find({ student: session.user.id })
      .sort({ createdAt: -1 })
      .populate('internship', 'title company location stipend duration');

    return successResponse(applications);
  } catch (error) {
    console.error('Student applications fetch error:', error);
    return errorResponse('Failed to fetch applications', 500);
  }
} 