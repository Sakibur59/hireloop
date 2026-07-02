import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button, Avatar, Progress } from "@heroui/react";
import Link from "next/link";

export default async function JobSeekerDashboardPage() {
  const user = await requireRole("seeker");
  const session = await getUserSession();
  const jobSeekerData = {
    name: user?.name || "Job Seeker",
    email: user?.email || "seeker@email.com",
    avatar: user?.name?.charAt(0)?.toUpperCase() || "J",
    joined: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "January 2024",
    title: "Software Engineer",
    location: "San Francisco, CA",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
    experience: "5 years",
    education: "B.S. Computer Science",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Looking for exciting opportunities in tech.",
    stats: {
      applications: 24,
      interviews: 8,
      offers: 2,
      profileViews: 156,
      savedJobs: 12,
      responseRate: "68%",
    },
    recentApplications: [
      {
        id: 1,
        company: "Google",
        position: "Senior Software Engineer",
        status: "Interview",
        date: "2 days ago",
      },
      {
        id: 2,
        company: "Amazon",
        position: "Full Stack Developer",
        status: "Applied",
        date: "5 days ago",
      },
      {
        id: 3,
        company: "Microsoft",
        position: "Frontend Engineer",
        status: "Rejected",
        date: "1 week ago",
      },
      {
        id: 4,
        company: "Spotify",
        position: "React Developer",
        status: "Offer",
        date: "2 weeks ago",
      },
    ],
    recommendedJobs: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Google",
        location: "Remote",
        type: "Full Time",
        salary: "$150K - $200K",
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "Amazon",
        location: "San Francisco, CA",
        type: "Full Time",
        salary: "$130K - $180K",
      },
      {
        id: 3,
        title: "Frontend Engineer",
        company: "Netflix",
        location: "Remote",
        type: "Full Time",
        salary: "$140K - $190K",
      },
    ],
  };

  const getStatusColor = (status) => {
    const colors = {
      Interview: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Applied: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      Offer: "bg-green-500/20 text-green-400 border-green-500/30",
      Pending: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Welcome back, {jobSeekerData.name}! 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {jobSeekerData.stats.profileViews} profile views
            </Chip>
            <Link href="/dashboard/job-seeker/profile">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {jobSeekerData.stats.applications}
            </div>
            <div className="text-sm text-blue-400">Applications</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {jobSeekerData.stats.interviews}
            </div>
            <div className="text-sm text-purple-400">Interviews</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {jobSeekerData.stats.offers}
            </div>
            <div className="text-sm text-green-400">Offers</div>
          </div>
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {jobSeekerData.stats.responseRate}
            </div>
            <div className="text-sm text-yellow-400">Response Rate</div>
          </div>
        </div>

        {/* Profile Summary & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary */}
          <Card className="lg:col-span-2 bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white font-bold shrink-0">
                  {jobSeekerData.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      {jobSeekerData.name}
                    </h2>
                    <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {jobSeekerData.title}
                    </Chip>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {jobSeekerData.location}
                    </span>
                    <span className="flex items-center gap-1">
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {jobSeekerData.experience}
                    </span>
                    <span className="flex items-center gap-1">
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      {jobSeekerData.education}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {jobSeekerData.bio}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {jobSeekerData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/dashboard/job-seeker/profile/edit">
                  <Button
                    variant="flat"
                    className="w-full border border-white/10 text-white hover:bg-white/10"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update Skills
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Applications & Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Recent Applications
                </h3>
                <Link href="/dashboard/job-seeker/applications">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {jobSeekerData.recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {app.position}
                      </p>
                      <p className="text-xs text-gray-400">
                        {app.company} • {app.date}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(app.status)}`}
                    >
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
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Recommended Jobs
                </h3>
                <Link href="/jobs">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {jobSeekerData.recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full">
                            {job.type}
                          </span>
                          <span className="text-xs text-green-400">
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        <Button
                          size="sm"
                          color="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[60px]"
                        >
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/jobs">
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Find Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/profile">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Update Profile
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/applications">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Track Applications
                  </Button>
                </Link>
                <Link href="/dashboard/job-seeker/saved">
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
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    Saved Jobs
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
