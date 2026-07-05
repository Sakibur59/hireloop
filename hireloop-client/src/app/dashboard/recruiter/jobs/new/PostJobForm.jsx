"use client";

import React, { useState } from "react";
import { Button, toast } from "@heroui/react";
import {
  Briefcase,
  Globe,
  LocationArrow,
  Clock,
  Persons,
  ArrowRight,
  ChevronDown,
  House,
  Factory,
} from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";

export default function PostJobForm({ company }) {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textInputClass =
    "w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none placeholder:text-gray-500 focus:border-blue-500/50 transition";
  const textAreaClass =
    "w-full bg-gray-800/50 border border-white/10 text-white rounded-xl p-4 outline-none placeholder:text-gray-500 focus:border-blue-500/50 transition resize-none";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
    if (!data.jobType) newErrors.jobType = "Job type is required";
    if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
    if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
    if (!isRemote && !data.location)
      newErrors.location = "Location is required for non-remote roles";
    if (!data.deadline) newErrors.deadline = "Application deadline is required";
    if (!data.responsibilities)
      newErrors.responsibilities = "Responsibilities are required";
    if (!data.requirements)
      newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    const payload = {
      ...data,
      isRemote,
      companyId: company._id,
      companyName: company.name,
      companyLogo: company.logo,
      status: "active",
      isPubliclyVisible: true,
    };

    try {
      const res = await createJob(payload);
      if (res.insertedId) {
        toast.success("Job posted successfully!");
        e.target.reset();
        setIsRemote(false);
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if company is approved
  if (company?.status !== "Approved") {
    return (
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto border border-white/10">
          <Briefcase className="w-10 h-10 text-gray-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">
            Company Not Approved
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
            Your company profile must be approved before you can post jobs.
            Please wait for admin approval or contact support.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/recruiter/company")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 h-11 transition-all inline-flex items-center gap-2"
        >
          Go to Company Profile <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="border-b border-white/10 pb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Post a New Job
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Fill out the details below to publish your open position.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-gray-800/30 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-400">
            <Factory className="w-4 h-4 text-gray-500" />
            Posting as:{" "}
            <span className="font-semibold text-white">{company?.name}</span>
            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs border border-green-500/30">
              {company?.status}
            </span>
          </div>
        </div>

        {/* Job Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Job Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Briefcase size={14} /> Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Senior Frontend Engineer"
                className={textInputClass}
              />
              {errors.jobTitle && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.jobTitle}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Persons size={14} /> Job Category
              </label>
              <div className="relative">
                <select
                  name="jobCategory"
                  className="w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition pr-10"
                >
                  <option value="">Select Category</option>
                  <option value="Technology" className="bg-gray-900 text-white">
                    Technology
                  </option>
                  <option value="Design" className="bg-gray-900 text-white">
                    Design
                  </option>
                  <option value="Marketing" className="bg-gray-900 text-white">
                    Marketing
                  </option>
                  <option value="Sales" className="bg-gray-900 text-white">
                    Sales
                  </option>
                  <option value="Finance" className="bg-gray-900 text-white">
                    Finance
                  </option>
                  <option value="Healthcare" className="bg-gray-900 text-white">
                    Healthcare
                  </option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
              {errors.jobCategory && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.jobCategory}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Clock size={14} /> Job Type
              </label>
              <div className="relative">
                <select
                  name="jobType"
                  className="w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition pr-10"
                >
                  <option value="">Select Type</option>
                  <option value="Full Time" className="bg-gray-900 text-white">
                    Full Time
                  </option>
                  <option value="Part Time" className="bg-gray-900 text-white">
                    Part Time
                  </option>
                  <option value="Contract" className="bg-gray-900 text-white">
                    Contract
                  </option>
                  <option value="Internship" className="bg-gray-900 text-white">
                    Internship
                  </option>
                  <option value="Freelance" className="bg-gray-900 text-white">
                    Freelance
                  </option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
              {errors.jobType && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.jobType}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-medium text-sm">
                Salary Range
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 flex gap-2">
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="Min"
                    className={`${textInputClass} w-1/2`}
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="Max"
                    className={`${textInputClass} w-1/2`}
                  />
                </div>
                <div className="relative">
                  <select
                    name="currency"
                    defaultValue="USD"
                    className="w-full bg-gray-800/50 border border-white/10 text-white rounded-xl px-3 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition pr-8"
                  >
                    <option value="USD" className="bg-gray-900 text-white">
                      $
                    </option>
                    <option value="EUR" className="bg-gray-900 text-white">
                      €
                    </option>
                    <option value="GBP" className="bg-gray-900 text-white">
                      £
                    </option>
                  </select>
                </div>
              </div>
              {(errors.minSalary || errors.maxSalary) && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.minSalary || errors.maxSalary}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                  <LocationArrow size={14} /> Location
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400">Remote</label>
                  <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>
              </div>
              <div className="relative">
                <LocationArrow
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
                <input
                  type="text"
                  name="location"
                  placeholder={isRemote ? "Global / Remote" : "e.g. Austin, TX"}
                  disabled={isRemote}
                  className={`${textInputClass} pl-10 ${isRemote ? "opacity-50" : ""}`}
                />
              </div>
              {!isRemote && errors.location && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.location}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <Clock size={14} /> Application Deadline
              </label>
              <input type="date" name="deadline" className={textInputClass} />
              {errors.deadline && (
                <span className="text-xs text-red-400 mt-1">
                  {errors.deadline}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Job Details & Description
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <House size={14} /> Responsibilities
            </label>
            <textarea
              name="responsibilities"
              placeholder="Outline the core everyday responsibilities for this role..."
              rows={4}
              className={textAreaClass}
            />
            {errors.responsibilities && (
              <span className="text-xs text-red-400 mt-1">
                {errors.responsibilities}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <Persons size={14} /> Requirements
            </label>
            <textarea
              name="requirements"
              placeholder="List required experience, skills, and certifications..."
              rows={4}
              className={textAreaClass}
            />
            {errors.requirements && (
              <span className="text-xs text-red-400 mt-1">
                {errors.requirements}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <Globe size={14} /> Benefits (Optional)
            </label>
            <textarea
              name="benefits"
              placeholder="Perks, healthcare, equity, remote stipends..."
              rows={3}
              className={textAreaClass}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-5 border-t border-white/10">
          <button
            type="button"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            className="border border-white/10 text-gray-400 hover:bg-white/10 rounded-xl px-6 h-11 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 h-11 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Job"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
