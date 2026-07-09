import { getCompanies } from "@/lib/api/companies";
import React from "react";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import {
  House,
  Persons,
  HouseFill,
  Briefcase,
  CreditCard,
  Gear,
  Plus,
  CircleCheck,
  Clock,
} from "@gravity-ui/icons";
import CompanyFilter from "./CompanyFilter";

const AdminCompaniesPage = async () => {
  const companiesData = await getCompanies();
  const companies = companiesData?.data || companiesData || [];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
    { icon: HouseFill, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const pendingCompanies = companies.filter(
    (c) => c.status === "pending" || !c.status,
  ).length;
  const approvedCompanies = companies.filter(
    (c) => c.status === "approved" || c.status === "Approved",
  ).length;
  const rejectedCompanies = companies.filter(
    (c) => c.status === "rejected" || c.status === "Rejected",
  ).length;

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gray-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Company Management
            </h1>
            <p className="text-gray-400 text-sm">
              Manage all companies on the platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chip className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <HouseFill className="w-3 h-3 mr-1" />
              Total: {companies.length} companies
            </Chip>
            <Chip className="bg-green-500/20 text-green-400 border border-green-500/30">
              <CircleCheck className="w-3 h-3 mr-1" />
              Admin
            </Chip>
            <Link href="/dashboard/admin/companies/add">
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Company
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Equal width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 border-b border-white/10 pb-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/dashboard/admin/companies";
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
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition-colors">
            <div className="text-2xl font-bold text-white">
              {companies.length}
            </div>
            <div className="text-sm text-blue-400">Total Companies</div>
          </div>
          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 text-center hover:border-yellow-500/30 transition-colors">
            <div className="text-2xl font-bold text-yellow-400">
              {pendingCompanies}
            </div>
            <div className="text-sm text-yellow-400">Pending</div>
          </div>
          <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-4 text-center hover:border-green-500/30 transition-colors">
            <div className="text-2xl font-bold text-green-400">
              {approvedCompanies}
            </div>
            <div className="text-sm text-green-400">Approved</div>
          </div>
          <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-4 text-center hover:border-red-500/30 transition-colors">
            <div className="text-2xl font-bold text-red-400">
              {rejectedCompanies}
            </div>
            <div className="text-sm text-red-400">Rejected</div>
          </div>
        </div>

        {/* Search & Filter - Client Component */}
        <CompanyFilter companies={companies} />
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
