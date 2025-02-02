import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    const user = await User.findById(session.user.id).select('-password');

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return errorResponse('Failed to fetch profile', 500);
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    const data = await req.json();
    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return errorResponse('User not found', 404);
    }

    // Update allowed fields
    const allowedFields = ['name', 'bio'];
    if (session.user.role === 'student') {
      allowedFields.push('department', 'year');
    }

    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        user[field] = data[field];
      }
    });

    await user.save();

    return successResponse(user);
  } catch (error) {
    console.error('Profile update error:', error);
    return errorResponse('Failed to update profile', 500);
  }
} 