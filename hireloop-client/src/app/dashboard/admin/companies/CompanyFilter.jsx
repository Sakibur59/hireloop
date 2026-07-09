"use client";

import React, { useState } from "react";
import CompanyTable from "@/Components/dashboard/CompanyTable";
import { HouseFill } from "@gravity-ui/icons";

const CompanyFilter = ({ companies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // Filter companies based on search, status, and industry
  let filteredCompanies = companies;

  if (searchTerm) {
    filteredCompanies = filteredCompanies.filter(
      (c) =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.recruiterEmail?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (statusFilter !== "all") {
    filteredCompanies = filteredCompanies.filter(
      (c) => c.status?.toLowerCase() === statusFilter.toLowerCase(),
    );
  }

  if (industryFilter !== "all") {
    filteredCompanies = filteredCompanies.filter(
      (c) => c.industry?.toLowerCase() === industryFilter.toLowerCase(),
    );
  }

  return (
    <>
      {/* Search & Filter */}
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                placeholder="Search companies by name, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all" className="bg-gray-900 text-white">
                All Status
              </option>
              <option value="pending" className="bg-gray-900 text-white">
                Pending
              </option>
              <option value="approved" className="bg-gray-900 text-white">
                Approved
              </option>
              <option value="rejected" className="bg-gray-900 text-white">
                Rejected
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
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all" className="bg-gray-900 text-white">
                All Industries
              </option>
              <option value="technology" className="bg-gray-900 text-white">
                Technology
              </option>
              <option value="design" className="bg-gray-900 text-white">
                Design
              </option>
              <option value="marketing" className="bg-gray-900 text-white">
                Marketing
              </option>
              <option value="finance" className="bg-gray-900 text-white">
                Finance
              </option>
              <option value="healthcare" className="bg-gray-900 text-white">
                Healthcare
              </option>
              <option value="education" className="bg-gray-900 text-white">
                Education
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

      {/* Company Table */}
      {filteredCompanies.length > 0 ? (
        <CompanyTable companies={filteredCompanies} />
      ) : (
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full border border-white/10 mb-4">
            <HouseFill className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No companies found
          </h3>
          <p className="text-gray-400">
            {searchTerm || statusFilter !== "all" || industryFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Start by adding your first company"}
          </p>
        </div>
      )}
    </>
  );
};

export default CompanyFilter;
