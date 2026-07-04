"use client";

import React from "react";
import { Chip, Button } from "@heroui/react";
import Link from "next/link";

const formatRelativeTime = (dateString) => {
  if (!dateString) return "Recently";

  const now = new Date();
  const appliedDate = new Date(dateString);
  const diffInMs = now - appliedDate;

  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  if (diffInHours < 24) {
    return diffInHours <= 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
};


const getJobStyle = (title) => {
  const lowerTitle = title?.toLowerCase() || "";
  if (lowerTitle.includes("frontend") || lowerTitle.includes("web")) {
    return { icon: "💻", bg: "bg-blue-500/10 text-blue-400" };
  }
  if (lowerTitle.includes("designer") || lowerTitle.includes("product")) {
    return { icon: "🎨", bg: "bg-purple-500/10 text-purple-400" };
  }
  if (lowerTitle.includes("data") || lowerTitle.includes("scientist")) {
    return { icon: "📊", bg: "bg-green-500/10 text-green-400" };
  }
  if (lowerTitle.includes("cloud") || lowerTitle.includes("architect")) {
    return { icon: "☁️", bg: "bg-cyan-500/10 text-cyan-400" };
  }
  if (lowerTitle.includes("ai") || lowerTitle.includes("research")) {
    return { icon: "🧠", bg: "bg-red-500/10 text-red-400" };
  }
  if (lowerTitle.includes("devops") || lowerTitle.includes("engineer")) {
    return { icon: "⚙️", bg: "bg-orange-500/10 text-orange-400" };
  }
  return { icon: "💼", bg: "bg-gray-500/10 text-gray-400" };
};

// Helper mapping for the status badges
const getStatusChip = (status = "Applied") => {
  const normalized = status?.toLowerCase() || "applied";
  switch (normalized) {
    case "applied":
      return (
        <Chip
          variant="bordered"
          className="border-blue-500/50 text-blue-400 text-xs font-medium px-3 py-1 bg-blue-500/10"
        >
          Applied
        </Chip>
      );
    case "review":
    case "reviewing":
      return (
        <Chip
          variant="bordered"
          className="border-yellow-500/50 text-yellow-400 text-xs font-medium px-3 py-1 bg-yellow-500/10"
        >
          Review
        </Chip>
      );
    case "shortlisted":
      return (
        <Chip
          variant="bordered"
          className="border-green-500/50 text-green-400 text-xs font-medium px-3 py-1 bg-green-500/10"
        >
          Shortlisted
        </Chip>
      );
    case "rejected":
      return (
        <Chip
          variant="bordered"
          className="border-red-500/50 text-red-400 text-xs font-medium px-3 py-1 bg-red-500/10"
        >
          Rejected
        </Chip>
      );
    case "offered":
      return (
        <Chip
          variant="bordered"
          className="border-purple-500/50 text-purple-400 text-xs font-medium px-3 py-1 bg-purple-500/10"
        >
          Offered
        </Chip>
      );
    case "interview":
      return (
        <Chip
          variant="bordered"
          className="border-indigo-500/50 text-indigo-400 text-xs font-medium px-3 py-1 bg-indigo-500/10"
        >
          Interview
        </Chip>
      );
    default:
      return (
        <Chip
          variant="bordered"
          className="border-gray-500/50 text-gray-400 text-xs font-medium px-3 py-1 bg-gray-500/10"
        >
          {status}
        </Chip>
      );
  }
};

const ApplicationsTable = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-12 text-center">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No applications yet
        </h3>
        <p className="text-gray-400 mb-6">
          Start applying to jobs and track your progress here
        </p>
        <Link href="/dashboard/seeker/jobs">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
            Browse Jobs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">
          Applications ({jobs.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {jobs.map((job, index) => {
              const style = getJobStyle(job.jobTitle);
              const workType = job.workType || "Full-time";
              const locationType = job.locationType || "Remote";
              const status = job.status || "Applied";
              const companyName =
                job.companyName || job.company || "Unknown Company";

              return (
                <tr
                  key={job._id?.$oid || job.jobId || index}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${style.bg}`}
                      >
                        <span className="text-lg">{style.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {job.jobTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          {workType} • {locationType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{companyName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">
                      {formatRelativeTime(
                        job.createdAt?.$date ||
                          job.createdAt ||
                          job.appliedDate,
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusChip(status)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/jobs/${job.jobId}`}>
                      <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
