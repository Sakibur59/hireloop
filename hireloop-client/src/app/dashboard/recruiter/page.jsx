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
  Persons,
  CreditCard,
  Magnifier,
  Bookmark,
  Clock,
  CircleCheck,
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

  const user = session?.user;
  const userRole = user?.role || "seeker";

  // Role-based navigation links
  const getNavLinks = (role) => {
    const commonLinks = [{ href: "/dashboard", label: "Home", icon: House }];

    const roleLinks = {
      admin: [
        ...commonLinks,
        { href: "/dashboard/admin/users", label: "Users", icon: Persons },
        {
          href: "/dashboard/admin/companies",
          label: "Companies",
          icon: Factory,
        },
        { href: "/dashboard/admin/jobs", label: "Jobs", icon: Briefcase },
        {
          href: "/dashboard/admin/payments",
          label: "Payments",
          icon: CreditCard,
        },
        { href: "/dashboard/admin/settings", label: "Settings", icon: Gear },
      ],
      recruiter: [
        ...commonLinks,
        { href: "/dashboard/recruiter/jobs", label: "Jobs", icon: Briefcase },
        {
          href: "/dashboard/recruiter/post-job",
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
        {
          href: "/dashboard/recruiter/profile",
          label: "Profile",
          icon: Person,
        },
        {
          href: "/dashboard/recruiter/settings",
          label: "Settings",
          icon: Gear,
        },
      ],
      seeker: [
        ...commonLinks,
        { href: "/dashboard/seeker/jobs", label: "Jobs", icon: Magnifier },
        {
          href: "/dashboard/seeker/saved-jobs",
          label: "Saved Jobs",
          icon: Bookmark,
        },
        {
          href: "/dashboard/seeker/applications",
          label: "Applications",
          icon: Clock,
        },
        {
          href: "/dashboard/seeker/billing",
          label: "Billing",
          icon: CreditCard,
        },
        { href: "/dashboard/seeker/settings", label: "Settings", icon: Gear },
      ],
    };

    return roleLinks[role] || roleLinks.seeker;
  };

  const navLinks = getNavLinks(userRole);

  // Role-based stats
  const getStats = (role) => {
    const stats = {
      admin: [
        {
          title: "Total Users",
          value: "15,243",
          icon: Persons,
          color: "from-blue-500/20 to-blue-600/20",
          textColor: "text-blue-400",
        },
        {
          title: "Total Companies",
          value: "1,250",
          icon: House,
          color: "from-purple-500/20 to-purple-600/20",
          textColor: "text-purple-400",
        },
        {
          title: "Total Jobs",
          value: "3,420",
          icon: Briefcase,
          color: "from-green-500/20 to-green-600/20",
          textColor: "text-green-400",
        },
        {
          title: "Revenue",
          value: "$45.2K",
          icon: CreditCard,
          color: "from-orange-500/20 to-orange-600/20",
          textColor: "text-orange-400",
        },
      ],
      recruiter: [
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
          icon: Persons,
          color: "from-purple-500/20 to-purple-600/20",
          textColor: "text-purple-400",
        },
        {
          title: "Active Jobs",
          value: "18",
          icon: CircleCheck,
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
      ],
      seeker: [
        {
          title: "Applications",
          value: "24",
          icon: Clock,
          color: "from-blue-500/20 to-blue-600/20",
          textColor: "text-blue-400",
        },
        {
          title: "Interviews",
          value: "8",
          icon: Persons,
          color: "from-purple-500/20 to-purple-600/20",
          textColor: "text-purple-400",
        },
        {
          title: "Offers",
          value: "2",
          icon: CircleCheck,
          color: "from-green-500/20 to-green-600/20",
          textColor: "text-green-400",
        },
        {
          title: "Saved Jobs",
          value: "12",
          icon: Bookmark,
          color: "from-orange-500/20 to-orange-600/20",
          textColor: "text-orange-400",
        },
      ],
    };
    return stats[role] || stats.seeker;
  };

  const recruiterStats = getStats(userRole);

  // Role-based recent activity
  const getRecentActivity = (role) => {
    const activities = {
      admin: [
        {
          id: 1,
          name: "John Doe",
          action: "signed up",
          time: "2 min ago",
          type: "user",
        },
        {
          id: 2,
          name: "TechCorp",
          action: "registered company",
          time: "15 min ago",
          type: "company",
        },
        {
          id: 3,
          name: "Sarah Smith",
          action: "applied for Senior Developer",
          time: "1 hour ago",
          type: "application",
        },
        {
          id: 4,
          name: "DesignHub",
          action: "posted a new job",
          time: "3 hours ago",
          type: "job",
        },
      ],
      recruiter: [
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
      ],
      seeker: [
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
    };
    return activities[role] || activities.seeker;
  };

  const recentActivity = getRecentActivity(userRole);

  // Role-based quick actions
  const getQuickActions = (role) => {
    const actions = {
      admin: [
        {
          href: "/dashboard/admin/users",
          label: "Manage Users",
          icon: Persons,
        },
        {
          href: "/dashboard/admin/companies",
          label: "Manage Companies",
          icon: Factory,
        },
        {
          href: "/dashboard/admin/jobs",
          label: "Manage Jobs",
          icon: Briefcase,
        },
        { href: "/dashboard/admin/settings", label: "Settings", icon: Gear },
      ],
      recruiter: [
        {
          href: "/dashboard/recruiter/jobs/new",
          label: "Post Job",
          icon: Pencil,
        },
        {
          href: "/dashboard/recruiter/jobs",
          label: "Manage Jobs",
          icon: Briefcase,
        },
        {
          href: "/dashboard/recruiter/messages",
          label: "Messages",
          icon: Envelope,
        },
        {
          href: "/dashboard/recruiter/company",
          label: "Company Profile",
          icon: Factory,
        },
      ],
      seeker: [
        { href: "/dashboard/seeker/jobs", label: "Find Jobs", icon: Magnifier },
        {
          href: "/dashboard/seeker/saved-jobs",
          label: "Saved Jobs",
          icon: Bookmark,
        },
        {
          href: "/dashboard/seeker/applications",
          label: "Track Applications",
          icon: Clock,
        },
        { href: "/dashboard/seeker/settings", label: "Settings", icon: Gear },
      ],
    };
    return actions[role] || actions.seeker;
  };

  const quickActions = getQuickActions(userRole);

  // Get dashboard title based on role
  const getDashboardTitle = (role) => {
    const titles = {
      admin: "Admin Dashboard",
      recruiter: "Recruiter Dashboard",
      seeker: "Job Seeker Dashboard",
    };
    return titles[role] || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {getDashboardTitle(userRole)}
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome back, {user?.name || "User"}! 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Briefcase className="w-3 h-3 mr-1" />
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Chip>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === `/dashboard/${userRole}` ||
              (link.href === "/dashboard" && userRole === "seeker") ||
              (link.href === "/dashboard" && userRole === "recruiter") ||
              (link.href === "/dashboard" && userRole === "admin");
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

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Recent Activity
                </h3>
                <Button variant="light" size="sm" className="text-blue-400">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((item) => {
                  if (userRole === "recruiter") {
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-white font-semibold text-sm border border-white/10">
                          {item.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">
                              {item.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {item.position}
                          </p>
                          <p className="text-sm text-gray-300 truncate mt-0.5">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    );
                  } else if (userRole === "admin") {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">{item.action}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {item.time}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.position}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${
                              item.status === "Interview"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : item.status === "Applied"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : item.status === "Offer"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
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
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.href}>
                      <Button className="w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20">
                        <Icon className="w-4 h-4 mr-1" />
                        {action.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;
