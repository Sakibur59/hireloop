import { Card, Chip, Input, Button, Avatar, Badge } from "@heroui/react";
import Link from "next/link";

export default function RecruiterMessagesPage() {
    const messages = [
        {
            id: 1,
            sender: "Sarah Johnson",
            avatar: "SJ",
            role: "Software Engineer",
            subject: "Application for Senior Developer Position",
            preview: "I am very interested in the Senior Developer position at your company...",
            type: "application",
            read: false,
            time: "2 min ago",
            company: "Google"
        },
        {
            id: 2,
            sender: "Michael Chen",
            avatar: "MC",
            role: "Product Manager",
            subject: "Interview Schedule Confirmation",
            preview: "I would like to confirm my interview for the Product Manager role...",
            type: "interview",
            read: false,
            time: "15 min ago",
            company: "Amazon"
        },
        {
            id: 3,
            sender: "Emily Rodriguez",
            avatar: "ER",
            role: "UX Designer",
            subject: "Thank you for the opportunity",
            preview: "Thank you for considering my application for the UX Designer position...",
            type: "offer",
            read: true,
            time: "2 hours ago",
            company: "Spotify"
        },
        {
            id: 4,
            sender: "David Kim",
            avatar: "DK",
            role: "Data Scientist",
            subject: "Following up on my application",
            preview: "I wanted to follow up on my application for the Data Scientist role...",
            type: "followup",
            read: true,
            time: "1 day ago",
            company: "Microsoft"
        },
        {
            id: 5,
            sender: "Lisa Thompson",
            avatar: "LT",
            role: "Marketing Lead",
            subject: "Feedback on interview process",
            preview: "I wanted to share some feedback about the interview process...",
            type: "feedback",
            read: false,
            time: "3 days ago",
            company: "Netflix"
        }
    ];

    const unreadCount = messages.filter(m => !m.read).length;

    const getTypeColor = (type) => {
        const colors = {
            'application': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'interview': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'offer': 'bg-green-500/20 text-green-400 border-green-500/30',
            'followup': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            'feedback': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        };
        return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const getTypeIcon = (type) => {
        const icons = {
            'application': '📄',
            'interview': '🎯',
            'offer': '🎉',
            'followup': '💬',
            'feedback': '📝',
        };
        return icons[type] || '💬';
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Dashboard Header */}
            <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Messages</h1>
                        <p className="text-gray-400 text-sm">Manage candidate communications</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {messages.length} messages
                        </Chip>
                        {unreadCount > 0 && (
                            <Chip color="danger" variant="flat" className="bg-red-500/20 text-red-400 border border-red-500/30">
                                {unreadCount} unread
                            </Chip>
                        )}
                        <Link href="/dashboard/recruiter/messages/compose">
                            <Button 
                                color="primary" 
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Compose
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content - same as before */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{unreadCount}</div>
                        <div className="text-sm text-blue-400">Unread</div>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{messages.filter(m => m.type === 'application').length}</div>
                        <div className="text-sm text-green-400">Applications</div>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{messages.filter(m => m.type === 'interview').length}</div>
                        <div className="text-sm text-purple-400">Interviews</div>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{messages.filter(m => m.type === 'offer').length}</div>
                        <div className="text-sm text-yellow-400">Offers</div>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                                <option value="all" className="bg-gray-900 text-white">All Types</option>
                                <option value="application" className="bg-gray-900 text-white">Application</option>
                                <option value="interview" className="bg-gray-900 text-white">Interview</option>
                                <option value="offer" className="bg-gray-900 text-white">Offer</option>
                                <option value="followup" className="bg-gray-900 text-white">Follow-up</option>
                                <option value="feedback" className="bg-gray-900 text-white">Feedback</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <select className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-colors">
                                <option value="all" className="bg-gray-900 text-white">All Status</option>
                                <option value="read" className="bg-gray-900 text-white">Read</option>
                                <option value="unread" className="bg-gray-900 text-white">Unread</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`flex items-start gap-4 p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!message.read ? 'bg-blue-500/5' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center text-white font-bold">
                                    {message.avatar}
                                </div>
                                {!message.read && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black"></div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold text-white">{message.sender}</h3>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-400">{message.role}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-400">{message.company}</span>
                                        </div>
                                        <p className="text-sm text-white font-medium mt-1">{message.subject}</p>
                                        <p className="text-sm text-gray-400 truncate mt-0.5">{message.preview}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <span className="text-xs text-gray-500">{message.time}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(message.type)}`}>
                                            {getTypeIcon(message.type)} {message.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}