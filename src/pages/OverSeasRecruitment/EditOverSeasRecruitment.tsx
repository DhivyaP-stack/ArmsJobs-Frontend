import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
//import DefaultProfile from "../../assets/images/DefaultProfile.jpg"
import { Button } from "../../common/Button"
import { InputField } from "../../common/InputField";
//import { SelectField } from "../../common/SelectField";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateOverseasRecruitment } from "../../Commonapicall/Overseasapicall/Overseasapis";
import { toast } from "react-toastify";
import { SelectField } from "../../common/SelectField";

// Define the interface
interface OverseasRecruitmentAgency {
    id: number;
    overseas_recruitment_id: string;
    company_name: string;
    country: string;
    contact_person_name: string;
    mobile_no: string;
    whatsapp_no: string | null;
    email_address: string;
    categories_you_can_provide: string;
    nationality_of_workers: string;
    mobilization_time: string;
    uae_deployment_experience: boolean;
    relevant_docs: string | null;
    comments: string | null;
    status: boolean;
    created_at: string;
}
interface OverSeasAddPopupProps {
    // isOpen: boolean;
    closePopup: () => void;
    refreshData: () => void;
    editOverseas: OverseasRecruitmentAgency;
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
        .min(3, "Email is required")
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
const docsNotesSchema = zod.object({
    relevant_docs: zod.any().optional(),
    comments: zod.string().optional()
});

// Combined Schema
const overseasRecruitmentSchema = companyDetailsSchema
    .merge(recruitmentInfoSchema)
    .merge(docsNotesSchema);

type OverseasRecruitmentFormData = zod.infer<typeof overseasRecruitmentSchema>;

export const EditOverSeasPopup: React.FC<OverSeasAddPopupProps> = ({
    closePopup,
    refreshData,
    editOverseas
}) => {
    //   if (!isOpen) return null;
    const [activeTab, setActiveTab] = useState("Company Details");
    const tabs = ['Company Details', "Recruitment Info", "Documents", "Notes"];
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
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
        "Recruitment Info": [
            'categories_you_can_provide',
            'nationality_of_workers',
            'mobilization_time',
            'uae_deployment_experience',
        ],
        "Notes": [
            'comments',
        ],
    };

    useEffect(() => {
        if (editOverseas) {
            setValue("company_name", editOverseas.company_name || '');
            setValue("country", editOverseas.country || '');
            setValue("contact_person_name", editOverseas.contact_person_name || '');
            setValue("mobile_no", editOverseas.mobile_no || '');
            setValue("whatsapp_no", editOverseas.whatsapp_no || '');
            setValue("email_address", editOverseas.email_address || '');
            setValue("categories_you_can_provide", editOverseas.categories_you_can_provide || '');
            setValue("nationality_of_workers", editOverseas.nationality_of_workers || '');
            setValue("mobilization_time", editOverseas.mobilization_time || '');
            setValue("uae_deployment_experience", editOverseas.uae_deployment_experience ? 'yes' : 'no');
            setValue("comments", editOverseas.comments || '');
        }
    }, [editOverseas, setValue]);

    const [scrollToField, setScrollToField] = useState<string | null>(null);
    console.log("scrollToField", scrollToField)

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
                    comments: data.comments || ''  // Changed from additional_details to comments
                };
                // Call API to update overseas recruitment
                const response = await updateOverseasRecruitment(editOverseas.id, requestData);
                console.log("response", response)
                // On success:
                reset();
                closePopup();
                refreshData();
                toast.success("Overseas recruitment updated successfully");
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to update form";
                setError(errorMessage);
                toast.error("Failed to update form");
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
                        Edit Overseas Recruitment
                    </h2>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
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
                {/* Content */}
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
                                                {errors.company_name && <p className="text-sm text-red-500">{errors.company_name.message}</p>}
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
                                                {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
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
                                                            value="yes"
                                                            {...register("uae_deployment_experience")}
                                                            className="w-5 h-5 cursor-pointer"
                                                        />
                                                        Yes
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="no"
                                                            {...register("uae_deployment_experience")}
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
                        <div className="grid grid-cols-2 gap-2 px-4 w-1/2 max-xl:!w-3/4 max-lg:!w-full">
                            <div>
                                <label htmlFor="Uploadcv" className="text-sm font-semibold">
                                    Upload Relevant Documents
                                </label>
                                <div className="flex flex-col items-center border-dashed border-2 border-armsjobslightblue p-1 w-72">
                                    <div className="text-gray-400 text-5xl mb-2">
                                        <FaCloudUploadAlt className="text-main" />
                                    </div>
                                    <div className="w-max-43 flex flex-col items-center">
                                        <p className="text-armsBlack text-xs mb-2 text-center">
                                            Drag and drop your file here
                                        </p>
                                        <div className="flex items-center w-full mb-2">
                                            <hr className="flex-grow border-t border-armsBlack" />
                                            <span className="px-2 text-armsBlack text-xs">or</span>
                                            <hr className="flex-grow border-t border-armsBlack" />
                                        </div>
                                    </div>
                                    <Button
                                        buttonType="button"
                                        buttonTitle="Browse Files"
                                        className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2"
                                    />
                                    <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
                                </div>
                            </div>
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
                                className="bg-armsjobslightblue text-lg text-armsWhite font-bold border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
