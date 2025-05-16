import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../../common/Button"
import { InputField } from "../../common/InputField";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditManpowerSupply } from "../../Commonapicall/ManpowerSupplyapicall/Manpowerapis";
import { toast } from "react-toastify";

interface ManpowerEditPopupProps {
    closePopup: () => void;
    refreshData: () => void;
    editManpowerSupply: {
        id: number;
        supplier_id: string;
        company_name: string;
        contact_person_name: string;
    mobile_no: string;
    whatsapp_no: string;
    email: string;
    office_location: string;
    categories_available: string;
    quantity_per_category: string;
    trade_license: string | null;
    company_license: string | null;
    previous_experience: boolean;
    worked_with_arms_before: boolean;
    comments: string | null;
    }
}

export interface ManpowerRemark {
    id: number;
    remark: string;
    created_at: string;
    updated_at: string;
}

export interface ManpowerSupplier {
    id: number;
    supplier_id: string;
    company_name: string;
    contact_person_name: string;
    mobile_no: string;
    whatsapp_no: string;
    email: string;
    office_location: string;
    categories_available: string;
    quantity_per_category: string;
    trade_license: string | null;
    company_license: string | null;
    previous_experience: boolean;
    worked_with_arms_before: boolean;
    comments: string | null;
    is_deleted: boolean;
    status: boolean;
    created_at: string;
    manpower_remarks: ManpowerRemark[];
}

