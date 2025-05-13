// import React, { useState } from "react";
// import { IoCloseOutline } from "react-icons/io5";
// import { Button } from "../../common/Button"
// import { InputField } from "../../common/InputField";
// import { FaCloudUploadAlt } from "react-icons/fa";

// interface ManpowerAddPopupProps {
//     // isOpen: boolean;
//     closePopup: () => void;
// }

// export const AddManpowerPopup: React.FC<ManpowerAddPopupProps> = ({
//     // isOpen,
//     closePopup,
// }) => {
//     //   if (!isOpen) return null;
//     const [activeTab, setActiveTab] = useState("Company Details");
//     const tabs = ['Company Details', "Manpower Information", "Documents", "Experience", "Additional"];
//     return (
//         <div className="fixed inset-0 bg-armsAsh bg-opacity-70 flex justify-center items-start pt-25 z-50">
//             <div className="bg-white rounded-lg shadow-lg w-24/25 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] max-md:!h-[85%] p-6 relative">
//                 {/* Heading */}
//                 <div className="relative mb-5">
//                     <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
//                         Add Manpower Supply
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
//                             className={`px-4 py-2 text-sm font-bold cursor-pointer ${activeTab === tab
//                                 ? "bg-main text-white"
//                                 : "text-black"
//                                 }`}>
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
//                                                 name="companyname"
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* Mobile Number */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Mobile Number
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="mobileNumber"
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* WhatsApp Number */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 WhatsApp Number
//                                             </label>
//                                             <InputField
//                                                 type="text"
//                                                 name="whatsappNumber"
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
//                                         {/* Email ID */}
//                                         <div>
//                                             <label className="text-sm font-semibold mb-1">
//                                                 Email ID
//                                             </label>
//                                             <InputField
//                                                 type="email"
//                                                 name="email"
//                                                 className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
//                                                 label={""}
//                                             />
//                                         </div>
                                  
//                                         <div >
//                                             <label className="text-sm font-semibold mb-1">Office Location</label>
//                                             <InputField
//                                                 type="text"
//                                                 name="officelocation"
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
//                                                 name="categoriesavailable"
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
//                                                 name="quantitypercategory"
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
//                                     <label htmlFor="Uploadcv" className="text-sm font-semibold">
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
//                                         <Button
//                                             buttonType="button"
//                                             buttonTitle="Browse Files"
//                                             className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2"
//                                         />
//                                         <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
//                                     </div>
//                                 </div>
//                                 {/* Second Upload Block */}
//                                 <div className="flex flex-col gap-2 flex-1">
//                                     <label htmlFor="Uploadcv" className="text-sm font-semibold">
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
//                                         <Button
//                                             buttonType="button"
//                                             buttonTitle="Browse Files"
//                                             className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2"
//                                         />
//                                         <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "Experience" && (
//                     <div className="flex  gap-4 px-4 w-1/2 ">
//                         <div className="w-full">
//                             <label className="text-sm font-semibold mb-1 block">
//                                 Previous experience in manpower supplying
//                             </label>
//                             <div className="flex gap-4 pt-1.5">
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="recruitement"
//                                         value="yes"
//                                         className="w-5 h-5 cursor-pointer "
//                                     />
//                                     Yes
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="recruitement"
//                                         value="no"
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
//                                         name="associatedwithArms"
//                                         value="yes"
//                                         className="w-5 h-5 cursor-pointer"
//                                     />
//                                     Yes
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="associatedwithArms"
//                                         value="no"
//                                         className="w-5 h-5 cursor-pointer "
//                                     />
//                                     No
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Additional */}
//                 {activeTab === "Additional" && (
//                     <div className="flex  gap-4 px-4 w-1/4 ">
//                         <div className="w-full">
//                             <label className="text-sm font-semibold mb-1 block pb-0.5">
//                                 Comments
//                             </label>
//                             <textarea
//                                 name="comments"
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







import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../../common/Button";
import { InputField } from "../../common/InputField";
import { FaCloudUploadAlt } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface ManpowerAddPopupProps {
  closePopup: () => void;
  onSuccess?: () => void; // Optional success callback
  onAgentAdded?: () => void;
  refreshData: () => void;
}

// Define types based on API response
// interface ManpowerRemark {
//   id: number;
//   remark: string;
//   created_at: string;
//   updated_at: string;
// }

