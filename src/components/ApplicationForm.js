'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

export default function ApplicationForm({ internship }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      showToast('Please select a resume', 'error');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('internshipId', internship._id);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/student/dashboard?applied=true');
      } else {
        showToast(data.message || 'Failed to submit application', 'error');
      }
    } catch (error) {
      console.error('Application error:', error);
      showToast('Failed to submit application', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showToast('Please upload a PDF file', 'error');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        showToast('File size should be less than 5MB', 'error');
        e.target.value = '';
        return;
      }
      setResume(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Resume (PDF)
        </label>
        <div className="mt-1">
          <input
            type="file"
            accept=".pdf"
            required
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-gray-900 file:text-white
              dark:file:bg-white dark:file:text-gray-900
              hover:file:cursor-pointer"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          PDF files only, max 5MB
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
} 