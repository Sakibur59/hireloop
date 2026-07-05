import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Chip, Button } from "@heroui/react";
import Link from "next/link";
import {
  House,
  Briefcase,
  Pencil,
  Factory,
  Envelope,
  Person,
  Gear,
  Eye,
  TrashBin,
  Plus,
} from "@gravity-ui/icons";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  const jobs = (await getCompanyJobs(company._id)) || [];

  const navLinks = [
    { href: "/dashboard/recruiter", label: "Home", icon: House },
    { href: "/dashboard/recruiter/jobs", label: "Jobs", icon: Briefcase },
    {
      href: "/dashboard/recruiter/post-job",
      label: "Post A Job",
      icon: Pencil,
    },
    {
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
      icon: Factory,
    },
    {
      href: "/dashboard/recruiter/messages",
      label: "Messages",
      icon: Envelope,
    },
    { href: "/dashboard/recruiter/profile", label: "Profile", icon: Person },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Gear },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Jobs</h1>
            <p className="text-gray-400 text-sm">
              View, update, and manage your current job postings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {jobs.length} Total Jobs
            </Chip>
            <Link href="/dashboard/recruiter/post-job">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/dashboard/recruiter/jobs";
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex-1 min-w-[100px]"
              >
                <button
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{jobs.length}</div>
            <div className="text-sm text-blue-400">Total Jobs</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {jobs.filter((j) => j.status?.toLowerCase() === "active").length}
            </div>
            <div className="text-sm text-green-400">Active</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {jobs.filter((j) => j.status?.toLowerCase() === "pending").length}
            </div>
            <div className="text-sm text-yellow-400">Pending</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {
                jobs.filter(
                  (j) =>
                    j.status?.toLowerCase() === "inactive" ||
                    j.status?.toLowerCase() === "closed",
                ).length
              }
            </div>
            <div className="text-sm text-red-400">Closed</div>
          </div>
        </div>

        {/* Jobs Table */}
        {jobs.length > 0 ? (
          <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type / Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {jobs.map((job) => (
                    <tr
                      key={job._id?.$oid || job._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {job.jobTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            Posted:{" "}
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm capitalize text-gray-300">
                            {job.jobType || "Full Time"}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {job.jobCategory || "Technology"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">
                          {job.isRemote ? "Remote" : job.location || "Onsite"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(job.status)}`}
                        >
                          {job.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {job.applicantsCount || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id?.$oid || job._id}`}
                          >
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-blue-500/20 text-blue-400 border border-blue-500/30 min-w-[32px] h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id?.$oid || job._id}/edit`}
                          >
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-green-500/20 text-green-400 border border-green-500/30 min-w-[32px] h-8 w-8 p-0"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="flat"
                            className="bg-red-500/20 text-red-400 border border-red-500/30 min-w-[32px] h-8 w-8 p-0"
                          >
                            <TrashBin className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center py-4 px-6 border-t border-white/10">
              <div className="text-sm text-gray-400">
                Showing {jobs.length} jobs
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors text-sm">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 border border-blue-500/30 rounded-lg text-white text-sm">
                  1
                </button>
                <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors text-sm">
                  2
                </button>
                <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors text-sm">
                  3
                </button>
                <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-900/50 border border-white/10 rounded-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full border border-white/10 mb-4">
              <Briefcase className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No jobs posted yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start by posting your first job
            </p>
            <Link href="/dashboard/recruiter/post-job">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Post New Job
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobs;
