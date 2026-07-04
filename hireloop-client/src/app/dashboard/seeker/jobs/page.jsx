import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";

export default async function JobSeekerJobsPage() {
  const user = await requireRole("seeker");
  const session = await getUserSession();
  
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Remote",
      type: "Full Time",
      salary: "$150K - $200K",
      posted: "2 days ago",
      match: "95%",
      logo: "G",
      description: "Join Google's core engineering team to build next-generation products.",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Amazon",
      location: "San Francisco, CA",
      type: "Full Time",
      salary: "$130K - $180K",
      posted: "3 days ago",
      match: "88%",
      logo: "A",
      description: "Build and maintain scalable full-stack applications for Amazon's cloud services.",
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "Netflix",
      location: "Remote",
      type: "Full Time",
      salary: "$140K - $190K",
      posted: "1 week ago",
      match: "92%",
      logo: "N",
      description: "Create beautiful and responsive user interfaces for Netflix's streaming platform.",
    },
    {
      id: 4,
      title: "React Developer",
      company: "Spotify",
      location: "New York, NY",
      type: "Contract",
      salary: "$120K - $160K",
      posted: "2 weeks ago",
      match: "85%",
      logo: "S",
      description: "Develop and maintain React components for Spotify's web application.",
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "Full Time",
      salary: "$140K - $190K",
      posted: "3 weeks ago",
      match: "90%",
      logo: "M",
      description: "Join Microsoft's Azure team to build cloud infrastructure solutions.",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full Time",
      salary: "$150K - $200K",
      posted: "1 month ago",
      match: "78%",
      logo: "A",
      description: "Design and implement CI/CD pipelines for Apple's software development lifecycle.",
    },
  ];

  const getMatchColor = (match) => {
    const percentage = parseInt(match);
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 80) return "text-blue-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-gray-400";
  };

  const navLinks = [
    { href: "/dashboard/seeker", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "/dashboard/seeker/jobs", label: "Jobs", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
    { href: "/dashboard/seeker/applications", label: "Applications", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/dashboard/seeker/billing", label: "Billing", icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { href: "/dashboard/seeker/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Find Jobs</h1>
            <p className="text-gray-400 text-sm">
              Discover your next career opportunity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {jobs.length} jobs available
            </Chip>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/dashboard/seeker/jobs";
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
        {/* Search & Filter */}
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="relative">
              <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="all" className="bg-gray-900 text-white">All Types</option>
                <option value="full-time" className="bg-gray-900 text-white">Full Time</option>
                <option value="part-time" className="bg-gray-900 text-white">Part Time</option>
                <option value="contract" className="bg-gray-900 text-white">Contract</option>
                <option value="freelance" className="bg-gray-900 text-white">Freelance</option>
                <option value="internship" className="bg-gray-900 text-white">Internship</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="all" className="bg-gray-900 text-white">All Locations</option>
                <option value="remote" className="bg-gray-900 text-white">Remote</option>
                <option value="onsite" className="bg-gray-900 text-white">Onsite</option>
                <option value="hybrid" className="bg-gray-900 text-white">Hybrid</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              radius="lg"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                      <span className="text-xl font-bold text-blue-400">
                        {job.logo}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-400">{job.company}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${getMatchColor(job.match)}`}>
                    {job.match} Match
                  </span>
                </div>
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-0.5 rounded-full border border-white/10">
                    {job.type}
                  </span>
                  <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-0.5 rounded-full border border-white/10">
                    {job.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <p className="text-sm text-green-400 font-medium">{job.salary}</p>
                    <p className="text-xs text-gray-500">Posted {job.posted}</p>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button
                      size="sm"
                      color="primary"
                      className="bg-blue-600 hover:bg-blue-700 text-white min-w-[70px]"
                    >
                      Apply
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 border border-blue-500/30 rounded-lg text-white">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors">
              3
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}