'use client';
import InternshipForm from '@/components/InternshipForm';

export default function NewInternship() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Post New Internship
        </h1>
        <InternshipForm />
      </div>
    </div>
  );
} 