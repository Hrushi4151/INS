import { connectDB } from '@/lib/db';
import Internship from '@/models/Internship';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    // Get all filter parameters
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const duration = searchParams.get('duration');
    const hideExpired = searchParams.get('hideExpired') === 'true';
    const postedByMe = searchParams.get('postedByMe') === 'true';

    // Build query
    const query = {};

    // Search in title and company
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Duration filter
    if (duration) {
      const [min, max] = duration.split('-');
      if (max) {
        query.duration = { $gte: parseInt(min), $lte: parseInt(max) };
      } else {
        // For "6+" case
        query.duration = { $gte: parseInt(min) };
      }
    }

    // Hide expired internships
    if (hideExpired) {
      query.deadline = { $gt: new Date() };
    }

    // Filter by admin's own internships
    if (postedByMe) {
      const session = await getServerSession(authOptions);
      if (!session) {
        return errorResponse('Unauthorized', 401);
      }
      query.postedBy = session.user.id;
    }

    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email');

    // Get application counts for each internship
    const applicationCounts = await Application.aggregate([
      { $group: { _id: '$internship', count: { $sum: 1 } } }
    ]);

    const countsMap = applicationCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count;
      return acc;
    }, {});

    // Add application count to each internship
    const internshipsWithCounts = internships.map(internship => {
      const doc = internship.toObject();
      doc.applicationCount = countsMap[internship._id.toString()] || 0;
      return doc;
    });

    return successResponse(internshipsWithCounts);
  } catch (error) {
    console.error('Internships fetch error:', error);
    return errorResponse('Failed to fetch internships', 500);
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const data = await req.json();
    await connectDB();

    const internship = new Internship({
      ...data,
      postedBy: session.user.id,
    });

    await internship.save();

    return successResponse(internship, 201);
  } catch (error) {
    console.error('Internship creation error:', error);
    return errorResponse('Failed to create internship', 500);
  }
} 