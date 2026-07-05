"use client";

import React, { useState } from "react";
import { Button, toast } from "@heroui/react";
import {
  ArrowUpToLine,
  Globe,
  Factory,
  ArrowRight,
  Pencil,
  ChevronDown,
  House,
  LocationArrow,
  Persons,
  Briefcase,
} from "@gravity-ui/icons";
import { createCompany, updateCompany } from "@/lib/actions/companies";

const textInputClass =
  "w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none placeholder:text-gray-500 focus:border-blue-500/50 transition";
const textAreaClass =
  "w-full bg-gray-800/50 border border-white/10 text-white rounded-xl p-4 outline-none placeholder:text-gray-500 focus:border-blue-500/50 transition resize-none";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState(recruiterCompany?.logo || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
        setErrors((prev) => ({ ...prev, logo: null }));
      } else {
        setErrors((prev) => ({ ...prev, logo: "Upload failed. Try again." }));
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        logo: "Network error during logo upload",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("companyName");
    const websiteUrl = formData.get("websiteUrl");
    const industry = formData.get("industry");
    const location = formData.get("location");
    const employeeCount = formData.get("employeeCount");
    const description = formData.get("description");

    const newErrors = {};
    if (!companyName) newErrors.companyName = "Company name is required";
    if (!websiteUrl) newErrors.websiteUrl = "Website link is required";
    if (!location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCompanyData = {
      name: companyName,
      websiteUrl,
      industry: industry || "Technology",
      location,
      employeeCount: employeeCount || "1-10 employees",
      description,
      logo: logoUrl || company?.logo || "",
      recruiterId: recruiter.id,
    };

    try {
      let result;
      if (company?._id) {
        result = await updateCompany(company._id, newCompanyData);
        setCompany({ ...company, ...newCompanyData });
        toast.success("Company profile updated successfully!");
      } else {
        result = await createCompany(newCompanyData);
        if (result.insertedId) {
          setCompany({ ...newCompanyData, _id: result.insertedId });
          toast.success("Company profile created successfully!");
        }
      }
      setErrors({});
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save company profile");
    }
  };

  const startRegistration = () => {
    setLogoUrl("");
    setIsEditing(true);
  };

  const startEditing = () => {
    setLogoUrl(company?.logo || "");
    setIsEditing(true);
  };

  // Empty State
  if (!company?._id && !isEditing) {
    return (
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto border border-white/10">
          <Factory size={28} className="text-gray-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">
            No Company Registered Yet
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
            To start posting jobs and tracking applicants, configure your
            company profile.
          </p>
        </div>
        <button
          onClick={startRegistration}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 h-11 transition-all inline-flex items-center gap-2"
        >
          Register Company <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // View Mode
  if (company && !isEditing) {
    const getStatusStyles = (status) => {
      switch (status) {
        case "Approved":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "Rejected":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        default:
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      }
    };

    return (
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-xl object-contain bg-gray-800 p-2 border border-white/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center border border-white/10">
                <Factory size={32} className="text-gray-500" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {company.name}
                </h1>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusStyles(company.status)}`}
                >
                  {company.status || "Pending"}
                </span>
              </div>
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1 mt-1"
              >
                <Globe size={14} className="text-gray-500" />{" "}
                {company.websiteUrl}
              </a>
              <p className="text-xs text-gray-500 mt-1">
                Recruiter: {recruiter?.name}
              </p>
            </div>
          </div>
          <button
            onClick={startEditing}
            className="border border-white/10 text-gray-300 hover:bg-white/10 rounded-xl px-4 h-10 inline-flex items-center gap-2 transition-colors"
          >
            <Pencil size={14} /> Edit Profile
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800/30 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={16} className="text-blue-400" />
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Industry
              </span>
            </div>
            <span className="text-gray-300 font-medium block">
              {company.industry}
            </span>
          </div>
          <div className="bg-gray-800/30 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <LocationArrow size={16} className="text-purple-400" />
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Location
              </span>
            </div>
            <span className="text-gray-300 font-medium block">
              {company.location}
            </span>
          </div>
          <div className="bg-gray-800/30 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Persons size={16} className="text-green-400" />
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Employees
              </span>
            </div>
            <span className="text-gray-300 font-medium block">
              {company.employeeCount}
            </span>
          </div>
        </div>

        {/* Description */}
        {company.description && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <House size={16} /> About Company
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/30 border border-white/10 p-4 rounded-xl">
              {company.description}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Edit Mode
  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5 w-full">
          <div className="text-xl font-semibold text-white border-b border-white/10 w-full pb-3 flex items-center gap-2">
            <Factory size={20} className="text-blue-400" />
            {company ? "Update Company Profile" : "Register Company"}
          </div>

          {/* Company Name + Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <House size={14} /> Company Name
              </label>
              <input
                type="text"
                name="companyName"
                defaultValue={company?.name || ""}
                placeholder="e.g. Acme Corp"
                className={textInputClass}
              />
              {errors.companyName && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.companyName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Briefcase size={14} /> Industry
              </label>
              <div className="relative">
                <select
                  name="industry"
                  defaultValue={company?.industry || "Technology"}
                  className="w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition pr-10"
                >
                  <option value="Technology" className="bg-gray-900 text-white">
                    Technology
                  </option>
                  <option value="Design" className="bg-gray-900 text-white">
                    Design
                  </option>
                  <option value="Marketing" className="bg-gray-900 text-white">
                    Marketing
                  </option>
                  <option value="Finance" className="bg-gray-900 text-white">
                    Finance
                  </option>
                  <option value="Healthcare" className="bg-gray-900 text-white">
                    Healthcare
                  </option>
                  <option value="Education" className="bg-gray-900 text-white">
                    Education
                  </option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Website + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Globe size={14} /> Website URL
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500 text-sm font-medium select-none pointer-events-none border-r border-white/10 pr-2">
                  https://
                </span>
                <input
                  type="text"
                  name="websiteUrl"
                  defaultValue={company?.websiteUrl || ""}
                  placeholder="www.company.com"
                  className={`${textInputClass} pl-20`}
                />
              </div>
              {errors.websiteUrl && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.websiteUrl}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <LocationArrow size={14} /> Location
              </label>
              <div className="relative flex items-center">
                <LocationArrow
                  size={16}
                  className="absolute left-3 text-gray-500 pointer-events-none"
                />
                <input
                  type="text"
                  name="location"
                  defaultValue={company?.location || ""}
                  placeholder="City, Country"
                  className={`${textInputClass} pl-10`}
                />
              </div>
              {errors.location && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.location}
                </span>
              )}
            </div>
          </div>

          {/* Employee Count + Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Persons size={14} /> Employee Count
              </label>
              <div className="relative">
                <select
                  name="employeeCount"
                  defaultValue={company?.employeeCount || "1-10 employees"}
                  className="w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition pr-10"
                >
                  <option value="1-10 employees" className="bg-gray-900 text-white">
                    1-10 employees
                  </option>
                  <option value="11-50 employees" className="bg-gray-900 text-white">
                    11-50 employees
                  </option>
                  <option value="51-200 employees" className="bg-gray-900 text-white">
                    51-200 employees
                  </option>
                  <option value="201+ employees" className="bg-gray-900 text-white">
                    201+ employees
                  </option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <ArrowUpToLine size={14} /> Company Logo
              </span>
              <div className="flex items-center gap-4 mt-1">
                <label className="w-16 h-16 border-2 border-dashed border-white/20 hover:border-blue-500/50 bg-gray-800/30 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ArrowUpToLine
                      size={20}
                      className="text-gray-500 group-hover:text-gray-300 transition-colors"
                    />
                  )}
                </label>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    {isUploading ? "Uploading..." : "Upload image"}
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    PNG, JPG up to 5MB
                  </p>
                  {errors.logo && (
                    <span className="text-xs text-red-400 mt-1">
                      {errors.logo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <House size={14} /> Description
            </label>
            <textarea
              name="description"
              defaultValue={company?.description || ""}
              placeholder="Tell us about your company's mission, culture, and vision..."
              rows={4}
              className={textAreaClass}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-5 border-t border-white/10">
          {company && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border border-white/10 text-gray-400 hover:bg-white/10 rounded-xl px-5 h-11 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 h-11 transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight size={16} />
            {company ? "Save Updates" : "Complete Setup"}
          </button>
        </div>
      </form>
    </div>
  );
}