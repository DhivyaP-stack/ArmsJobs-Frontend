// import React, { useState } from "react";
// import { IoCloseOutline } from "react-icons/io5";
// import { Button } from "../../common/Button"
// import { InputField } from "../../common/InputField";
// import { FaCloudUploadAlt } from "react-icons/fa";

// interface ManpowerEditPopupProps {
//     // isOpen: boolean;
//     closePopup: () => void;
// }

// export const EditManpowerPopup: React.FC<ManpowerEditPopupProps> = ({
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
//                                         className="w-5 h-5 cursor-pointer"
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








import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../../common/Button";
import { InputField } from "../../common/InputField";
import { FaCloudUploadAlt } from "react-icons/fa";

import { fetchSupplierData, updateSupplier } from "../../Commonapicall/ManpowerSupplyapicall/Manpowerapis";

interface ManpowerEditPopupProps {
    closePopup: () => void;
    supplierId: number;
    onUpdate: () => void;
    onAgentAdded?: () => void;
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

export const EditManpowerPopup: React.FC<ManpowerEditPopupProps> = ({
    closePopup,
    supplierId,
    onUpdate,
    onAgentAdded
}) => {
    const [activeTab, setActiveTab] = useState("Company Details");
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<ManpowerSupplier>({
        id: 0,
        supplier_id: "",
        company_name: "",
        contact_person_name: "",
        mobile_no: "",
        whatsapp_no: "",
        email: "",
        office_location: "",
        categories_available: "",
        quantity_per_category: "",
        trade_license: null,
        company_license: null,
        previous_experience: false,
        worked_with_arms_before: false,
        comments: null,
        is_deleted: false,
        status: true,
        created_at: "",
        manpower_remarks: []
    });
    const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
    const [companyLicenseFile, setCompanyLicenseFile] = useState<File | null>(null);

    const tabs = ['Company Details', "Manpower Information", "Documents", "Experience", "Additional"];


    useEffect(() => {
        const getSupplier = async () => {
            try {
                const data = await fetchSupplierData(Number(supplierId));
                console.log("Fetched Supplier Data:", data);
                setFormData(data);
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        getSupplier();
    }, [supplierId]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === "yes"
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'trade' | 'company') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (type === 'trade') {
                setTradeLicenseFile(file);
            } else {
                setCompanyLicenseFile(file);
            }
        }
    };


    
const handleSubmit = async () => {
    try {
        await updateSupplier(supplierId, formData, tradeLicenseFile, companyLicenseFile);

        if (onAgentAdded) {
            onAgentAdded();
            closePopup();
        }

        onUpdate();
        closePopup();
    } catch (error) {
        console.error("Error updating supplier:", error);
    }
};

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleInputChange}
                                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                label={""}
                                            />
                                        </div>
                                        {/* Contact Person */}
                                        <div>
                                            <label className="text-sm font-semibold mb-1">
                                                Contact Person Name<span className="text-red-500">*</span>
                                            </label>
                                            <InputField
                                                type="text"
                                                name="contact_person_name"
                                                value={formData.contact_person_name}
                                                onChange={handleInputChange}
                                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                label={""}
                                            />
                                        </div>
                                        {/* Mobile Number */}
                                        <div>
                                            <label className="text-sm font-semibold mb-1">
                                                Mobile Number<span className="text-red-500">*</span>
                                            </label>
                                            <InputField
                                                type="text"
                                                name="mobile_no"
                                                value={formData.mobile_no}
                                                onChange={handleInputChange}
                                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                label={""}
                                            />
                                        </div>
                                        {/* WhatsApp Number */}
                                        <div>
                                            <label className="text-sm font-semibold mb-1">
                                                WhatsApp Number<span className="text-red-500">*</span>
                                            </label>
                                            <InputField
                                                type="text"
                                                name="whatsapp_no"
                                                value={formData.whatsapp_no}
                                                onChange={handleInputChange}
                                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                label={""}
                                            />
                                        </div>
                                        {/* Email ID */}
                                        <div>
                                            <label className="text-sm font-semibold mb-1">
                                                Email ID<span className="text-red-500">*</span>
                                            </label>
                                            <InputField
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                                                label={""}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold mb-1">Office Location</label>
                                            <InputField
                                                type="text"
                                                name="office_location"
                                                value={formData.office_location}
                                                onChange={handleInputChange}
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
                                                name="categories_available"
                                                value={formData.categories_available}
                                                onChange={handleInputChange}
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
                                                name="quantity_per_category"
                                                value={formData.quantity_per_category}
                                                onChange={handleInputChange}
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
                                    <label htmlFor="tradeLicense" className="text-sm font-semibold">
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
                                            id="tradeLicense"
                                            onChange={(e) => handleFileChange(e, 'trade')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="tradeLicense"
                                            className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2 text-center"
                                        >
                                            Browse Files
                                        </label>
                                        {tradeLicenseFile ? (
                                            <p className="text-xs text-gray-600 mb-2">{tradeLicenseFile.name}</p>
                                        ) : formData.trade_license ? (
                                            <p className="text-xs text-gray-600 mb-2">Current file: {formData.trade_license}</p>
                                        ) : (
                                            <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
                                        )}
                                    </div>
                                </div>
                                {/* Second Upload Block */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="companyLicense" className="text-sm font-semibold">
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
                                            id="companyLicense"
                                            onChange={(e) => handleFileChange(e, 'company')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="companyLicense"
                                            className="bg-armsjobslightblue cursor-pointer text-armsWhite font-semibold px-4 py-1 rounded hover:bg-armsWhite hover:text-armsjobslightblue border border-armsjobslightblue mb-2 text-center"
                                        >
                                            Browse Files
                                        </label>
                                        {companyLicenseFile ? (
                                            <p className="text-xs text-gray-600 mb-2">{companyLicenseFile.name}</p>
                                        ) : formData.company_license ? (
                                            <p className="text-xs text-gray-600 mb-2">Current file: {formData.company_license}</p>
                                        ) : (
                                            <p className="text-xs text-gray-400 mb-5">Max file size 500KB.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Experience" && (
                    <div className="flex gap-4 px-4 w-1/2">
                        <div className="w-full">
                            <label className="text-sm font-semibold mb-1 block">
                                Previous experience in manpower supplying
                            </label>
                            <div className="flex gap-4 pt-1.5">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="previous_experience"
                                        value="yes"
                                        checked={formData.previous_experience}
                                        onChange={handleRadioChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="previous_experience"
                                        value="no"
                                        checked={!formData.previous_experience}
                                        onChange={handleRadioChange}
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
                                        name="worked_with_arms_before"
                                        value="yes"
                                        checked={formData.worked_with_arms_before}
                                        onChange={handleRadioChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="worked_with_arms_before"
                                        value="no"
                                        checked={!formData.worked_with_arms_before}
                                        onChange={handleRadioChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    No
                                </label>
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
                                name="comments"
                                value={formData.comments || ''}
                                onChange={handleInputChange}
                                className="w-full rounded-[5px] border-[1px] border-armsgrey px-2 py-1.5 focus-within:outline-none"
                            />
                        </div>
                    </div>
                )}

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
                                onClick={handleSubmit}
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
