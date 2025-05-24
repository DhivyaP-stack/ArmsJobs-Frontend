import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
//import DefaultProfile from "../../assets/images/DefaultProfile.jpg"
import { Button } from "../../common/Button"
import { InputField } from "../../common/InputField";
//import { SelectField } from "../../common/SelectField";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOverseasRecruitment } from "../../Commonapicall/Overseasapicall/Overseasapis";
import { toast } from "react-toastify";
import { SelectField } from "../../common/SelectField";

interface OverSeasAddPopupProps {
    // isOpen: boolean;
    closePopup: () => void;
    refreshData?: () => void;
}

// Company Details Schema
const companyDetailsSchema = zod.object({
    company_name: zod.string().optional(),
    country: zod.string().optional(),
    contact_person_name: zod.string().min(1, "Contact person name is required"),
    mobile_no: zod
        .string()
        .min(3, "Mobile number is required")
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    whatsapp_no: zod
        .string()
        .min(3, "WhatsApp number is required")
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email_address: zod
        .string()
        .min(3, "Email ID is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
});

// Recruitment Info Schema
const recruitmentInfoSchema = zod.object({
    categories_you_can_provide: zod.string().optional(),
    nationality_of_workers: zod.string().optional(),
    mobilization_time: zod.string().optional(),
    uae_deployment_experience: zod.string().optional(),
});

// Documents & Notes Schema
const documentsSchema = zod.object({
    cv: zod.any().optional(),
    comments: zod.string().optional(),
});

// Combined Schema
const overseasRecruitmentSchema = companyDetailsSchema
    .merge(recruitmentInfoSchema)
    .merge(documentsSchema);

type OverseasRecruitmentFormData = zod.infer<typeof overseasRecruitmentSchema>;

export const OverSeasAddPopup: React.FC<OverSeasAddPopupProps> = ({
    // isOpen,
    closePopup,
    refreshData
}) => {
    //   if (!isOpen) return null;
    const [activeTab, setActiveTab] = useState("Company Details");
    // const tabs = ["Personal Information", "Visa & Work Eligibility", "Job Information", "Documents Upload"];
    const tabs = ['Company Details', "Recruitment Info", "Documents", "Notes"];
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<OverseasRecruitmentFormData>({
        resolver: zodResolver(overseasRecruitmentSchema),
        defaultValues: {
            uae_deployment_experience: "no", // Set default value for radio buttons
        },
    });

    const tabFieldMapping: Record<string, string[]> = {
        "Company Details": [
            'company_name',
            'country',
            'contact_person_name',
            'mobile_no',
            'whatsapp_no',
            'email_address'
        ],
        "Recruitment Infon": [
            'categories_you_can_provide',
            'nationality_of_workers',
            'mobilization_time',
            'uae_deployment_experience',
        ],
        "Notes": [
            'comments',
        ],
    };

    const [scrollToField, setScrollToField] = useState<string | null>(null);
    console.log("scrollToField", scrollToField);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Combine form validation and submission in one step
        handleSubmit(async (data: OverseasRecruitmentFormData) => {
            setError(null);
            try {
                // Convert uae_deployment_experience string to boolean
                const uaeExperience = data.uae_deployment_experience === "yes";

                // Prepare request data
                const requestData = {
                    company_name: data.company_name || '',
                    country: data.country || '',
                    contact_person_name: data.contact_person_name,
                    mobile_no: data.mobile_no,
                    whatsapp_no: data.whatsapp_no,
                    email_address: data.email_address,
                    categories_you_can_provide: data.categories_you_can_provide || '',
                    nationality_of_workers: data.nationality_of_workers || '',
                    mobilization_time: data.mobilization_time || '',
                    uae_deployment_experience: uaeExperience,
                    comments: data.comments || ''
                };

                const result = await addOverseasRecruitment(requestData);
                console.log("add Overseas result", result)
                // On success:
                reset();
                closePopup();
                if (refreshData) refreshData();
                toast.success("Overseas recruitment added successfully");
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to submit form";
                setError(errorMessage);
                toast.error("Failed to submit form");
            }
        }, (errors) => {
            // Handle validation errors
            const errorFields = Object.keys(errors);
            if (errorFields.length > 0) {
                // Find which tab contains the first error
                for (const [tabName, fields] of Object.entries(tabFieldMapping)) {
                    const hasErrorInTab = errorFields.some(errorField => fields.includes(errorField));
                    if (hasErrorInTab) {
                        // Set active tab to the one containing the first error
                        setActiveTab(tabName);
                        // Set the first error field from this tab to scroll to
                        const firstErrorFieldInTab = errorFields.find(field => fields.includes(field));
                        if (firstErrorFieldInTab) {
                            setScrollToField(firstErrorFieldInTab);
                        }
                        break;
                    }
                }
            }
        })(e);
    };

    useEffect(() => {
        if (scrollToField) {
            // First scroll the tab into view
            const tabContent = document.querySelector('.tab-content');
            if (tabContent) {
                tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Then scroll to the specific field
            const timeout = setTimeout(() => {
                const el = document.querySelector(`[name="${scrollToField}"]`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    (el as HTMLElement).focus();
                }
                setScrollToField(null);
            }, 300); // Increased timeout to ensure tab change is complete
            return () => clearTimeout(timeout);
        }
    }, [activeTab, scrollToField]);

    return (
        <div className="fixed inset-0 bg-armsAsh bg-opacity-70 flex justify-center items-start pt-25 z-50">
            <div className="bg-white rounded-lg shadow-lg w-30/31 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] p-6 relative">
                {/* Heading */}
                <div className="relative mb-5">
                    <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
                        Add Overseas Recruitment
                    </h2>
                </div>
                <div
                    onClick={closePopup}
                    className="absolute top-5 right-5 text-gray-500 cursor-pointer"
                >
                    <IoCloseOutline size={30} />
                </div>
                {/* Tabs */}
                <div className="flex gap-1 border-b-1 border-armsBlack mb-6">
                    {tabs.map((tab) => {
                        const hasError = tabFieldMapping[tab]?.some(field => field in errors);
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-bold cursor-pointer relative ${activeTab === tab
                                    ? "bg-main text-white"
                                    : "text-black"
                                    }`}
                            >
                                {tab}
                                {hasError && (
                                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Error message display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="h-[calc(100%-150px)] overflow-y-auto">
                    {/* Company Details */}
                    {activeTab === "Company Details" && (
                        <div className="max-w-full mx-auto p-0 pl-1">
                            <div className="flex flex-row gap-1 items-start">
                                <div className="flex gap-6 w-3/4">
                                    {/* Form Fields */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="grid max-xl:!grid-cols-3 grid-cols-4 gap-4 ">
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Company Name
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("company_name")}
                                                    name="company_name"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {/* {errors.company_name && <p className="text-sm text-red-500">{errors.company_name.message}</p>} */}
                                            </div>
                                            {/* Country */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Country
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("country")}
                                                    name="country"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                            </div>
                                            {/* Contact Person Name */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Contact Person Name<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("contact_person_name")}
                                                    name="contact_person_name"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.contact_person_name && <p className="text-sm text-red-500">{errors.contact_person_name.message}</p>}
                                            </div>
                                            {/* Mobile Number */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Mobile Number<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="tel"
                                                    {...register("mobile_no")}
                                                    name="mobile_no"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no.message}</p>}
                                            </div>
                                            {/* WhatsApp Number */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1 block">
                                                    WhatsApp Number<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="tel"
                                                    {...register("whatsapp_no")}
                                                    name="whatsapp_no"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label=""
                                                />
                                                {errors.whatsapp_no && <p className="text-sm text-red-500">{errors.whatsapp_no.message}</p>}
                                            </div>
                                            {/* Email ID */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Email ID<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="email"
                                                    {...register("email_address")}
                                                    name="email_address"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.email_address && <p className="text-sm text-red-500">{errors.email_address.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Recruitment Info */}
                    {activeTab === "Recruitment Info" && (
                        <div className="max-w-full mx-auto p-0 pl-1">
                            <div className="flex flex-row gap-1 items-start">
                                <div className="flex gap-6 w-3/4">
                                    {/* Form Fields */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="grid grid-cols-3 max-lg:!grid-cols-2 gap-4">
                                            {/* Categories You Can Provide */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Categories You Can Provide
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("categories_you_can_provide")}
                                                    name="categories_you_can_provide"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                            </div>
                                            {/* Nationality of Workers */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Nationality of Workers
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("nationality_of_workers")}
                                                    name="nationality_of_workers"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Note: If multiple Nationalitiy of workers, separate them with commas.
                                                </p>
                                            </div>
                                            {/* Mobilization Time */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Mobilization Time
                                                </label>
                                                <SelectField
                                                    label={""}
                                                    {...register("mobilization_time")}
                                                    name="mobilization_time"
                                                    options={[
                                                        { value: "", label: "Select Mobilization Time" },
                                                        { value: "3-5 Days", label: "3-5 Days" },
                                                        { value: "5-10 Days", label: "5-10 Days" },
                                                        { value: "10-15 Days", label: "10-15 Days" },
                                                        { value: "15+ Days", label: "15+ Days" },
                                                    ]}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>
                                            {/* UAE Deployment Experience */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    UAE Deployment Experience
                                                </label>
                                                <div className="flex gap-6">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            {...register("uae_deployment_experience")}
                                                            value="yes"
                                                            className="w-5 h-5 cursor-pointer"
                                                        />
                                                        Yes
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            {...register("uae_deployment_experience")}
                                                            value="no"
                                                            className="w-5 h-5 cursor-pointer"
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Documents" && (
                        <div className="max-w-full mx-auto p-4">
                            {/* First Row - 2 documents */}
                            <div className="grid grid-cols-4 gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold mb-1">Upload CV</label>
                                        <input type="text" className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none" readOnly placeholder="Upload your CV" />
                                    </div>
                                    <Button
                                        buttonType="button"
                                        buttonTitle="Upload"
                                        className="bg-armsjobslightblue text-armsWhite px-4 py-1.5 rounded text-sm hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mt-6"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold mb-1">License Copy</label>
                                        <input type="text" className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none" readOnly placeholder="Upload license copy" />
                                    </div>
                                    <Button
                                        buttonType="button"
                                        buttonTitle="Upload"
                                        className="bg-armsjobslightblue text-armsWhite px-4 py-1.5 rounded text-sm hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mt-6"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold mb-1">Profile</label>
                                        <input type="text" className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none" readOnly placeholder="Upload profile" />
                                    </div>
                                    <Button
                                        buttonType="button"
                                        buttonTitle="Upload"
                                        className="bg-armsjobslightblue text-armsWhite px-4 py-1.5 rounded text-sm hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mt-6"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold mb-1">Experience Certificate</label>
                                        <input type="text" className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none" readOnly placeholder="Upload experience certificate" />
                                    </div>
                                    <Button
                                        buttonType="button"
                                        buttonTitle="Upload"
                                        className="bg-armsjobslightblue text-armsWhite px-4 py-1.5 rounded text-sm hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mt-6"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Note: Please ensure all relevant documents are uploaded in the required format. Each file should not exceed 500 KB in size. Larger files may not be accepted by the system. Kindly compress your documents if necessary before uploading.</p>
                        </div>
                    )}
                    {/* Additional */}
                    {activeTab === "Notes" && (
                        <div className="flex  gap-4 px-4 w-1/4 ">
                            <div className="w-full">
                                <label className="text-sm font-semibold mb-1 block pb-0.5">
                                    Additional Details
                                </label>
                                <textarea
                                    {...register("comments")}
                                    name="comments"
                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                />
                            </div>
                        </div>
                    )}
                </form>

                {/* Buttons */}
                <div className="absolute bottom-0 left-0 right-0 py-4 ">
                    <div className="flex justify-center gap-4 mt-8 ">
                        <div>
                            <Button
                                onClick={closePopup}
                                buttonType="button"
                                buttonTitle="Cancel"
                                className="px-7 py-2.5 cursor-pointer text-armsBlack rounded-sm font-semibold hover:bg-gray-200"
                            />
                        </div>
                        <div>
                            <Button
                                onClick={handleFormSubmit}
                                buttonType="button"
                                buttonTitle="Submit"
                                className="bg-armsjobslightblue text-lg text-armsWhite font-bold border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
