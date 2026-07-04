import { Card, Chip, Button, Switch } from "@heroui/react";
import Link from "next/link";
import { requireRole } from "@/lib/core/session";

export default async function JobSeekerSettingsPage() {
  const user = await requireRole("seeker");

  const navLinks = [
    {
      href: "/dashboard/seeker",
      label: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      href: "/dashboard/seeker/jobs",
      label: "Jobs",
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    {
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
      icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    },
    {
      href: "/dashboard/seeker/applications",
      label: "Applications",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      href: "/dashboard/seeker/billing",
      label: "Billing",
      icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    },
    {
      href: "/dashboard/seeker/settings",
      label: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 text-sm">
              Manage your account preferences
            </p>
          </div>
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
            Save Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/dashboard/seeker/settings";
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Settings */}
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Profile Settings
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || "Job Seeker"}
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || "seeker@email.com"}
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  defaultValue="Passionate software engineer with 5+ years of experience..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">New Job Alerts</p>
                  <p className="text-sm text-gray-400">
                    Get notified about new job postings
                  </p>
                </div>
                <Switch defaultSelected className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Application Updates</p>
                  <p className="text-sm text-gray-400">
                    Get notified about your application status
                  </p>
                </div>
                <Switch defaultSelected className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Messages</p>
                  <p className="text-sm text-gray-400">
                    Get notified when you receive a new message
                  </p>
                </div>
                <Switch defaultSelected className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Newsletter</p>
                  <p className="text-sm text-gray-400">
                    Receive career tips and updates
                  </p>
                </div>
                <Switch className="text-blue-500" />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Change Password</p>
                  <p className="text-sm text-gray-400">
                    Update your account password
                  </p>
                </div>
                <Button
                  variant="flat"
                  className="border border-white/10 text-white hover:bg-white/10"
                >
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
                <Button
                  variant="flat"
                  className="border border-white/10 text-white hover:bg-white/10"
                >
                  Enable
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-900/20 border border-red-500/30 backdrop-blur-sm shadow-xl">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-4">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-xl border border-red-500/20">
                <div>
                  <p className="text-white font-medium">Deactivate Account</p>
                  <p className="text-sm text-red-300">
                    Permanently deactivate your account
                  </p>
                </div>
                <Button
                  color="danger"
                  variant="flat"
                  className="border border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  Deactivate
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-xl border border-red-500/20">
                <div>
                  <p className="text-white font-medium">Delete Account</p>
                  <p className="text-sm text-red-300">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  color="danger"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
