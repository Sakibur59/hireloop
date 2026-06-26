import { Card, Chip } from "@heroui/react";
import Link from "next/link";

const companies = [
  {
    name: "Google",
    logo: "G",
    jobs: 342,
    industry: "Technology",
    color: "from-red-500/20 to-red-600/20",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
  },
  {
    name: "Microsoft",
    logo: "M",
    jobs: 287,
    industry: "Technology",
    color: "from-blue-500/20 to-blue-600/20",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/10",
  },
  {
    name: "Amazon",
    logo: "A",
    jobs: 456,
    industry: "E-commerce",
    color: "from-orange-500/20 to-orange-600/20",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    hoverBg: "hover:bg-orange-500/10",
  },
  {
    name: "Apple",
    logo: "A",
    jobs: 198,
    industry: "Technology",
    color: "from-gray-500/20 to-gray-600/20",
    textColor: "text-gray-400",
    borderColor: "border-gray-500/30",
    hoverBg: "hover:bg-gray-500/10",
  },
  {
    name: "Meta",
    logo: "M",
    jobs: 234,
    industry: "Social Media",
    color: "from-blue-500/20 to-blue-600/20",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/10",
  },
  {
    name: "Netflix",
    logo: "N",
    jobs: 156,
    industry: "Entertainment",
    color: "from-red-500/20 to-red-600/20",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
  },
  {
    name: "Stripe",
    logo: "S",
    jobs: 123,
    industry: "Fintech",
    color: "from-purple-500/20 to-purple-600/20",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
  },
  {
    name: "Spotify",
    logo: "S",
    jobs: 98,
    industry: "Music",
    color: "from-green-500/20 to-green-600/20",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    hoverBg: "hover:bg-green-500/10",
  },
];

export default function FeaturedCompanies() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
          <Chip 
            color="primary" 
            variant="flat" 
            className="font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30"
          >
            Trusted by 15,000+ companies
          </Chip>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured <span className="text-blue-500">companies</span>
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Join top companies hiring right now
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {companies.map((company, index) => (
          <Card
            key={index}
            className={`bg-gray-900/50 border ${company.borderColor} backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${company.hoverBg}`}
            radius="lg"
          >
            <div className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${company.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border ${company.borderColor}`}>
                <span className={`text-2xl font-bold ${company.textColor}`}>
                  {company.logo}
                </span>
              </div>
              
              <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">
                {company.name}
              </h3>
              
              <div className="mt-1">
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
                  {company.industry}
                </span>
              </div>
              
              <div className="mt-3 flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-blue-400">
                  {company.jobs.toLocaleString()} open positions
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
        >
          View all companies
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}