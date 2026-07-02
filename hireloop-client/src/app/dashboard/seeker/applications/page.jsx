import React from "react";
import ApplicationsTable from "./ApplicationTable";
import { getUserSession, requireRole } from "@/lib/core/session";
import { getApplicationsByApplicant } from "@/lib/api/applications";

const ApplicationsPage = async () => {
  const user = await requireRole("seeker");
  const session = await getUserSession();
  const jobs = await getApplicationsByApplicant(user.id);

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Applications</h1>
            <p className="text-gray-400 text-sm">
              Track all your job applications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm">
              {jobs?.length || 0} applications
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <a href="/dashboard/seeker">
            <button className="border border-white/10 text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </button>
          </a>
          <a href="/dashboard/seeker/jobs">
            <button className="border border-white/10 text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4 inline mr-1"
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
              Jobs
            </button>
          </a>
          <a href="/dashboard/seeker/saved-jobs">
            <button className="border border-white/10 text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Saved Jobs
            </button>
          </a>
          <a href="/dashboard/seeker/applications">
            <button className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-medium">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Applications
            </button>
          </a>
          <a href="/dashboard/seeker/profile">
            <button className="border border-white/10 text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </button>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ApplicationsTable jobs={jobs || []} />
      </div>
    </div>
  );
};

export default ApplicationsPage;
