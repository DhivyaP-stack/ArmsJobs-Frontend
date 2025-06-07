import React from "react"
import { MdDelete, MdModeEdit } from "react-icons/md";
//import { AddJobPostingPopup } from "./AddJobPostingPopup";

export const JobpostingTable: React.FC = () => {
   // const [showAddPopup, setShowAddPopup] = useState(false);

    function openEditCategoryPopup(): void {
        throw new Error("Function not implemented.");
    }
    function openDeleteCategoryPopup(): void {
        throw new Error("Function not implemented.");
    }

    // const handleRefreshData = () => {
    //     // TODO: Implement refresh data functionality
    // };

    return (
        <div>
            {/* {showAddPopup && (
                <AddJobPostingPopup
                    closePopup={() => setShowAddPopup(false)}
                    refreshData={handleRefreshData}
                />
            )} */}
            <table className="w-full table-auto text-sm">
                <thead className="bg-main text-left">
                    <tr className="text-armsWhite whitespace-nowrap">
                        <th className="bg-main px-2 py-3">Job Type</th>
                        <th className="bg-main px-2 py-3">Job No</th>
                        <th className="bg-main px-2 py-3">Job Location</th>
                        <th className="bg-main px-2 py-3">Experience</th>
                        <th className="bg-main px-2 py-3">Salary</th>
                        <th className="bg-main px-2 py-3">Job Title</th>
                        <th className="bg-main px-2 py-3">Job description</th>
                        <th className="bg-main px-2 py-3">Status</th>
                        <th className="bg-main px-2 py-3">Created Date & Time</th>
                        <th className="bg-main px-2 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-black">
                    <tr className="border-b ">
                        <td className="px-2 py-5 font-medium content-start">Full Time</td>
                        <td className="px-2 py-5 font-medium content-start">12025SE</td>
                        <td className="px-2 py-5 font-medium content-start">Dubai</td>
                        <td className="px-2 py-5 font-medium content-start">3-5Years</td>
                        <td className="px-2 py-5 font-medium content-start">5000-8000</td>
                        <td className="px-2 py-5 font-medium content-start">QA Testing</td>
                        <td className="px-3 py-5 w-[380px] font-medium content-start">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus,
                            mauris et viverra ultrices, mi augue molestie orci, eu imperdiet lacus
                            ipsum at lacus. Nunc non facilisis arcu. Maecenas non lobortis massa.
                            Nam vehicula malesuada lacus, vitae tristique eros rutrum in. Nunc quis
                            ante vel metus ullamcorper interdum sit amet viverra mi.
                        </td>
                        <td className="px-2 py-5 font-medium content-start">Active</td>
                        <td className="px-2 py-5 font-medium content-start">14-02-2025 10:25:12</td>
                        <td className="px-2 py-5 font-medium content-start flex gap-2">
                            {/* Edit */}
                            <div
                                onClick={() => openEditCategoryPopup()}
                                className="relative flex items-center justify-center border border-armsjobslightblue rounded-full px-2 py-2 cursor-pointer group bg-armsjobslightblue hover:bg-white transition-all duration-200"
                            >
                                <MdModeEdit className="text-white group-hover:text-armsjobslightblue text-xl" />
                                <div
                                    onClick={() => openEditCategoryPopup()}
                                    className="absolute -top-6.5 bg-armsjobslightblue text-armsWhite text-xs font-semibold px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    Edit
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center border border-armsjobslightblue rounded-full px-2 py-2 cursor-pointer group bg-armsjobslightblue hover:bg-white transition-all duration-200">
                                <MdDelete
                                    onClick={() => openDeleteCategoryPopup()}
                                    className="text-white group-hover:text-armsjobslightblue text-xl" />
                                <div
                                    onClick={() => openDeleteCategoryPopup()}
                                    className="absolute -top-6.5 bg-armsjobslightblue text-armsWhite text-xs font-semibold px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    Delete
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
