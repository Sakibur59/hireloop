"use client";

import React, { useState } from "react";
import { Table, Button, Badge, Chip } from "@heroui/react";
import {
  CircleCheck,
  CircleXmark,
  Clock,
  Envelope,
  Briefcase,
  Eye,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import { updateCompany } from "@/lib/actions/companies";

const CompanyTable = ({ companies }) => {
  const [loading, setLoading] = useState({});

  const handleApprove = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: "approving" }));
    try {
      const result = await updateCompany(id, { status: "Approved" });
      if (result.modifiedCount) {
        console.log(`Approved company with ID: ${id}`, result);
      }
    } catch (error) {
      console.error("Error approving company:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: "rejecting" }));
    try {
      const result = await updateCompany(id, { status: "Rejected" });
      if (result.modifiedCount) {
        console.log(`Rejected company with ID: ${id}`, result);
      }
    } catch (error) {
      console.error("Error rejecting company:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          color: "bg-green-500/20 text-green-400 border-green-500/30",
          label: "Approved",
          icon: CircleCheck,
        };
      case "rejected":
        return {
          color: "bg-red-500/20 text-red-400 border-red-500/30",
          label: "Rejected",
          icon: CircleXmark,
        };
      case "pending":
      default:
        return {
          color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          label: "Pending",
          icon: Clock,
        };
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "CO";
  };

  const getColorForCompany = (name) => {
    const colors = [
      "from-blue-500/20 to-blue-600/20 text-blue-400",
      "from-purple-500/20 to-purple-600/20 text-purple-400",
      "from-green-500/20 to-green-600/20 text-green-400",
      "from-orange-500/20 to-orange-600/20 text-orange-400",
      "from-pink-500/20 to-pink-600/20 text-pink-400",
      "from-cyan-500/20 to-cyan-600/20 text-cyan-400",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Recruiter
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Jobs
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {companies.map((company) => {
              const companyId = company._id?.$oid || company._id;
              const statusInfo = getStatusDetails(company.status);
              const StatusIcon = statusInfo.icon;
              const isLoading = loading[companyId];
              const colorClass = getColorForCompany(company.name);

              return (
                <tr
                  key={companyId}
                  className="hover:bg-white/5 transition-colors group"
                >
                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center border border-white/10 font-bold`}
                      >
                        {getInitials(company.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {company.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {companyId?.slice(-6) || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Recruiter Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Envelope className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-300">
                        {company.recruiterEmail ||
                          `recruiter@${company.name?.toLowerCase().replace(/\s+/g, "")}.com`}
                      </span>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="px-6 py-4">
                    <span className="text-xs bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full border border-white/10 capitalize">
                      {company.industry || "N/A"}
                    </span>
                  </td>

                  {/* Jobs Count */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-sm text-gray-300">
                        {company.jobCount || 0}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${statusInfo.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* Submitted */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">
                      {formatDate(
                        company.createdAt?.$date || company.createdAt,
                      )}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {company.status?.toLowerCase() !== "approved" && (
                        <button
                          onClick={() => handleApprove(companyId)}
                          disabled={isLoading === "approving"}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                            isLoading === "approving"
                              ? "bg-green-500/20 text-green-400/50 cursor-not-allowed"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                          }`}
                        >
                          {isLoading === "approving" ? (
                            <>
                              <div className="w-3 h-3 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                              Approving...
                            </>
                          ) : (
                            <>
                              <CircleCheck className="w-3.5 h-3.5" />
                              Approve
                            </>
                          )}
                        </button>
                      )}
                      {company.status?.toLowerCase() !== "rejected" && (
                        <button
                          onClick={() => handleReject(companyId)}
                          disabled={isLoading === "rejecting"}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                            isLoading === "rejecting"
                              ? "bg-red-500/20 text-red-400/50 cursor-not-allowed"
                              : "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                          }`}
                        >
                          {isLoading === "rejecting" ? (
                            <>
                              <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <CircleXmark className="w-3.5 h-3.5" />
                              Reject
                            </>
                          )}
                        </button>
                      )}
                      <button
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                        title="Delete"
                      >
                        <TrashBin className="w-4 h-4" />
                      </button>
                    </div>
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

export default CompanyTable;
