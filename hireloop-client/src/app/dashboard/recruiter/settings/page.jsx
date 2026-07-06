import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button, Switch } from "@heroui/react";
import Link from "next/link";
import {
  House,
  Briefcase,
  Pencil,
  Factory,
  Envelope,
  Person,
  Gear,
  LocationArrow,
  Smartphone,
  CircleCheck,
  Shield,
  TrashBin,
} from "@gravity-ui/icons";

export default async function RecruiterSettingsPage() {
  const user = await requireRole("recruiter");
  const session = await getUserSession();

  const navLinks = [
    { href: "/dashboard/recruiter", label: "Home", icon: House },
    { href: "/dashboard/recruiter/jobs", label: "Jobs", icon: Briefcase },
    { href: "/dashboard/recruiter/post-job", label: "Post A Job", icon: Pencil },
    { href: "/dashboard/recruiter/company", label: "Company Profile", icon: Factory },
    { href: "/dashboard/recruiter/messages", label: "Messages", icon: Envelope },
    { href: "/dashboard/recruiter/profile", label: "Profile", icon: Person },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Gear },
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
            <CircleCheck className="w-4 h-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/dashboard/recruiter/settings";
            return (
              <Link key={link.href} href={link.href} className="flex-1 min-w-[100px]">
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
        {/* Profile Settings */}
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Person className="w-5 h-5 text-blue-400" />
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
                    defaultValue={user?.name || "Recruiter Name"}
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || "recruiter@email.com"}
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <Smartphone className="w-4 h-4 inline mr-1" />
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
                    <LocationArrow className="w-4 h-4 inline mr-1" />
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
                  defaultValue="Senior Recruiter with 8+ years of experience in tech hiring. Passionate about connecting talented professionals with amazing opportunities."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Envelope className="w-5 h-5 text-blue-400" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">New Applications</p>
                  <p className="text-sm text-gray-400">
                    Get notified when a candidate applies
                  </p>
                </div>
                <Switch defaultSelected className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Interview Schedules</p>
                  <p className="text-sm text-gray-400">
                    Get notified about upcoming interviews
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
                    Receive updates and tips from Hire Loop
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
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Security
            </h2>
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
            <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <TrashBin className="w-5 h-5" />
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-xl border border-red-500/20">
                <div>
                  <p className="text-white font-medium">Deactivate Account</p>
                  <p className="text-sm text-red-300">
                    Permanently deactivate your recruiter account
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