//Company details schema
const CompanydetailsSchema = zod.object({
    company_name: zod.string().optional(),
    contact_person_name: zod.string().min(3, "Contactperson name is required"),
    mobile_no: zod
        .string()
        .min(3, "WhatsApp number is required")
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    whatsapp_no: zod
        .string()
        .min(3, "WhatsApp number is required")
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: zod
        .string()
        .min(3, "Email ID is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    office_location: zod.string().optional(),
});

// ManpowerInfo Schema
const manpowerinfoSchema = zod.object({
    categories_available: zod.string().optional(),
    quantity_per_category: zod.string().optional(),
});

// Documents Schema
const documentsSchema = zod.object({
    trade_license: zod.any(), // Adjust based on your file validation needs
    company_license: zod.any(),
});

// Other Information Schema
const expSchema = zod.object({
    previous_experience: zod.string().optional(),
    worked_with_arms_before: zod.string().optional(),
});

const additionalSchema = zod.object({
    comments: zod.string().optional(),
});

// Combined Schema
const ManpowerSchema = CompanydetailsSchema
    .merge(manpowerinfoSchema)
    .merge(documentsSchema)
    .merge(expSchema)
    .merge(additionalSchema)

type ManpowerFormData = zod.infer<typeof ManpowerSchema>;


export const EditManpowerPopup: React.FC<ManpowerEditPopupProps> = ({
    closePopup,
    refreshData,
    editManpowerSupply,
}) => {
    const [activeTab, setActiveTab] = useState("Company Details");
    const tabs = ['Company Details', "Manpower Information", "Documents", "Experience", "Additional"];
    const [, setLoading] = useState(false);
    const [, setError] = useState<string | null>(null);
    const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
            setValue,
            trigger,
        } = useForm<ManpowerFormData>({
            resolver: zodResolver(ManpowerSchema),
            defaultValues: {
                previous_experience: "no", // Set default value for radio buttons
                worked_with_arms_before: "no"
            },
        });

          const tabFieldMapping: Record<string, string[]> = {
        "Company Details": [
            'company_name',
            'contact_person_name',
            'mobile_no',
            'whatsapp_no',
            'email',
            'office_location'
        ],
        "Manpower Information": [
            'categories_available',
            'quantity_per_category',
        ],
        "Documents": [
            'trade_license',
            'company_license',
        ],
        "Experience": [
            'previous_experience',
            'worked_with_arms_before'
        ],
        "Additional": [
            'comments'
        ],
    };

        useEffect(() => {
                if (editManpowerSupply) {
                    setValue("company_name", editManpowerSupply.company_name);
                    setValue("contact_person_name", editManpowerSupply.contact_person_name);
                    setValue("mobile_no", editManpowerSupply.mobile_no);
                    setValue("whatsapp_no", editManpowerSupply.whatsapp_no);
                    setValue("email", editManpowerSupply.email || '');
                    setValue("office_location", editManpowerSupply.office_location || '');
                    setValue("categories_available", editManpowerSupply.categories_available || '');
                    setValue("quantity_per_category", editManpowerSupply.quantity_per_category || '');
                    setValue("previous_experience", editManpowerSupply.previous_experience ? 'yes' : 'no');
                    setValue("worked_with_arms_before", editManpowerSupply.worked_with_arms_before ? 'yes' : 'no');
                    setValue("comments", editManpowerSupply.comments || '');
                }
            }, [editManpowerSupply, setValue]);

        const onSubmit = async (data: ManpowerFormData) => {
                setLoading(true);
                setError(null);
                try {
                    // Call the API function with all the form data
                    const response = await EditManpowerSupply(
                        editManpowerSupply.id,
                        data.company_name || '',
                        data.contact_person_name || '',
                    data.mobile_no || '',
                    data.whatsapp_no || '',
                    data.email || '', // Provide fallback empty string if optional
                    data.office_location || '',
                    data.categories_available || '',
                    data.quantity_per_category || 'no',
                    data.previous_experience || 'no',
                    data.worked_with_arms_before || '',
                    data.comments || '',
                    );
                    // On success:
                    reset();
                    closePopup();
                    refreshData();
                    console.log("Manpower Supply Updated successfully", response);
                    toast.success("Manpower Supply Updated successfully");
                } catch (error: any) {
                    setError(error.message || "Failed to submit form");
                    toast.error("Failed to submit form");
                } finally {
                    setLoading(false);
                }
            };


             const [scrollToField, setScrollToField] = useState<string | null>(null);
                console.log("scrollToField", scrollToField)
            
                const handleFormSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
            
                    const result = await trigger();
            
                    if (!result) {
                        const firstErrorField = Object.keys(errors)[0];
            
                        if (firstErrorField) {
                            for (const [tabName, fields] of Object.entries(tabFieldMapping)) {
                                if (fields.includes(firstErrorField)) {
                                    setActiveTab(tabName);
                                    setScrollToField(firstErrorField);
                                    break;
                                }
                            }
                        }
                        return;
                    }
            
                    handleSubmit(onSubmit)(e);
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
                    <div className="bg-white rounded-lg shadow-lg w-24/25 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] max-md:!h-[85%] p-6 relative">
                        {/* Heading */}
                        <div className="relative mb-5">
                            <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
                                Edit Manpower Supply
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
                             {tabs.map((tab) => {
                        const hasError = tabFieldMapping[tab]?.some(field => field in errors);
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-bold cursor-pointer relative ${activeTab === tab
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
        
                      <form onSubmit={handleFormSubmit} className="h-[calc(100%-150px)] overflow-y-auto">
                        {/* Company Details */}
                        {activeTab === "Company Details" && (
                            <div className="max-w-full mx-auto p-0 pl-1">
                                <div className="flex flex-row gap-1 items-start">
                                    <div className="flex gap-6 w-3/4">
                                        {/* Form Fields */}
                                        <div className="flex flex-col gap-4 flex-1">
                                            {/* First Row */}
                                            <div className="grid grid-cols-4 max-xl:!grid-cols-3 w-ful gap-4">
                                                {/* Company Name */}
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
                                                </div>
                                                {/* Mobile Number */}
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
                                                        type="text"
                                                        {...register("mobile_no")}
                                                        name="mobile_no"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
                                                    />
                                                    {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no.message}</p>}
                                                </div>
                                                {/* WhatsApp Number */}
                                                <div>
                                                    <label className="text-sm font-semibold mb-1">
                                                        WhatsApp Number<span className="text-red-500">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        {...register("whatsapp_no")}
                                                        name="whatsapp_no"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
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
                                                        {...register("email")}
                                                        name="email"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
                                                    />
                                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                                </div>
                                          
                                                <div >
                                                    <label className="text-sm font-semibold mb-1">Office Location</label>
                                                    <InputField
                                                        type="text"
                                                        {...register("office_location")}
                                                        name="office_location"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Manpower Information */}
                        {activeTab === "Manpower Information" && (
                            <div className="max-w-full mx-auto p-0 pl-1">
                                <div className="flex flex-row gap-1 items-start">
                                    <div className="flex gap-6 w-1/2">
                                        {/* Form Fields */}
                                        <div className="flex flex-col gap-4 flex-1">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-sm font-semibold mb-1">
                                                        Categories Available
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        {...register("categories_available")}
                                                        name="categories_available"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
                                                    />
                                                </div>
        
                                                <div>
                                                    <label className="text-sm font-semibold mb-1">
                                                        Quantity per Category
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        {...register("quantity_per_category")}
                                                        name="quantity_per_category"
                                                        className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                        label={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Documents */}
                        {activeTab === "Documents" && (
                            <div className="max-w-full mx-auto p-0 pl-1">
                                <div className="flex flex-row gap-6 items-start">
                                    <div className="flex gap-13 w-auto">
                                        {/* First Upload Block */}
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label htmlFor="Uploadcv" className="text-sm font-semibold">
                                                Upload Trade License
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
                                        {/* Second Upload Block */}
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label htmlFor="Uploadcv" className="text-sm font-semibold">
                                                Upload Company License
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
                                </div>
                            </div>
                        )}
        
                        {activeTab === "Experience" && (
                            <div className="flex  gap-4 px-4 w-1/2 ">
                                <div className="w-full">
                                    <label className="text-sm font-semibold mb-1 block">
                                        Previous experience in manpower supplying
                                    </label>
                                    <div className="flex gap-4 pt-1.5">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register("previous_experience")}
                                                name="previous_experience"
                                                value="yes"
                                                className="w-5 h-5 cursor-pointer "
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register("previous_experience")}
                                                name="previous_experience"
                                                value="no"
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-semibold mb-1 block">
                                        If worked earlier with Arms
                                    </label>
                                    <div className="flex gap-4 pt-1.5">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register("worked_with_arms_before")}
                                                name="worked_with_arms_before"
                                                value="yes"
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                {...register("worked_with_arms_before")}
                                                name="worked_with_arms_before"
                                                value="no"
                                                className="w-5 h-5 cursor-pointer "
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
        
                        {/* Additional */}
                        {activeTab === "Additional" && (
                            <div className="flex  gap-4 px-4 w-1/4 ">
                                <div className="w-full">
                                    <label className="text-sm font-semibold mb-1 block pb-0.5">
                                        Comments
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



// import React, { useState, useEffect } from "react";
// import { IoCloseOutline } from "react-icons/io5";
// import { Button } from "../../common/Button";
// import { InputField } from "../../common/InputField";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { fetchSupplierData, updateSupplier } from "../../Commonapicall/ManpowerSupplyapicall/Manpowerapis";
// import { toast } from "react-toastify";

// interface ManpowerEditPopupProps {
//     closePopup: () => void;
//     supplierId: number;
//     onUpdate: () => void;
//     onAgentAdded?: () => void;
//     refreshData: () => void;
// }

// export interface ManpowerRemark {
//     id: number;
//     remark: string;
//     created_at: string;
//     updated_at: string;
// }

// export interface ManpowerSupplier {
//     id: number;
//     supplier_id: string;
//     company_name: string;
//     contact_person_name: string;
//     mobile_no: string;
//     whatsapp_no: string;
//     email: string;
//     office_location: string;
//     categories_available: string;
//     quantity_per_category: string;
//     trade_license: string | null;
//     company_license: string | null;
//     previous_experience: boolean;
//     worked_with_arms_before: boolean;
//     comments: string | null;
//     is_deleted: boolean;
//     status: boolean;
//     created_at: string;
//     manpower_remarks: ManpowerRemark[];
// }

// export const EditManpowerPopup: React.FC<ManpowerEditPopupProps> = ({
//     closePopup,
//     supplierId,
//     onUpdate,
//     onAgentAdded,
//     refreshData,
// }) => {
//     const [activeTab, setActiveTab] = useState("Company Details");
//     const [isLoading, setIsLoading] = useState(true);
//     const [formData, setFormData] = useState<ManpowerSupplier>({
//         id: 0,
//         supplier_id: "",
//         company_name: "",
//         contact_person_name: "",
//         mobile_no: "",
//         whatsapp_no: "",
//         email: "",
//         office_location: "",
//         categories_available: "",
//         quantity_per_category: "",
//         trade_license: null,
//         company_license: null,
//         previous_experience: false,
//         worked_with_arms_before: false,
//         comments: null,
//         is_deleted: false,
//         status: true,
//         created_at: "",
//         manpower_remarks: []
//     });
//     const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
//     const [companyLicenseFile, setCompanyLicenseFile] = useState<File | null>(null);
//     const tabs = ['Company Details', "Manpower Information", "Documents", "Experience", "Additional"];


//     useEffect(() => {
//         const getSupplier = async () => {
//             try {
//                 const data = await fetchSupplierData(Number(supplierId));
//                 console.log("Fetched Supplier Data:", data);
//                 setFormData(data);
//             } catch (error) {
//                 console.error("Error fetching supplier data:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
    
//         getSupplier();
//     }, [supplierId]);
    
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value === "yes"
//         }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'trade' | 'company') => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             if (type === 'trade') {
//                 setTradeLicenseFile(file);
//             } else {
//                 setCompanyLicenseFile(file);
//             }
//         }
//     };
    
    
// const handleSubmit = async () => {
//     try {
//         await updateSupplier(supplierId, formData, tradeLicenseFile, companyLicenseFile);

//         if (onAgentAdded) {
//             onAgentAdded();
//             closePopup();
//         }

//         onUpdate();
//         closePopup();
//         refreshData();
//         toast.success("Manpower Updated Successfully");
//     } catch (error) {
//         console.error("Error updating supplier:", error);
//     }
// };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="fixed inset-0 bg-armsAsh bg-opacity-70 flex justify-center items-start pt-25 z-50">
//             <div className="bg-white rounded-lg shadow-lg w-24/25 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] max-md:!h-[85%] p-6 relative">
//                 {/* Heading */}
//                 <div className="relative mb-5">
//                     <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
//                         Edit Manpower Supply
//                     </h2>
//                 </div>
//                 <div
//                     onClick={closePopup}
//                     className="absolute top-2 right-2 text-gray-500 cursor-pointer"
//                 >
//                     <IoCloseOutline size={24} />
//                 </div>
//                 {/* Tabs */}
//                 <div className="flex gap-1 border-b-3 border-armsgrey mb-6">
//                     {tabs.map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-4 py-2 text-sm font-bold cursor-pointer ${
//                                 activeTab === tab
//                                     ? "bg-main text-white"
//                                     : "text-black"
//                             }`}
//                         >
//                             {tab}
//                         </button>
//                     ))}
//                 </div>
//                 {/* Company Details */}
//                 {activeTab === "Company Details" && (
//                     <div className="max-w-full mx-auto p-0 pl-1">
//                         <div className="flex flex-row gap-1 items-start">
//                             <div className="flex gap-6 w-3/4">
//                                 {/* Form Fields */}
//                                 <div className="flex flex-col gap-4 flex-1">
//                                     {/* First Row */}
//                                     <div className="grid grid-cols-4 max-xl:!grid-cols-3 w-ful gap-4">
//                                         {/* Company Name */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Company Name
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="company_name"
//                                                 value={formData.company_name}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* Contact Person */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Contact Person Name<span className="text-red-500">*</span>
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="contact_person_name"
//                                                 value={formData.contact_person_name}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* Mobile Number */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Mobile Number<span className="text-red-500">*</span>
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="mobile_no"
//                                                 value={formData.mobile_no}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* WhatsApp Number */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 WhatsApp Number<span className="text-red-500">*</span>
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="whatsapp_no"
//                                                 value={formData.whatsapp_no}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* Email ID */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Email ID<span className="text-red-500">*</span>
//                                             </label>
//                                             <InputField
//                                                 type="email"
//                                                 name="email"
//                                                 value={formData.email}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">Office Location</label>
//                                             <InputField
//                                                 type="text"
//                                                 name="office_location"
//                                                 value={formData.office_location}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 {/* Manpower Information */}
//                 {activeTab === "Manpower Information" && (
//                     <div className="max-w-full mx-auto p-0 pl-1">
//                         <div className="flex flex-row gap-1 items-start">
//                             <div className="flex gap-6 w-1/2">
//                                 {/* Form Fields */}
//                                 <div className="flex flex-col gap-4 flex-1">
//                                     <div className="grid grid-cols-2 gap-3">
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Categories Available
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="categories_available"
//                                                 value={formData.categories_available}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Quantity per Category
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="quantity_per_category"
//                                                 value={formData.quantity_per_category}
//                                                 onChange={handleInputChange}
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 {/* Documents */}
//                 {activeTab === "Documents" && (
//                     <div className="max-w-full mx-auto p-0 pl-1">
//                         <div className="flex flex-row gap-6 items-start">
//                             <div className="flex gap-13 w-auto">
//                                 {/* First Upload Block */}
//                                 <div className="flex flex-col gap-2 flex-1">
//                                     <label htmlFor="tradeLicense" className="text-sm font-semibold">
//                                         Upload Trade License
//                                     </label>
//                                     <div className="flex flex-col items-center border-dashed border-2 border-armsjobslightblue p-1 w-72">
//                                         <div className="text-gray-400 text-5xl mb-2">
//                                             <FaCloudUploadAlt className="text-main" />
//                                         </div>

//                                         <div className="w-max-43 flex flex-col items-center">
//                                             <p className="text-armsBlack text-xs mb-2 text-center">
//                                                 Drag and drop your file here
//                                             </p>
//                                             <div className="flex items-center w-full mb-2">
//                                                 <hr className="flex-grow border-t border-armsBlack" />
//                                                 <span className="px-2 text-armsBlack text-xs">or</span>
//                                                 <hr className="flex-grow border-t border-armsBlack" />
//                                             </div>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             id="tradeLicense"
//                                             onChange={(e) => handleFileChange(e, 'trade')}
//                                             className="hidden"
//                                         />
//                                         <label
//                                             htmlFor="tradeLicense"
//                                             className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2 text-center"
//                                         >
//                                             Browse Files
//                                         </label>
//                                         {tradeLicenseFile ? (
//                                             <p className="text-xs text-gray-600 mb-2">{tradeLicenseFile.name}</p>
//                                         ) : formData.trade_license ? (
//                                             <p className="text-xs text-gray-600 mb-2">Current file: {formData.trade_license}</p>
//                                         ) : (
//                                             <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Second Upload Block */}
//                                 <div className="flex flex-col gap-2 flex-1">
//                                     <label htmlFor="companyLicense" className="text-sm font-semibold">
//                                         Upload Company License
//                                     </label>
//                                     <div className="flex flex-col items-center border-dashed border-2 border-armsjobslightblue p-1 w-72">
//                                         <div className="text-gray-400 text-5xl mb-2">
//                                             <FaCloudUploadAlt className="text-main" />
//                                         </div>
//                                         <div className="w-max-43 flex flex-col items-center">
//                                             <p className="text-armsBlack text-xs mb-2 text-center">
//                                                 Drag and drop your file here
//                                             </p>
//                                             <div className="flex items-center w-full mb-2">
//                                                 <hr className="flex-grow border-t border-armsBlack" />
//                                                 <span className="px-2 text-armsBlack text-xs">or</span>
//                                                 <hr className="flex-grow border-t border-armsBlack" />
//                                             </div>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             id="companyLicense"
//                                             onChange={(e) => handleFileChange(e, 'company')}
//                                             className="hidden"
//                                         />
//                                         <label
//                                             htmlFor="companyLicense"
//                                             className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2 text-center"
//                                         >
//                                             Browse Files
//                                         </label>
//                                         {companyLicenseFile ? (
//                                             <p className="text-xs text-gray-600 mb-2">{companyLicenseFile.name}</p>
//                                         ) : formData.company_license ? (
//                                             <p className="text-xs text-gray-600 mb-2">Current file: {formData.company_license}</p>
//                                         ) : (
//                                             <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "Experience" && (
//                     <div className="flex gap-4 px-4 w-1/2">
//                         <div className="w-full">
//                             <label className="text-sm font-semibold mb-1 block">
//                                 Previous experience in manpower supplying
//                             </label>
//                             <div className="flex gap-4 pt-1.5">
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="previous_experience"
//                                         value="yes"
//                                         checked={formData.previous_experience}
//                                         onChange={handleRadioChange}
//                                         className="w-5 h-5 cursor-pointer"
//                                     />
//                                     Yes
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="previous_experience"
//                                         value="no"
//                                         checked={!formData.previous_experience}
//                                         onChange={handleRadioChange}
//                                         className="w-5 h-5 cursor-pointer"
//                                     />
//                                     No
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="w-full">
//                             <label className="text-sm font-semibold mb-1 block">
//                                 If worked earlier with Arms
//                             </label>
//                             <div className="flex gap-4 pt-1.5">
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="worked_with_arms_before"
//                                         value="yes"
//                                         checked={formData.worked_with_arms_before}
//                                         onChange={handleRadioChange}
//                                         className="w-5 h-5 cursor-pointer"
//                                     />
//                                     Yes
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="worked_with_arms_before"
//                                         value="no"
//                                         checked={!formData.worked_with_arms_before}
//                                         onChange={handleRadioChange}
//                                         className="w-5 h-5 cursor-pointer"
//                                     />
//                                     No
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Additional */}
//                 {activeTab === "Additional" && (
//                     <div className="flex gap-4 px-4 w-1/4">
//                         <div className="w-full">
//                             <label className="text-sm font-semibold mb-1 block pb-0.5">
//                                 Comments
//                             </label>
//                             <textarea
//                                 name="comments"
//                                 value={formData.comments || ''}
//                                 onChange={handleInputChange}
//                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="absolute bottom-0 left-0 right-0 py-4 ">
//                     <div className="flex justify-center gap-4 mt-8 ">
//                         <div>
//                             <Button
//                                 onClick={closePopup}
//                                 buttonType="button"
//                                 buttonTitle="Cancel"
//                                 className="px-7 py-2.5 cursor-pointer text-armsBlack rounded-sm font-semibold hover:bg-gray-200"
//                             />
//                         </div>
//                         <div>
//                             <Button
//                                 onClick={handleSubmit}
//                                 buttonType="button"
//                                 buttonTitle="Submit"
//                                 className="bg-armsjobslightblue text-lg text-armsWhite font-bold border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
