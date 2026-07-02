import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import { 
  House, 
  Persons, 
  HouseFill, 
  Briefcase, 
  CreditCard, 
  Gear 
} from "@gravity-ui/icons";

const AdminDashboardHomePage = () => {
  const stats = {
    totalUsers: 15243,
    totalCompanies: 1250,
    totalJobs: 3420,
    totalApplications: 8765,
    newUsersThisWeek: 342,
    newCompaniesThisWeek: 28,
    activeJobs: 1890,
    pendingApprovals: 45,
    satisfactionRate: 97,
  };

  const recentActivities = [
    {
      id: 1,
      type: "user",
      name: "John Doe",
      action: "signed up",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "company",
      name: "TechCorp",
      action: "posted a job",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "application",
      name: "Sarah Smith",
      action: "applied for Senior Developer",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "company",
      name: "DesignHub",
      action: "verified their profile",
      time: "3 hours ago",
    },
    {
      id: 5,
      type: "user",
      name: "Mike Johnson",
      action: "updated profile",
      time: "5 hours ago",
    },
  ];

  const pendingReviews = [
    {
      id: 1,
      company: "StartupX",
      type: "Company Verification",
      status: "pending",
      submitted: "2 hours ago",
    },
    {
      id: 2,
      company: "FinTech Pro",
      type: "Job Posting",
      status: "pending",
      submitted: "5 hours ago",
    },
    {
      id: 3,
      company: "HealthCare Plus",
      type: "Company Verification",
      status: "pending",
      submitted: "1 day ago",
    },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
    { icon: HouseFill, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Last login: Today 10:30 AM
            </Chip>
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - Horizontal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/dashboard/admin";
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">
                  Total Users
                </span>
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <Persons className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {stats.totalUsers.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-500 text-sm font-medium">
                  +{stats.newUsersThisWeek}
                </span>
                <span className="text-gray-500 text-sm">this week</span>
              </div>
            </div>
          </Card>

          {/* Total Companies */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">
                  Total Companies
                </span>
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <HouseFill className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {stats.totalCompanies.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-500 text-sm font-medium">
                  +{stats.newCompaniesThisWeek}
                </span>
                <span className="text-gray-500 text-sm">this week</span>
              </div>
            </div>
          </Card>

          {/* Total Jobs */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">
                  Total Jobs
                </span>
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <Briefcase className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {stats.totalJobs.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-500 text-sm font-medium">
                  {stats.activeJobs.toLocaleString()} active
                </span>
                <span className="text-gray-500 text-sm">jobs</span>
              </div>
            </div>
          </Card>

          {/* Applications */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">
                  Applications
                </span>
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <svg
                    className="w-5 h-5 text-orange-400"
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
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {stats.totalApplications.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500 text-sm font-medium">
                  {stats.pendingApprovals} pending
                </span>
                <span className="text-gray-500 text-sm">approvals</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Second Row - Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Satisfaction Rate</p>
                  <div className="text-3xl font-bold text-white mt-1">
                    {stats.satisfactionRate}%
                  </div>
                </div>
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <svg
                    className="w-7 h-7 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  style={{ width: "97%" }}
                ></div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Reviews</p>
                  <div className="text-3xl font-bold text-white mt-1">
                    {stats.pendingApprovals}
                  </div>
                </div>
                <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                  <svg
                    className="w-7 h-7 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <Link href="/dashboard/admin/companies">
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-4 w-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  Review Now
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Job Postings Today</p>
                  <div className="text-3xl font-bold text-white mt-1">24</div>
                </div>
                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <svg
                    className="w-7 h-7 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                +12 compared to yesterday
              </p>
            </div>
          </Card>
        </div>

        {/* Recent Activity & Pending Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Recent Activity
                </h3>
                <Link href="/dashboard/admin/users">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      {activity.type === "user" && (
                        <Persons className="w-4 h-4 text-blue-400" />
                      )}
                      {activity.type === "company" && (
                        <HouseFill className="w-4 h-4 text-purple-400" />
                      )}
                      {activity.type === "application" && (
                        <svg
                          className="w-4 h-4 text-green-400"
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
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="font-semibold">{activity.name}</span>
                        <span className="text-gray-400">
                          {" "}
                          {activity.action}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Pending Reviews */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Pending Reviews
                </h3>
                <Chip
                  color="warning"
                  variant="flat"
                  size="sm"
                  className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                >
                  {pendingReviews.length} pending
                </Chip>
              </div>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {review.company}
                      </p>
                      <p className="text-xs text-gray-400">{review.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted {review.submitted}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="success"
                        variant="flat"
                        className="bg-green-500/20 text-green-400 border border-green-500/30 min-w-[60px]"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        className="bg-red-500/20 text-red-400 border border-red-500/30 min-w-[60px]"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {pendingReviews.length === 0 && (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-600 mx-auto mb-2"
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
                  <p className="text-gray-400">
                    All caught up! No pending reviews.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 border-0 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/admin/companies/add">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
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
                    Add Company
                  </Button>
                </Link>
                <Link href="/dashboard/admin/jobs/create">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Briefcase className="w-4 h-4 mr-1" />
                    Post Job
                  </Button>
                </Link>
                <Link href="/dashboard/admin/companies">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Verify Company
                  </Button>
                </Link>
                <Link href="/dashboard/admin/settings">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Gear className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;