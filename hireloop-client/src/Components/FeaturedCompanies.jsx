import { Card, Button, Chip, Image } from "@heroui/react";
import Link from "next/link";

const companies = [
  {
    name: "Google",
    logo: "G",
    jobs: 342,
    industry: "Technology",
    color: "from-red-50 to-red-100",
    textColor: "text-red-600",
  },
  {
    name: "Microsoft",
    logo: "M",
    jobs: 287,
    industry: "Technology",
    color: "from-blue-50 to-blue-100",
    textColor: "text-blue-600",
  },
  {
    name: "Amazon",
    logo: "A",
    jobs: 456,
    industry: "E-commerce",
    color: "from-orange-50 to-orange-100",
    textColor: "text-orange-600",
  },
  {
    name: "Apple",
    logo: "A",
    jobs: 198,
    industry: "Technology",
    color: "from-gray-50 to-gray-100",
    textColor: "text-gray-600",
  },
  {
    name: "Meta",
    logo: "M",
    jobs: 234,
    industry: "Social Media",
    color: "from-blue-50 to-blue-100",
    textColor: "text-blue-600",
  },
  {
    name: "Netflix",
    logo: "N",
    jobs: 156,
    industry: "Entertainment",
    color: "from-red-50 to-red-100",
    textColor: "text-red-600",
  },
  {
    name: "Stripe",
    logo: "S",
    jobs: 123,
    industry: "Fintech",
    color: "from-purple-50 to-purple-100",
    textColor: "text-purple-600",
  },
  {
    name: "Spotify",
    logo: "S",
    jobs: 98,
    industry: "Music",
    color: "from-green-50 to-green-100",
    textColor: "text-green-600",
  },
];

export default function FeaturedCompanies() {
  return (
    <section className="py-8">
      {/* Header with better styling */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <Chip
              color="primary"
              variant="flat"
              size="sm"
              className="font-semibold"
            >
              Trusted by 15,000+ companies
            </Chip>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured <span className="text-blue-600">companies</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Join top companies hiring right now
          </p>
        </div>
        <Link
          href={"/companies"}
          
          className="font-semibold rounded-full px-6 border-2 "
          endContent={<span>→</span>}
        >
          View all companies
        </Link>
      </div>

      {/* Companies Grid with better cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {companies.map((company, index) => (
          <Card
            key={index}
            className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            radius="lg"
          >
            <div className="p-6 text-center">
              {/* Logo with gradient background */}
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${company.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <span className={`text-2xl font-bold ${company.textColor}`}>
                  {company.logo}
                </span>
              </div>

              {/* Company name */}
              <h3 className="font-semibold text-gray-900 text-lg">
                {company.name}
              </h3>

              {/* Industry badge */}
              <div className="mt-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {company.industry}
                </span>
              </div>

              {/* Jobs count with icon */}
              <div className="mt-3 flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-blue-600">
                  {company.jobs.toLocaleString()} open positions
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
