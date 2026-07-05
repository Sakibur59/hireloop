import React from 'react';
import PostJobForm from './PostJobForm';
import { getUserSession, requireRole } from '@/lib/core/session';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import Link from 'next/link';
import { 
    House, 
    Briefcase, 
    Pencil, 
    Factory, 
    Envelope, 
    Person, 
    Gear 
} from '@gravity-ui/icons';

const PostJobPage = async () => {
    const user = await requireRole("recruiter");
    const session = await getUserSession();
    const company = await getLoggedInRecruiterCompany();

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
                        <h1 className="text-2xl font-bold text-white">Post A Job</h1>
                        <p className="text-gray-400 text-sm">
                            Create a new job posting
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {company && (
                            <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                <Factory className="w-3 h-3" />
                                {company.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Equal width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = link.href === "/dashboard/recruiter/post-job";
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PostJobForm company={company} />
            </div>
        </div>
    );
};

export default PostJobPage;