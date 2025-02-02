'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/Loading';
import InternshipCard from '@/components/InternshipCard';
import SearchFilters from '@/components/SearchFilters';

export default function BrowseInternships() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    duration: '',
    hideExpired: true,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [internshipsRes, applicationsRes] = await Promise.all([
        fetch('/api/internships?' + new URLSearchParams(filters)),
        fetch('/api/applications'),
      ]);

      const [internshipsData, applicationsData] = await Promise.all([
        internshipsRes.json(),
        applicationsRes.json(),
      ]);

      if (internshipsRes.ok) {
        setInternships(internshipsData);
      }
      if (applicationsRes.ok) {
        // Create a map of internship ID to application
        const appMap = applicationsData.reduce((acc, app) => {
          acc[app.internship._id] = app;
          return acc;
        }, {});
        setApplications(appMap);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load internships', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Browse Internships
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <SearchFilters filters={filters} onChange={handleFilterChange} />

          {internships.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No internships found
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {internships.map((internship) => (
                <InternshipCard
                  key={internship._id}
                  internship={internship}
                  application={applications[internship._id]}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 