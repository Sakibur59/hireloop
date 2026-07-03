import { Card, Chip, Button, Divider } from "@heroui/react";
import Link from "next/link";
import { requireRole } from "@/lib/core/session";

export default async function JobSeekerBillingPage() {
    const user = await requireRole("seeker");
    const billingData = {
        plan: "Free",
        status: "Active",
        nextBilling: "N/A",
        paymentMethod: "No payment method added",
        usage: {
            applications: 24,
            savedJobs: 12,
            profileViews: 156,
            interviews: 8,
        },
        billingHistory: [
            { id: 1, date: "Jan 15, 2024", description: "Free Plan - Monthly", amount: "$0.00", status: "Paid" },
            { id: 2, date: "Dec 15, 2023", description: "Free Plan - Monthly", amount: "$0.00", status: "Paid" },
            { id: 3, date: "Nov 15, 2023", description: "Free Plan - Monthly", amount: "$0.00", status: "Paid" },
        ],
        availablePlans: [
            { name: "Free", price: "$0", features: ["5 Applications/month", "Basic Profile", "Job Alerts"], popular: false },
            { name: "Pro", price: "$29", features: ["Unlimited Applications", "Advanced Profile", "Priority Support", "Interview Tips"], popular: true },
            { name: "Enterprise", price: "$99", features: ["Unlimited Everything", "Premium Profile", "Dedicated Support", "AI Recommendations"], popular: false },
        ]
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Dashboard Header */}
            <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Billing & Subscriptions</h1>
                        <p className="text-gray-400 text-sm">
                            Manage your plan and payment details
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {billingData.plan} Plan
                        </Chip>
                        <Chip className="bg-green-500/20 text-green-400 border border-green-500/30">
                            {billingData.status}
                        </Chip>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                    <Link href="/dashboard/job-seeker">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/jobs">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Jobs
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/saved-jobs">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Saved Jobs
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/applications">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Applications
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/profile">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/billing">
                        <Button variant="flat" className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Billing
                        </Button>
                    </Link>
                    <Link href="/dashboard/job-seeker/settings">
                        <Button variant="flat" className="border border-white/10 text-white hover:bg-white/10">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Current Plan & Usage */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Current Plan */}
                    <Card className="lg:col-span-1 bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                            <div className="text-3xl font-bold text-white">{billingData.plan}</div>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                                    {billingData.status}
                                </span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">Next Billing Date</p>
                                <p className="text-sm text-white font-medium">{billingData.nextBilling}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">Payment Method</p>
                                <p className="text-sm text-white font-medium">{billingData.paymentMethod}</p>
                            </div>
                            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Payment Method
                            </Button>
                        </div>
                    </Card>

                    {/* Usage Stats */}
                    <Card className="lg:col-span-2 bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Usage</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{billingData.usage.applications}</div>
                                    <div className="text-sm text-gray-400">Applications</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{billingData.usage.savedJobs}</div>
                                    <div className="text-sm text-gray-400">Saved Jobs</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{billingData.usage.profileViews}</div>
                                    <div className="text-sm text-gray-400">Profile Views</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{billingData.usage.interviews}</div>
                                    <div className="text-sm text-gray-400">Interviews</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Available Plans */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">Available Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {billingData.availablePlans.map((plan) => (
                            <Card 
                                key={plan.name} 
                                className={`bg-gray-900/50 border ${
                                    plan.popular ? 'border-blue-500/50' : 'border-white/10'
                                } backdrop-blur-sm shadow-xl relative`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            Most Popular
                                        </Chip>
                                    </div>
                                )}
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                                    <div className="text-3xl font-bold text-white mt-2">{plan.price}</div>
                                    <p className="text-sm text-gray-400">per month</p>
                                    <div className="mt-4 space-y-2 text-left">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                    <Button 
                                        className={`w-full mt-6 ${
                                            plan.popular 
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                                                : 'border border-white/10 text-white hover:bg-white/10'
                                        }`}
                                        variant={plan.popular ? 'solid' : 'flat'}
                                    >
                                        {plan.name === billingData.plan ? 'Current Plan' : 'Upgrade'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Billing History */}
                <Card className="bg-gray-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
                    <div className="p-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Billing History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-800/50 border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {billingData.billingHistory.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 text-sm text-gray-300">{item.date}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{item.description}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{item.amount}</td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs px-2 py-1 rounded-full border bg-green-500/20 text-green-400 border-green-500/30">
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}