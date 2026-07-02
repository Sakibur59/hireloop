import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";

export default async function JobSeekerSavedJobsPage() {
  const user = await requireRole("seeker");
  const session = await getUserSession();
  const savedJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Remote",
      type: "Full Time",
      salary: "$150K - $200K",
      savedDate: "2 days ago",
      logo: "G",
      description: "Join Google's core engineering team to build next-generation products.",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full Time",
      salary: "$140K - $190K",
      savedDate: "5 days ago",
      logo: "A",
      description: "Lead product strategy and development for Amazon's retail division.",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Spotify",
      location: "New York, NY",
      type: "Contract",
      salary: "$110K - $150K",
      savedDate: "1 week ago",
      logo: "S",
      description: "Design user-centered experiences for Spotify's mobile and web platforms.",
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Netflix",
      location: "Remote",
      type: "Full Time",
      salary: "$160K - $210K",
      savedDate: "2 weeks ago",
      logo: "N",
      description: "Analyze user data to improve Netflix's recommendation algorithms.",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "Full Time",
      salary: "$145K - $195K",
      savedDate: "3 weeks ago",
      logo: "M",
      description: "Build and maintain Azure cloud infrastructure and deployment pipelines.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Saved Jobs</h1>
            <p className="text-gray-400 text-sm">
              Your saved job opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {savedJobs.length} saved jobs
            </Chip>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <Link href="/dashboard/seeker">
            <Button 
              variant="flat" 
              className="border border-white/10 text-white hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/seeker/jobs">
            <Button 
              variant="flat" 
              className="border border-white/10 text-white hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Jobs
            </Button>
          </Link>
          <Link href="/dashboard/seeker/saved-jobs">
            <Button 
              variant="flat" 
              className="bg-blue-500/20 text-blue-400 border border-blue-500/30"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved Jobs
            </Button>
          </Link>
          <Link href="/dashboard/seeker/applications">
            <Button 
              variant="flat" 
              className="border border-white/10 text-white hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Applications
            </Button>
          </Link>
          <Link href="/dashboard/seeker/profile">
            <Button 
              variant="flat" 
              className="border border-white/10 text-white hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
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
                    <Button
                      size="sm"
                      variant="flat"
                      className="bg-red-500/20 text-red-400 border border-red-500/30 min-w-[32px] h-8 w-8 p-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </Button>
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
                      <p className="text-xs text-gray-500">Saved {job.savedDate}</p>
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
        ) : (
          <div className="text-center py-16 bg-gray-900/50 border border-white/10 rounded-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full border border-white/10 mb-4">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No saved jobs</h3>
            <p className="text-gray-400 mb-6">Start exploring and save jobs you're interested in</p>
            <Link href="/dashboard/seeker/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Jobs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}