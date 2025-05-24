import { apiAxios } from "../apiUrl";

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await apiAxios.get(`/api/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};