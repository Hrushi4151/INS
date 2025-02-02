import { uploadFile } from '@/lib/uploadFile';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file provided' }), {
        status: 400,
      });
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return new Response(JSON.stringify({ message: 'Only PDF files are allowed' }), {
        status: 400,
      });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ message: 'File size must be less than 5MB' }), {
        status: 400,
      });
    }

    const filePath = await uploadFile(file, 'resumes');

    return new Response(JSON.stringify({ filePath }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload file' }), {
      status: 500,
    });
  }
} 