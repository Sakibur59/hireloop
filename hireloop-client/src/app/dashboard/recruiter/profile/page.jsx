
import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button, Avatar } from "@heroui/react";
import Link from "next/link";
export default async function RecruiterProfilePage() {
 
  const user = await requireRole("recruiter");

  const session = await getUserSession();

  const recruiterData = {
    name: user?.name || "Recruiter Name",
    email: user?.email || "recruiter@email.com",
    avatar: user?.name?.charAt(0)?.toUpperCase() || "R",
    joined: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "January 2024",
    // These would come from a recruiter profile collection in DB
    title: "Senior Recruiter",
    company: "TechCorp Inc.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Senior Recruiter with 8+ years of experience in tech hiring. Passionate about connecting talented professionals with amazing opportunities.",
    departments: ["Engineering", "Product", "Design"],
    stats: {
      jobsPosted: 45,
      candidatesHired: 89,
      responseRate: "94%",
      avgResponseTime: "2.5 hours",
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 text-sm">
              Manage your recruiter profile
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/recruiter/profile/edit">
              <Button
                variant="flat"
                className="border border-white/10 text-white hover:bg-white/10"
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
                Edit Profile
              </Button>
            </Link>
            <Link href="/dashboard/recruiter/settings">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl text-white font-bold">
                {recruiterData.avatar}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">
                    {recruiterData.name}
                  </h1>
                  <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {recruiterData.title}
                  </Chip>
                </div>
                <p className="text-gray-400 mt-1">{recruiterData.company}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {recruiterData.email}
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {recruiterData.phone}
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {recruiterData.location}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Joined {recruiterData.joined}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {recruiterData.bio}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Departments
              </h3>
              <div className="flex flex-wrap gap-2">
                {recruiterData.departments.map((dept, index) => (
                  <span
                    key={index}
                    className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl font-bold text-white">
                  {recruiterData.stats.jobsPosted}
                </div>
                <div className="text-sm text-gray-400">Jobs Posted</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl font-bold text-white">
                  {recruiterData.stats.candidatesHired}
                </div>
                <div className="text-sm text-gray-400">Candidates Hired</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl font-bold text-green-400">
                  {recruiterData.stats.responseRate}
                </div>
                <div className="text-sm text-gray-400">Response Rate</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl font-bold text-blue-400">
                  {recruiterData.stats.avgResponseTime}
                </div>
                <div className="text-sm text-gray-400">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
