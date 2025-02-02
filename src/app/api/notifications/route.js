import { connectDB } from '@/lib/db';
import Notification from '@/models/Notification';
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
    const notifications = await Notification.find({
      recipient: session.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    return successResponse(notifications);
  } catch (error) {
    console.error('Notifications fetch error:', error);
    return errorResponse('Failed to fetch notifications', 500);
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();
    await Notification.updateMany(
      { recipient: session.user.id, read: false },
      { read: true }
    );

    return successResponse({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Notifications update error:', error);
    return errorResponse('Failed to update notifications', 500);
  }
} 