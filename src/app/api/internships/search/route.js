import { connectDB } from '@/lib/db';
import Internship from '@/models/Internship';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const duration = searchParams.get('duration') || '';
    const sortBy = searchParams.get('sortBy') || 'newest';

    await connectDB();

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (duration) {
      switch (duration) {
        case '1-3':
          query.duration = { $gte: '1', $lte: '3' };
          break;
        case '3-6':
          query.duration = { $gte: '3', $lte: '6' };
          break;
        case '6+':
          query.duration = { $gte: '6' };
          break;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort
    const sort = {};
    switch (sortBy) {
      case 'deadline':
        sort.deadline = 1;
        break;
      case 'stipend-high':
        sort.stipend = -1;
        break;
      case 'stipend-low':
        sort.stipend = 1;
        break;
      default:
        sort.createdAt = -1;
    }

    // Execute query
    const [internships, total] = await Promise.all([
      Internship.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('postedBy', 'name'),
      Internship.countDocuments(query),
    ]);

    return successResponse({
      internships,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return errorResponse('Failed to search internships', 500);
  }
} 