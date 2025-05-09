import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
//import DefaultProfile from "../../assets/images/DefaultProfile.jpg"
import { Button } from "../../common/Button"
import { InputField } from "../../common/InputField";
//import { SelectField } from "../../common/SelectField";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOverseasRecruitment } from "../../Commonapicall/Overseasapicall/Overseasapis";

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
        .min(10, "Mobile number is required")
        .regex(/^[0-9]+$/, "Must be a valid phone number"),
    whatsapp_no: zod
        .string()
        .min(1, "WhatsApp number is required")
        .regex(/^[0-9]+$/, "Must be a valid phone number"),
    email_address: zod
        .string()
        .min(1, "Email is required")
        .email("Must be a valid email"),
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
    additional_details: zod.string().optional(),
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
    const tabs = ['Company Details', "Recruitment Info", "Documents & Notes"];
    const [loading, setLoading] = useState(false);
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

    const onSubmit = async (data: OverseasRecruitmentFormData) => {
        setLoading(true);
        setError(null);
        
        // Convert uae_deployment_experience string to boolean
        const uaeExperience = data.uae_deployment_experience === "yes";
        
        try {
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
                comments: data.additional_details || ''
            };
            const result = await addOverseasRecruitment(requestData);
            // On success:
            console.log("Overseas recruitment added successfully", result);
            reset();
            closePopup();
            if (refreshData) refreshData();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to submit form";
            setError(errorMessage);
            console.error("Error adding recruitment:", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-armsAsh bg-opacity-70 flex justify-center items-start pt-25 z-50">
            <div className="bg-white rounded-lg shadow-lg w-24/25 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] p-6 relative">
                {/* Heading */}
                <div className="relative mb-5">
                    <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
                        Add Overseas Recruitment
                    </h2>
                </div>
                <div
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                >
                    <IoCloseOutline size={24} />
                </div>
                {/* Tabs */}
                <div className="flex gap-1 border-b-3 border-armsgrey mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-bold cursor-pointer ${activeTab === tab
                                ? "bg-main text-white"
                                : "text-black"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                {/* Error message display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="h-[calc(100%-150px)] overflow-y-auto">
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
                                            </div>
                                            {/* Mobilization Time */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Mobilization Time
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("mobilization_time")}
                                                    name="mobilization_time"
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
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

                    {activeTab === "Documents & Notes" && (
                        <div className="grid grid-cols-2 gap-2 px-4 w-1/2 max-xl:!w-3/4 max-lg:!w-full">
                            <div>
                                <label htmlFor="Uploadcv" className="text-sm font-semibold">
                                    Upload CV
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


                            <div>
                                <label htmlFor="additionalDetails" className="text-sm font-semibold mb-1">
                                    Additional Details
                                </label>
                                <textarea
                                    id="additionalDetails"
                                    {...register("additional_details")}
                                    name="additional_details"
                                    rows={4}
                                    className="w-full h-48 rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus:outline-none resize-y"
                                    placeholder="Enter details here..."
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
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                buttonType="button"
                                buttonTitle={loading ? "Submitting..." : "Submit"}
                                className="bg-armsjobslightblue text-lg text-armsWhite font-bold border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
