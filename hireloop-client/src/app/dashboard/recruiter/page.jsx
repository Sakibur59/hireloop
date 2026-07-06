"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";
import {
  House,
  Briefcase,
  Pencil,
  Factory,
  Envelope,
  Person,
  Gear,
} from "@gravity-ui/icons";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const recruiterStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: Briefcase,
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-400",
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Person,
      color: "from-purple-500/20 to-purple-600/20",
      textColor: "text-purple-400",
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Briefcase,
      color: "from-green-500/20 to-green-600/20",
      textColor: "text-green-400",
    },
    {
      title: "Messages",
      value: "24",
      icon: Envelope,
      color: "from-orange-500/20 to-orange-600/20",
      textColor: "text-orange-400",
    },
  ];

  const user = session?.user;

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
    { href: "/dashboard/recruiter/profile", label: "Profile", icon: Person },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Gear },
  ];

  // Recent messages data
  const recentMessages = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Software Engineer",
      message: "I'm very interested in this position...",
      time: "2 min ago",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Smith",
      position: "Product Manager",
      message: "When can we schedule an interview?",
      time: "15 min ago",
      avatar: "SS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "UX Designer",
      message: "Thank you for considering my application...",
      time: "1 hour ago",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Emily Chen",
      position: "Frontend Developer",
      message: "I'd love to learn more about the team!",
      time: "3 hours ago",
      avatar: "EC",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Home</h1>
            <p className="text-gray-400 text-sm">
              Welcome back, {user?.name || "Recruiter"}! 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Briefcase className="w-3 h-3 mr-1" />
              48 Total Jobs
            </Chip>
            <Link href="/dashboard/recruiter/jobs/new">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Post New Job
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
            const isActive = link.href === "/dashboard/recruiter";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {recruiterStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-medium">
                      {stat.title}
                    </span>
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center border border-white/10`}
                    >
                      <Icon className={`w-5 h-5 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Messages & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Recent Messages
                </h3>
                <Link href="/dashboard/recruiter/messages">
                  <Button variant="light" size="sm" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-white font-semibold text-sm border border-white/10">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{msg.position}</p>
                      <p className="text-sm text-gray-300 truncate mt-0.5">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 border-0 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/recruiter/post-job">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Pencil className="w-4 h-4 mr-1" />
                    Post Job
                  </Button>
                </Link>
                <Link href="/dashboard/recruiter/jobs">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Briefcase className="w-4 h-4 mr-1" />
                    Manage Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/recruiter/messages">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Envelope className="w-4 h-4 mr-1" />
                    Messages
                  </Button>
                </Link>
                <Link href="/dashboard/recruiter/company">
                  <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                    <Factory className="w-4 h-4 mr-1" />
                    Company Profile
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

export default RecruiterDashboardHomePage;
