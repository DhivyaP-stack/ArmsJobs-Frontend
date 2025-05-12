import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Profileimg from "../../assets/images/profileimg.jpg"
import { IoDocumentText } from "react-icons/io5";
import { Button } from "../../common/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { EditManpowerPopup } from "./EditManpowerSupplyPopup";
import { addManPowerRemark, fetchManpowerList, fetchManPowerListById, fetchManPowerSearch } from "../../Commonapicall/ManpowerSupplyapicall/Manpowerapis";
import { ManpowerSupplier, ManpowerSupplierResponse } from "./ManPowerSupplyTable";
import { toast } from "react-toastify";
import { z } from "zod";
import { AgentSupplierViewShimmer } from "../../components/ShimmerLoading/ShimmerViewpage/CommonViewShimmer";

export interface ManPowerData {
    data: ManPowerData[] | PromiseLike<ManPowerData[]>;
    id: number;
    contact_person_name: string;
}
export interface ManPowerSearchResponse {
    status: string;
    message: string;
    data: ManPowerData[];
    count: number;
    next: string | null;
    previous: string | null;
}

// Add this before the component
const remarkSchema = z.object({
    remark: z.string().min(1, "Remark is required").max(500, "Remark must be less than 500 characters")
});


export const ManPowerSupplyView = () => {
    const { id } = useParams<{ id: string }>();



    const [newRemark, setNewRemark] = useState("");

    //const [, setLoading] = useState(false);
    const [showEditManpowerPopup, setShowEditManpowerPopup] = useState(false);
    const [loading, setLoading] = useState(false)
    const [ManPowerSearch, setManPowerSearch] = useState<ManPowerData[]>([])
    const [searchQuer, setSearchQuer] = useState("");
    const [manPower, setManPower] = useState<ManpowerSupplier | null>(null)
    const [manPowers, setManPowers] = useState<ManpowerSupplier[]>([])
    const [remarkError, setRemarkError] = useState<string | null>(null);
    const navigate = useNavigate();

    const openEditManpowerPopup = () => {
        setShowEditManpowerPopup(true);
    }

    const closeEditManpowerPopup = () => {
        setShowEditManpowerPopup(false)
    }

    const handleAddRemark = async () => {
        try {
            // Validate the remark
            const validationResult = remarkSchema.safeParse({ remark: newRemark });
            if (!validationResult.success) {
                const errorMessage = validationResult.error.errors[0]?.message || "Invalid remark";
                setRemarkError(errorMessage);
                toast.error(errorMessage);
                return;
            }
            if (!manPower?.id) {
                toast.error("Manpower supplier ID is required");
                return;
            }
            setRemarkError(null);

            // Call the API to add the remark
            const response = await addManPowerRemark(manPower.id, newRemark);

            if (response) {
                // Create a new remark object that matches the ManpowerRemark type
                const newRemarkObj = {
                    id: Date.now(), // Use ID from response if available
                    remark: newRemark,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(), // Add the required updated_at field
                    // Add any other required fields from your ManpowerRemark interface
                };

                // Update the local state with the new remark
                setManPower(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        manpower_remarks: [...prev.manpower_remarks, newRemarkObj]
                    };
                });

                // Clear the remark input
                setNewRemark("");
                toast.success("Remark added successfully");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to add remark";
            toast.error(errorMessage);
            console.error("Error adding remark:", error);
        }
    };




    const handleSearch = async (query: string) => {
        try {
            const result = await fetchManPowerSearch(query);
            setManPowerSearch(result);
        } catch (err) {
            console.error("Search error", err);
        }

    };


    useEffect(() => {
        if (searchQuer.trim().length > 0) {
            handleSearch(searchQuer);
        } else {
            setManPowerSearch([]); // Clear results if search is empty
        }
    }, [searchQuer]);


    const filteredCandidates = searchQuer.trim() ? ManPowerSearch : manPowers;
    useEffect(() => {
        const fetchAgent = async () => {
            setLoading(true);
            try {

                const response = await fetchManpowerList() as ManpowerSupplierResponse;
                console.log("response?.data?.data", response?.results?.data)
                setManPowers(response?.results?.data);
                //setTotalItems(response.count);
            } catch (err) {

                console.error("Error fetching candidates:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, []);

    useEffect(() => {
        if (id) {
            fetchManPowerListById(Number(id))
                .then(setManPower)
                .catch(err => console.error(err.message));
        }
    }, [id]);


    // Define fetchSingleAgent outside useEffect so it can be reused
    const fetchSingleAgent = async () => {
        try {
            if (id) {
                const response = await fetchManPowerListById(Number(id));
                console.log("Mapower list by selected id", response)
                setManPower(response);
                // setAgentId(response.id);   
            }
        } catch (err) {
            console.error("Error fetching agent by ID:", err);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchSingleAgent();
    }, [id]);

    if (loading ) {
        return <AgentSupplierViewShimmer />;
    }


    return (
        // <div className="min-h-screen bg-gray-100">
        <div className="p-4">
            <div className="bg-white px-5 py-1 rounded-lg shadow-sm ">
                {/* Header */}
                <div className="flex justify-between items-center p-1">
                    <div className="flex items- p-3">
                        <span className="text-2xl font-bold">Manpower Supply</span>
                        <span className="mx-2 pt-2 text-xl"><MdOutlineKeyboardArrowRight /></span>
                        <span className="text-gray-500 pt-2 text-sm font-medium underline">Dashboard</span>
                        <span className="mx-2 pt-2 text-sm">{"/"}</span>
                        <span className="text-gray-500 pt-2 text-sm font-medium ">Manpower Supply</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <Button
                            buttonType="button"
                            buttonTitle="Back"
                            onClick={() => navigate(-1)}
                            icon={
                                <FaArrowLeft />
                            }
                            className="px-4 py-2 bg-armsjobslightblue text-sm font-semibold text-armsWhite border-[1px] rounded-md cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    {/* Left Column - Candidate Names */}
                    <div className="w-1/4 border-armsBlack border-1 rounded ">
                        <div className="bg-white rounded shadow-sm">
                            <div className="bg-main text-armsWhite p-4 ">
                                <h2 className="text-base font-semibold">Contact Person Names ({filteredCandidates.length})</h2>
                            </div>
                            <div className="p-4">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuer}
                                    onChange={(e) => setSearchQuer(e.target.value)}
                                    className="w-full rounded-[5px] border-[1px] border-armsgrey pl-2 pr-2 py-1.5 focus-within:outline-none"
                                />
                                <div className="space-y-0 max-h-100% overflow-y-auto">
                                    {filteredCandidates.map((c) => (
                                        <Link
                                            key={c.id}
                                            // to={`/Candidate/${id}/${c.id}`}
                                            to={`/ManPowerSupplyView/${c.id}`}
                                            className={`block p-3 border-b ${c.id === Number(id)} hover:bg-gray-100
                                                    `}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex-grow">
                                                    <div className="text-sm font-medium">{c.contact_person_name}</div>
                                                    {/* <div className="text-xs text-gray-500 mt-1">ID: {c.candidateId}</div> */}
                                                </div>
                                                {/* <div className={`w-2 h-2 rounded-full ${c.isActive ? 'bg-green-500' : 'bg-gray-400'}`} /> */}
                                            </div>
                                        </Link>
                                    ))}
                                    {filteredCandidates.length === 0 && (
                                        <div className="text-center py-4 text-gray-500">
                                            No Contact Names found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full bg-white border border-armsBlack rounded shadow-sm">
                        {/* Middle Column - Candidate Details */}
                        <div className="flex-[3] p-2">
                            <div className="p-0">
                                {/* Company Details */}
                                <div className="mb-6 ">
                                    <div className="flex items-center justify-between mb-1 border-b">
                                        <h2 className="text-xl font-bold">Company Details</h2>
                                    </div>

                                    <div className="flex justify-start  ">
                                        <div className="grid  grid-cols-3 gap-4 pt-2 w-full max-xl:!grid-cols-2">
                                            <div>
                                                <p className="text-xs text-gray-600">Company Name</p>
                                                <p className="text-sm font-bold mt-1">{manPower?.company_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Email ID</p>
                                                <p className="text-sm font-bold mt-1">{manPower?.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Contact Person Name</p>
                                                <p className="text-sm font-bold mt-1">{manPower?.contact_person_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Mobile Number</p>
                                                <p className="text-sm font-bold mt-1">{manPower?.mobile_no}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Office Location</p>
                                                <p className="text-sm font-bold mt-1">{manPower?.office_location}</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={openEditManpowerPopup}
                                            buttonType="button"
                                            buttonTitle="Edit"
                                            className="px-4 py-1 bg-armsjobslightblue text-sm text-armsWhite font-semibold border-[1px] rounded-sm cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6 ">
                                    <div className="flex items-center justify-between mb-1 border-b">
                                        <h2 className="text-xl font-bold">ManPower information</h2>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        <div>
                                            <p className="text-xs text-gray-600">Nature of Work</p>
                                            <p className="text-sm font-bold mt-1">{ }</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">Project Location</p>
                                            <p className="text-sm font-bold mt-1">{manPower?.office_location}</p>
                                        </div>

                                    </div>
                                </div>


                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-1 border-b">
                                        <h2 className="text-xl font-bold">Documents</h2>
                                    </div>
                                    <div className="flex grid-cols-4 gap-4 pt-2">

                                        <div>
                                            <h3 className="text-xs text-gray-600 mb-2">Upload Trade License</h3>
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl text-armsjobslightblue"><IoDocumentText /></span>
                                                <div>
                                                    <p className="text-sm font-bold">Babu.doc</p>
                                                    <p className="text-xs text-gray-400">470 KB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xs text-gray-600 mb-2">Upload Company License</h3>
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl text-armsjobslightblue"><IoDocumentText /></span>
                                                <div>
                                                    <p className="text-sm font-bold">Babu.doc</p>
                                                    <p className="text-xs text-gray-400">470 KB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="mb-6 ">
                                    <div className="flex items-center justify-between mb-1 border-b">
                                        <h2 className="text-xl font-bold">Experience</h2>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        <div>
                                            <p className="text-xs text-gray-600">Previous experience in manpower supplying</p>
                                            <p className="text-sm font-bold mt-1">{manPower?.previous_experience}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">If worked earlier with Arms</p>
                                            <p className="text-sm font-bold mt-1">{manPower?.previous_experience}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-6 ">
                                    <div className="flex items-center justify-between mb-1 border-b">
                                        <h2 className="text-xl font-bold">Additional</h2>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        <div>
                                            <p className="text-xs text-gray-600">Comments</p>
                                            <p className="text-sm font-bold mt-1">{manPower?.comments}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Remarks */}
                        <div className="flex-[1.5] p-2 ">
                            <div className="bg-gray-100 rounded shadow-sm">
                                <div className="bg-main text-armsWhite p-3 rounded-t flex justify-between items-center">
                                    <h2 className="text-base font-semibold">Remarks</h2>
                                </div>
                                <div className="p-4">
                                    <textarea
                                        value={newRemark}
                                        onChange={(e) => {
                                            setNewRemark(e.target.value);
                                            setRemarkError(null); // Clear error when user types
                                        }}
                                        className={`w-full p-3 border-2 ${remarkError ? 'border-red-500' : 'border-armsgrey'} rounded mb-2 text-sm bg-armsWhite`}
                                        rows={4}
                                        placeholder="Add a remark..."
                                    />
                                    {remarkError && (
                                        <p className="text-red-500 text-xs mb-2">{remarkError}</p>
                                    )}
                                    <Button
                                        onClick={handleAddRemark}
                                        buttonType="button"
                                        buttonTitle="Add"
                                        className="mx-auto px-4 py-1 bg-armsjobslightblue text-sm text-armsWhite font-semibold border-[1px] rounded-sm cursor-pointer hover:bg-armsWhite hover:text-armsjobslightblue hover:border-armsjobslightblue"
                                    />

                                    <div className="mt-4 space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                                        {/* {manPower?.manpower_remarks.map((comment, index) => ( */}
                                        {manPower?.manpower_remarks && manPower.manpower_remarks.length > 0 ? (
                                            manPower.manpower_remarks.map((comment, index) => (
                                            <div key={index} className="border-b pb-4">
                                                <div className="flex max-xl:flex-col items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <img
                                                                src={Profileimg}
                                                                alt="profileImg"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium">{manPower.contact_person_name}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">  {new Date(comment.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{comment.remark}</p>
                                            </div>
                                        ))) : (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                No remarks found
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEditManpowerPopup && <EditManpowerPopup closePopup={closeEditManpowerPopup} />}
        </div>
        // </div>
    );
};


