import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import { requireRole } from "@/lib/core/session";

export default async function SeekerDashboardPage() {
  const user = await requireRole("seeker");

  const navLinks = [
    { href: "/dashboard/seeker", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "/dashboard/seeker/jobs", label: "Jobs", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
    { href: "/dashboard/seeker/applications", label: "Applications", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/dashboard/seeker/billing", label: "Billing", icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { href: "/dashboard/seeker/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" }
  ];
  const stats = {
    applications: 24,
    interviews: 8,
    offers: 2,
    profileViews: 156,
    savedJobs: 12,
    responseRate: "68%"
  };

  const recentApplications = [
    { id: 1, company: "Google", position: "Senior Software Engineer", status: "Interview", date: "2 days ago" },
    { id: 2, company: "Amazon", position: "Full Stack Developer", status: "Applied", date: "5 days ago" },
    { id: 3, company: "Microsoft", position: "Frontend Engineer", status: "Rejected", date: "1 week ago" },
    { id: 4, company: "Spotify", position: "React Developer", status: "Offer", date: "2 weeks ago" },
  ];

  const recommendedJobs = [
    { id: 1, title: "Senior Software Engineer", company: "Google", location: "Remote", type: "Full Time", salary: "$150K - $200K" },
    { id: 2, title: "Full Stack Developer", company: "Amazon", location: "San Francisco, CA", type: "Full Time", salary: "$130K - $180K" },
    { id: 3, title: "Frontend Engineer", company: "Netflix", location: "Remote", type: "Full Time", salary: "$140K - $190K" },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Interview': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Applied': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Rejected': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Offer': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {user?.name || "Seeker"}! 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {stats.profileViews} profile views
            </Chip>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/dashboard/seeker";
            return (
              <Link key={link.href} href={link.href} className="flex-1 min-w-[100px]">
                <button
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.applications}</div>
            <div className="text-sm text-blue-400">Applications</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.interviews}</div>
            <div className="text-sm text-purple-400">Interviews</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.offers}</div>
            <div className="text-sm text-green-400">Offers</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.responseRate}</div>
            <div className="text-sm text-yellow-400">Response Rate</div>
          </div>
        </div>

        {/* Recent Applications & Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Applications</h3>
                <Link href="/dashboard/seeker/applications">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{app.position}</p>
                      <p className="text-xs text-gray-400">{app.company} • {app.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recommended Jobs */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recommended Jobs</h3>
                <Link href="/dashboard/seeker/jobs">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{job.title}</p>
                        <p className="text-xs text-gray-400">{job.company} • {job.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full">
                            {job.type}
                          </span>
                          <span className="text-xs text-green-400">{job.salary}</span>
                        </div>
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        <Button size="sm" color="primary" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[60px]">
                          Apply
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 border-0 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/seeker/jobs">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/seeker/saved-jobs">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Saved Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/seeker/applications">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Track Applications
                  </Button>
                </Link>
                <Link href="/dashboard/seeker/settings">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
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
}