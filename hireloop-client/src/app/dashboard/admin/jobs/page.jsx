import { Card, Chip, Input, Select, Button, Pagination } from "@heroui/react";
import Link from "next/link";
import { getJobs } from "@/lib/api/jobs";

export default async function AdminJobsPage() {
  const jobsData = await getJobs();

  const jobs = jobsData?.data || [];
  const total = jobsData?.total || 0;
  const currentPage = jobsData?.page || 1;
  const totalPages = jobsData?.totalPages || 1;

  const getStatusTextColor = (status) => {
    const colors = {
      active: "text-green-400",
      pending: "text-yellow-400",
      reviewing: "text-blue-400",
      rejected: "text-red-400",
      expired: "text-gray-400",
      closed: "text-red-400",
    };
    return colors[status?.toLowerCase()] || "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Job Management</h1>
            <p className="text-gray-400 text-sm">
              Manage all job postings on the platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Total: {total} jobs
            </Chip>
            <Link href="/admin/jobs/create">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Post New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-green-400">Active</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-yellow-400">Pending</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-blue-400">Reviewing</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-red-400">Closed</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-gray-400">Expired</div>
          </div>
        </div>

        {/* Search & Filter - HeroUI Components with proper styling */}
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keywords..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="all" className="bg-gray-900 text-white">
                  All Status
                </option>
                <option value="active" className="bg-gray-900 text-white">
                  Active
                </option>
                <option value="pending" className="bg-gray-900 text-white">
                  Pending
                </option>
                <option value="reviewing" className="bg-gray-900 text-white">
                  Reviewing
                </option>
                <option value="closed" className="bg-gray-900 text-white">
                  Closed
                </option>
                <option value="expired" className="bg-gray-900 text-white">
                  Expired
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="all" className="bg-gray-900 text-white">
                  All Types
                </option>
                <option value="full-time" className="bg-gray-900 text-white">
                  Full Time
                </option>
                <option value="part-time" className="bg-gray-900 text-white">
                  Part Time
                </option>
                <option value="contract" className="bg-gray-900 text-white">
                  Contract
                </option>
                <option value="freelance" className="bg-gray-900 text-white">
                  Freelance
                </option>
                <option value="internship" className="bg-gray-900 text-white">
                  Internship
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="all" className="bg-gray-900 text-white">
                  All
                </option>
                <option value="remote" className="bg-gray-900 text-white">
                  Remote
                </option>
                <option value="onsite" className="bg-gray-900 text-white">
                  Onsite
                </option>
                <option value="hybrid" className="bg-gray-900 text-white">
                  Hybrid
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State - No Jobs Found */}
        <div className="text-center py-16 bg-gray-900/50 border border-white/10 rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full border border-white/10 mb-4">
            <svg
              className="w-10 h-10 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No jobs found
          </h3>
          <p className="text-gray-400 mb-6">Start by posting your first job</p>
          <Link href="/admin/jobs/create">
            <Button
              color="primary"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Post New Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
