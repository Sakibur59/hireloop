import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import {
  House,
  Briefcase,
  Pencil,
  Factory,
  Envelope,
  Gear,
  LocationArrow,
  Clock,
  Smartphone,
  Persons
} from "@gravity-ui/icons";

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

  const navLinks = [
    { href: "/dashboard/recruiter", label: "Home", icon: House },
    { href: "/dashboard/recruiter/jobs", label: "Jobs", icon: Briefcase },
    {
      href: "/dashboard/recruiter/jobs/new",
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
    { href: "/dashboard/recruiter/profile", label: "Profile", icon: Persons },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Gear },
  ];

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
                <Pencil className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            </Link>
            <Link href="/dashboard/recruiter/settings">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <Gear className="w-4 h-4 mr-1" />
                Settings
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
            const isActive = link.href === "/dashboard/recruiter/profile";
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
                <p className="text-gray-400 mt-1 flex items-center gap-1">
                  <House className="w-4 h-4" />
                  {recruiterData.company}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Envelope className="w-4 h-4" />
                    {recruiterData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-4 h-4" />
                    {recruiterData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <LocationArrow className="w-4 h-4" />
                    {recruiterData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
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
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Persons className="w-4 h-4" /> Departments
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