// Update Zod schema to match API exactly
const manpowerRemarkSchema = z.object({
  id: z.number(),
  remark: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const manpowerSupplierSchema = z.object({
  company_name: z.string().optional(),
  contact_person_name: z.string().min(1, "Contact person name is required"),
  mobile_no: z.string().min(1, "Mobile number is required"),
  whatsapp_no: z.string().min(1, "WhatsApp number is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  office_location: z.string().nullable().optional(),
  categories_available: z.string().nullable().optional(),
  quantity_per_category: z.string().nullable().optional(),
  trade_license: z.string().nullable().optional(),
  company_license: z.string().nullable().optional(),

//   previous_experience: z.boolean().default(false),
//   worked_with_arms_before: z.boolean().default(false),
//previous_experience: z.boolean(), // required boolean
  //worked_with_arms_before: z.boolean(), // required boolean
  previous_experience: z.enum(['yes', 'no']),
  worked_with_arms_before: z.enum(['yes', 'no']),
  comments: z.string().nullable().optional(),
  // These fields are managed by the server
  supplier_id: z.string().optional(),
  is_deleted: z.boolean().optional(),
  status: z.boolean().optional(),
  created_at: z.string().optional(),
  manpower_remarks: z.array(manpowerRemarkSchema).optional(),
});

type ManPowerFormData = z.infer<typeof manpowerSupplierSchema>;

export const AddManpowerPopup: React.FC<ManpowerAddPopupProps> = ({
  closePopup,
  onSuccess,
  onAgentAdded,
  refreshData,
}) => {
  const [activeTab, setActiveTab] = useState("Company Details");
  const tabs = ['Company Details', "Manpower Information", "Documents", "Experience", "Additional"];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm<ManPowerFormData>({
    resolver: zodResolver(manpowerSupplierSchema),
    defaultValues: {
      previous_experience: "no",
      worked_with_arms_before: "no",
      // Don't include server-managed fields in defaults
    }
  });


const onSubmit: SubmitHandler<ManPowerFormData> = async (data:ManPowerFormData) => {
    setIsSubmitting(true);
    console.log("Raw form data:", data); // Debug raw data
  
    const formData = new FormData();
    formData.append("company_name", data.company_name??"");
    formData.append("contact_person_name", data.contact_person_name);
    formData.append("mobile_no", data.mobile_no);
    formData.append("whatsapp_no", data.whatsapp_no);
    formData.append("email", data.email);
     formData.append("office_location",data?.office_location ?? "");
     formData.append("categories_available",data.categories_available ??"");
    formData.append("quantity_per_category",data.quantity_per_category ??"");
    // formData.append("trade_license",data.trade_license ??"");
    // formData.append("company_license",data.company_license ??"");
    // formData.append("previous_experience",String(data.previous_experience));
    // formData.append("worked_with_arms_before",String(data.worked_with_arms_before));
    // if (typeof data.previous_experience === "boolean") {
    //     formData.append("previous_experience", String(data.previous_experience)); // "false"
    // }
    
    // if (typeof data.worked_with_arms_before === "boolean") {
    //     formData.append("worked_with_arms_before", String(data.worked_with_arms_before)); // "false"
    // }
    
     formData.append("comments",data.comments??"")



    // Add other required fields...
  
    if (data.trade_license?.[0]) {
      formData.append("trade_license", data.trade_license[0]);
    }
  
    console.log("FormData contents:", [...formData.entries()]); // Debug FormData
  
    try {
      const response = await axios.post(
        "https://armsjob.vercel.app/api/manpower-suppliers/",
      
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (onAgentAdded) {
        onAgentAdded();
    }
      console.log("API response:", response.data); // Debug response
      closePopup();
      onSuccess?.();
      refreshData();
    } catch (error) {
      console.error("Detailed error:", error); // Detailed error logging
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className="fixed inset-0 bg-armsAsh bg-opacity-70 flex justify-center items-start pt-25 z-50">
            <div className="bg-white rounded-lg shadow-lg w-24/25 h-[75%] max-xl:!h-[85%] max-lg:!h-[90%] max-md:!h-[85%] p-6 relative">
                {/* Heading */}
                <div className="relative mb-5">
                    <h2 className="text-xl font-bold mb-4 border-b-2 border-armsgrey pb-3">
                        Add Manpower Supply
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
                            className={`px-4 py-2 text-sm font-bold cursor-pointer ${
                                activeTab === tab
                                    ? "bg-main text-white"
                                    : "text-black"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Company Details */}
                    {activeTab === "Company Details" && (
                        <div className="max-w-full mx-auto p-0 pl-1">
                            <div className="flex flex-row gap-1 items-start">
                                <div className="flex gap-6 w-3/4">
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="grid grid-cols-4 max-xl:!grid-cols-3 w-ful gap-4">
                                            {/* Company Name */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Company Name
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("company_name")}
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
                                                {errors.contact_person_name && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.contact_person_name.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Mobile Number */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Mobile Number<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="tele"
                                                    {...register("mobile_no")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.mobile_no && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.mobile_no.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* WhatsApp Number */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    WhatsApp Number<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="tele"
                                                    {...register("whatsapp_no")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.whatsapp_no && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.whatsapp_no.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Email ID */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Email ID<span className="text-red-500">*</span>
                                                </label>
                                                <InputField
                                                    type="email"
                                                    {...register("email")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Office Location */}
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Office Location
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("office_location")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.office_location && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.office_location.message}
                                                    </p>
                                                )}
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
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Categories Available
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("categories_available")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.categories_available && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.categories_available.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold mb-1">
                                                    Quantity per Category
                                                </label>
                                                <InputField
                                                    type="text"
                                                    {...register("quantity_per_category")}
                                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                    label={""}
                                                />
                                                {errors.quantity_per_category && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.quantity_per_category.message}
                                                    </p>
                                                )}
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
                                    {/* Trade License Upload */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="trade_license" className="text-sm font-semibold">
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
                                            <input
                                                type="file"
                                                id="trade_license"
                                                accept=".pdf,.jpg,.png"
                                                {...register("trade_license")}
                                                className="block w-full border border-gray-300 rounded px-2 py-1.5"
                                            />
                                            {errors.trade_license && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.trade_license.message as string}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
                                        </div>
                                    </div>
                                    
                                    {/* Company License Upload */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="company_license" className="text-sm font-semibold">
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
                                            <input
                                                type="file"
                                                id="company_license"
                                                accept=".pdf,.jpg,.png"
                                                {...register("company_license")}
                                                className="block w-full border border-gray-300 rounded px-2 py-1.5"
                                            />
                                            {errors.company_license && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.company_license.message as string}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {activeTab === "Experience" && (
                        <div className="flex gap-4 px-4 w-1/2">
                            <div className="w-full">
                                <label className="text-sm font-semibold mb-1 block">
                                    Previous experience in manpower supplying
                                </label>
                                <div className="flex gap-4 pt-1.5">
                                    {/* <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="true"
                                          
                                            {...register("previous_experience")}
                                              name="previous_experience"
                                            checked={watch("previous_experience") === true}
                                            onChange={() => setValue("previous_experience", true)}
                                            className="w-5 h-5 cursor-pointer"
                                        />  */}
                                      
{/* <input
    type="radio"
    {...register("previous_experience")}
    checked={watch("previous_experience") === true}
    onChange={() => setValue("previous_experience", true)}
    className="w-5 h-5 cursor-pointer"
/>
                                        */}
                                         {/* Yes
                                    </label> */}
                                    {/* <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="false"
                                            {...register("previous_experience")}
                                              name="previous_experience"
                                            checked={watch("previous_experience") === false}
                                            onChange={() => setValue("previous_experience", false)}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        No
                                    </label> */}


                                     <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="previous_experience"
                                            value="yes"
                                            checked={watch("previous_experience") === "yes"}
                                            onChange={() => setValue("previous_experience", "yes")}
                                            className="w-5 h-5 cursor-pointer "
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="previous_experience"
                                            value="no"
                                            checked={watch("previous_experience") === "no"}
                                            onChange={() => setValue("previous_experience", "no")}
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
                                            name="can_recruit"
                                            value="yes"
                                            checked={watch("worked_with_arms_before") === "yes"}
                                            onChange={() => setValue("worked_with_arms_before", "yes")}
                                            className="w-5 h-5 cursor-pointer "
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="worked_with_arms_before"
                                            value="no"
                                            checked={watch("worked_with_arms_before") === "no"}
                                            onChange={() => setValue("worked_with_arms_before", "no")}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        No
                                    </label>
                                    {/* <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="true"
                                            checked={watch("worked_with_arms_before") === true}
                                              name="worked_with_arms_before"
                                            onChange={() => setValue("worked_with_arms_before", true)}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="false"
                                            checked={watch("worked_with_arms_before") === false}
                                            name="worked_with_arms_before"
                                            onChange={() => setValue("worked_with_arms_before", false)}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        No
                                    </label> */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Additional */}
                    {activeTab === "Additional" && (
                        <div className="flex gap-4 px-4 w-1/4">
                            <div className="w-full">
                                <label className="text-sm font-semibold mb-1 block pb-0.5">
                                    Comments
                                </label>
                                <textarea
                                    {...register("comments")}
                                    className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                />
                                {errors.comments && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.comments.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 py-4">
                        <div className="flex justify-center gap-4 mt-8">
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
                                    type="submit"
                                    buttonTitle={isSubmitting ? "Submitting..." : "Submit"}
                                    disabled={isSubmitting}
                                    className={`bg-armsjobslightblue text-lg text-armsWhite font-bold border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
