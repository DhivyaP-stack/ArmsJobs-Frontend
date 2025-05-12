import {  ManpowerSupplier, ManpowerSupplierResponse } from "../../pages/ManPowerSupply/ManPowerSupplyTable";
import {  ManPowerData} from "../../pages/ManPowerSupply/ManPowerSupplyView";
import { apiAxios } from "../apiUrl";

//ManPower list 
export const fetchManpowerList = async (): Promise<ManpowerSupplierResponse> => {
  try {
    const response = await apiAxios.get('/api/manpower-suppliers/');

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch manpower");
    }
    console.log("Candidates API response", response.data);
    return response.data as ManpowerSupplierResponse;
  } catch (error: any) {
    console.error("Error fetching manpower:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Unable to fetch manpower. Please try again later.");
  }
};

//Manower data by id
export const fetchManPowerListById = async (id: number): Promise<ManpowerSupplier> => {
  try {
    const response = await apiAxios.get<ManpowerSupplier>(
      `/api/manpower-suppliers/${id}/`
    );
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch manpower");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unable to fetch manpower. Please try again later.");
  }
};


//ManPower data list including Page ,search, and filter
export const fetchManPowerSupplyList = async (page: number,search: string | undefined,filterBy: string) => {
  try {
    const response = await apiAxios.get(
      `/api/manpower-suppliers/?page=${page}&search=${search}&filter_by=${filterBy}`
    );
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch agents list");
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching agents list:", error);
  }
};


// Delete ManPower
export const deleteManPowerData = async (Id: number): Promise<boolean> => {
  try {
    const response = await apiAxios.delete(`/api/manpower-suppliers/${Id}/`);
    
    if (response.status === 200) {
      return true; // Success
    }
    throw new Error("Failed to delete manpower");
  } catch (error: any) {
    console.error("Error deleting manpowe:", error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to delete manpower. Please try again."
    );
  }
};

//MannPower Namelist
export const fetchManPowerSearch = async (query: string): Promise<ManPowerData[]> => {
  try {
    const res = await apiAxios.get<ManPowerData>("/api/manpower-suppliers/names-list/", {
      params: { search: query },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching ManPower", error);
    return [];
  }
};

//Add Remark
export const addManPowerRemark = async (manpower_supplier_id: number, remark: string) => {
  try {
    const response = await apiAxios.post('/api/manpower-suppliers/remarks/create/', {
      manpower_supplier_id,
      remark
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error adding remark:", error);
    if (error && typeof error === "object" && "response" in error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      throw new Error(
        err.response?.data?.message ||
        err.message ||
        "Failed to add remark. Please try again."
      );
    }
    throw new Error("Failed to add remark. Please try again.");
  }
};