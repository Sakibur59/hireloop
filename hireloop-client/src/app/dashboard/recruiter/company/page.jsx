"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    Select,
    ListBox,
    Button,
    toast
} from "@heroui/react";
import { Xmark } from "@gravity-ui/icons";

export default function RegisterCompany() {
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.companyName) newErrors.companyName = "Company name is required";
        if (!data.industry) newErrors.industry = "Industry is required";
        if (!data.websiteUrl) newErrors.websiteUrl = "Website URL is required";
        if (!data.location) newErrors.location = "Location is required";
        if (!data.employeeCount) newErrors.employeeCount = "Employee count is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        toast.success("Company registered successfully!");
        console.log("Submitted Data:", data);
    };

    const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    
    const triggerClasses = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
    const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

    return (
        <div className="min-h-screen bg-[#0d0d0e] flex items-center justify-center p-4">
          
            <div className="w-full max-w-[640px] bg-[#121214] border border-zinc-900 rounded-xl shadow-2xl relative overflow-hidden">
             
                <div className="p-6 pb-4 flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-semibold text-white tracking-tight">Register New Company</h1>
                        <p className="text-zinc-500 text-xs mt-1">
                            Enter your business details to start hiring on HireLoop.
                        </p>
                    </div>
                    <button className="text-zinc-500 hover:text-white transition-colors p-1">
                        <Xmark size={18} />
                    </button>
                </div>

                <hr className="border-zinc-800/60" />

                <Form onSubmit={handleSubmit} className="p-6 space-y-6" validationErrors={errors} validationBehavior="aria">
                    <Fieldset className="space-y-5 w-full">
                      
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="companyName" isInvalid={!!errors.companyName} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-zinc-300 font-medium text-xs">Company Name</Label>
                                <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                            </TextField>

                            <Select className="w-full" name="industry" isInvalid={!!errors.industry}>
                                <Label className="text-zinc-300 font-medium text-xs mb-1.5 block">Industry / Category</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value placeholder="Technology" className="text-white" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                        <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                        <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="websiteUrl" isInvalid={!!errors.websiteUrl} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-zinc-300 font-medium text-xs">Website URL</Label>
                                <div className="relative flex items-center h-12 rounded-lg overflow-hidden border border-zinc-800 bg-[#1c1c1e] hover:bg-[#242426] focus-within:border-zinc-600 transition-all">
                                    <span className="bg-[#242426] h-full flex items-center px-3.5 text-zinc-500 text-xs border-r border-zinc-800/80">
                                        https://
                                    </span>
                                    <Input 
                                        placeholder="www.company.com" 
                                        className="w-full bg-transparent text-white h-full px-3 text-sm placeholder:text-zinc-600 outline-none" 
                                    />
                                </div>
                            </TextField>

                            <TextField name="location" isInvalid={!!errors.location} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-zinc-300 font-medium text-xs">Location</Label>
                                <div className="relative flex items-center">
                                  
                                    <svg className="absolute left-3.5 text-zinc-500 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                                </div>
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select className="w-full" name="employeeCount" isInvalid={!!errors.employeeCount}>
                                <Label className="text-zinc-300 font-medium text-xs mb-1.5 block">Employee Count Range</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value placeholder="1-10 employees" className="text-white" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                                        <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                                        <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <div className="flex flex-col gap-1.5 w-full">
                                <Label className="text-zinc-300 font-medium text-xs">Company Logo</Label>
                                <div className="flex items-center gap-3 bg-[#1c1c1e]/40 border border-dashed border-zinc-800 rounded-lg p-2 h-12 cursor-pointer hover:bg-[#1c1c1e]/80 transition-all">
                                    <div className="bg-[#242426] p-2 rounded border border-zinc-800 flex items-center justify-center text-zinc-400 aspect-square h-8">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-zinc-300 font-medium">Upload image</span>
                                        <span className="text-[10px] text-zinc-600">PNG, JPG up to 5MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <TextField name="description" className="flex flex-col gap-1.5 w-full">
                            <Label className="text-zinc-300 font-medium text-xs">Brief Description</Label>
                            <TextArea
                                placeholder="Tell us about your company's mission and culture..."
                                rows={4}
                                className={textAreaClass}
                            />
                        </TextField>
                    </Fieldset>

                  
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/60 w-full">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-5 font-medium text-sm h-11 transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-5 text-sm h-11 transition-colors"
                        >
                            Register Company
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}