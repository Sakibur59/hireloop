import { getUserSession, requireRole } from "@/lib/core/session";
import { Card, Chip, Button, Switch } from "@heroui/react";

export default async function RecruiterSettingsPage() {
  const user = await requireRole("recruiter");
  const session = await getUserSession();

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
            <h2 className="text-lg font-semibold text-white mb-4">
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
