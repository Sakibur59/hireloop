"use client";

import React, { useState, useEffect } from "react";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import {
  House,
  Persons,
  HouseFill,
  Briefcase,
  CreditCard,
  Gear,
  Magnifier,
  Plus,
  TrashBin,
  Pencil,
} from "@gravity-ui/icons";

import { getUsersList, updateUserRole, deleteUser } from "@/lib/api/users";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersList();
      setUsers(data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      inactive: "bg-red-500/20 text-red-400 border-red-500/30",
      suspended: "bg-red-500/20 text-red-400 border-red-500/30",
      verified: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return (
      colors[status?.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };

  // Role badge color mapping
  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      recruiter: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      seeker: "bg-green-500/20 text-green-400 border-green-500/30",
      job_seeker: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return (
      colors[role?.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
    { icon: HouseFill, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  // Role change handler
  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const saveRoleChange = async () => {
    if (selectedUser && newRole) {
      try {
        setIsUpdating(true);
        await updateUserRole(selectedUser.id || selectedUser._id, {
          role: newRole,
        });

        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id || user._id === selectedUser._id
            ? { ...user, role: newRole }
            : user,
        );
        setUsers(updatedUsers);
        setIsModalOpen(false);
        setSelectedUser(null);
        setNewRole("");
      } catch (error) {
        console.error("Error updating user role:", error);
        alert("Failed to update user role. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      try {
        await deleteUser(userId);
        setUsers(
          users.filter((user) => user.id !== userId && user._id !== userId),
        );
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified"
        ? user.emailVerified
        : user.status === statusFilter);
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 text-sm">
              Manage all users on the platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Total: {users.length} users
            </Chip>
            <Link href="/dashboard/admin/users/create">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add User
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/dashboard/admin/users";
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="flat"
                  className={
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "border border-white/10 text-white hover:bg-white/10"
                  }
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {link.label}
                </Button>
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
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-sm text-blue-400">Total Users</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {
                users.filter(
                  (u) => u.role === "recruiter" || u.role === "Recruiter",
                ).length
              }
            </div>
            <div className="text-sm text-purple-400">Recruiters</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {
                users.filter(
                  (u) =>
                    u.role === "seeker" ||
                    u.role === "Seeker" ||
                    u.role === "job_seeker",
                ).length
              }
            </div>
            <div className="text-sm text-green-400">Job Seekers</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {
                users.filter((u) => u.status === "active" || u.emailVerified)
                  .length
              }
            </div>
            <div className="text-sm text-green-400">Verified</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Magnifier className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors"
              >
                <option value="all" className="bg-gray-900 text-white">
                  All Roles
                </option>
                <option value="admin" className="bg-gray-900 text-white">
                  Admin
                </option>
                <option value="recruiter" className="bg-gray-900 text-white">
                  Recruiter
                </option>
                <option value="seeker" className="bg-gray-900 text-white">
                  Job Seeker
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors"
              >
                <option value="all" className="bg-gray-900 text-white">
                  All Status
                </option>
                <option value="active" className="bg-gray-900 text-white">
                  Active
                </option>
                <option value="pending" className="bg-gray-900 text-white">
                  Pending
                </option>
                <option value="verified" className="bg-gray-900 text-white">
                  Verified
                </option>
                <option value="inactive" className="bg-gray-900 text-white">
                  Inactive
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

        {/* Users Table */}
        {filteredUsers.length > 0 ? (
          <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id || user._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                            <span className="text-sm font-bold text-blue-400">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {user.id || user._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${getRoleColor(user.role)}`}
                          onClick={() => handleRoleChange(user)}
                        >
                          {user.role || "User"}
                          <span className="ml-1 text-[10px]">▼</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(user.status || (user.emailVerified ? "verified" : "pending"))}`}
                        >
                          {user.emailVerified
                            ? "Verified"
                            : user.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/dashboard/admin/users/${user.id || user._id}`}
                          >
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-blue-500/20 text-blue-400 border border-blue-500/30 min-w-[32px] h-8 w-8 p-0"
                            >
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/admin/users/${user.id || user._id}/edit`}
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
                            onClick={() =>
                              handleDeleteUser(user.id || user._id)
                            }
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
                Showing {filteredUsers.length} of {users.length} users
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
              <Persons className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "No matching users found"
                : "No users found"}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first user"}
            </p>
            {!searchTerm && roleFilter === "all" && statusFilter === "all" && (
              <Link href="/dashboard/admin/users/create">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  Add User
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Role Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-white text-lg font-semibold mb-4">
              Change User Role
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Change role for{" "}
                <span className="text-white font-semibold">
                  {selectedUser?.name}
                </span>
              </p>
              <div className="relative">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors"
                  disabled={isUpdating}
                >
                  <option value="admin" className="bg-gray-900 text-white">
                    Admin
                  </option>
                  <option value="recruiter" className="bg-gray-900 text-white">
                    Recruiter
                  </option>
                  <option value="seeker" className="bg-gray-900 text-white">
                    Job Seeker
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
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors text-sm"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={saveRoleChange}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
