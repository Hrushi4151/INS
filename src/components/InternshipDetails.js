'use client';

export default function InternshipDetails({ internship }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Company Details
          </h2>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>{internship.company}</p>
            <p>{internship.location}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Internship Details
          </h2>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Duration: {internship.duration} months</p>
            <p>Stipend: {internship.stipend}</p>
            <p>
              Application Deadline:{' '}
              {new Date(internship.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Description
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
          {internship.description}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Requirements
        </h2>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
          {internship.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Posted By
        </h2>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <p>{internship.postedBy.name}</p>
          <p>{internship.postedBy.email}</p>
        </div>
      </div>
    </div>
  );
} 