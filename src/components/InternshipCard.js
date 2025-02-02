'use client';
import Link from 'next/link';
import ApplicationBadge from './ApplicationBadge';
import { 
  RiBuilding2Line, 
  RiMapPinLine, 
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiArrowRightLine 
} from 'react-icons/ri';

export default function InternshipCard({ internship, application }) {
  const isDeadlinePassed = new Date(internship.deadline) < new Date();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {internship.title}
        </h3>
        {application && (
          <ApplicationBadge status={application.status} />
        )}
      </div>

      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p className="flex items-center">
          <RiBuilding2Line className="w-4 h-4 mr-2" />
          {internship.company}
        </p>
        <p className="flex items-center">
          <RiMapPinLine className="w-4 h-4 mr-2" />
          {internship.location}
        </p>
        <p className="flex items-center">
          <RiTimeLine className="w-4 h-4 mr-2" />
          Duration: {internship.duration} months
        </p>
        <p className="flex items-center">
          <RiMoneyDollarCircleLine className="w-4 h-4 mr-2" />
          Stipend: {internship.stipend}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <RiCalendarLine className="w-4 h-4 mr-2" />
          Deadline: {new Date(internship.deadline).toLocaleDateString()}
          {isDeadlinePassed && (
            <span className="ml-2 text-red-600 dark:text-red-400">
              (Closed)
            </span>
          )}
        </div>
        <Link
          href={`/student/internships/${internship._id}`}
          className="flex items-center text-sm font-medium text-gray-900 dark:text-white hover:underline"
        >
          View Details
          <RiArrowRightLine className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
} 