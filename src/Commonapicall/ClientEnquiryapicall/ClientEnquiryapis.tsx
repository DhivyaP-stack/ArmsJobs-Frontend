import { apiAxios } from '../apiUrl';

// Get CandidateList
export const fetchClientEnquiryList = async () => {
    try {
        const response = await apiAxios.get('/api/client-enquiries/');

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch client-enquires");
        }
        console.log("ClientEnquiry API response", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching client enquires:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Unable to fetch client enquires. Please try again later.");
    }
};

//AddClientEnquiry
export const AddClientEnquiryList = async (
    CompanyName: string,
    Email: string,
    ContactPersonName: string,
    MobileNO: string,
    NatureofWork: string,
    ProjectLocation: string,
    ProjectDuration: string,
    CategoriesRequired: string,
    QuantityRequired: string,
    ProjectStarDate: string,
    KitchenFacility: string,
    TransportationProvided: string,
    AccomodationProvide: string,
    Remarks: string,
    QueryType: string,
) => {
    try {
        const formData = new FormData();
        formData.append('company_name', CompanyName);
        formData.append('email', Email);
        formData.append('contact_person_name', ContactPersonName);
        formData.append('mobile_number', MobileNO);
        formData.append('nature_of_work', NatureofWork);
        formData.append('project_location', ProjectLocation);
        formData.append('project_duration', ProjectDuration);
        formData.append('categories_required', CategoriesRequired);
        formData.append('quantity_required', QuantityRequired);
        formData.append('project_start_date', ProjectStarDate);
        formData.append('kitchen_facility', KitchenFacility);
        formData.append('transportation_provided', TransportationProvided);
        formData.append('accommodation_provided', AccomodationProvide);
        formData.append('remarks', Remarks);
        formData.append('query_type', QueryType);
        const response = await apiAxios.post('/api/client-enquiries/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 201) {
            throw new Error('Failed to submit client Enquiry data');
        }

        console.log('ClientEnquiry submitted successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error submitting ClientEnquiry:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Submission failed. Please try again.');
    }
};

//DeleteCandidate
export const deleteClientEnquiry = async (Id: string) => {
    try {
        const formData = new FormData();
        formData.append('id', Id);
        const response = await apiAxios.post(`/api/client-enquiries/delete/`, formData,);
        if (response.status === 200) {
            return true; // Success
        }
        throw new Error("Failed to delete client enquiry");
    } catch (error: any) {
        console.error("Error deleting client enquiry:", error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to delete client enquiry. Please try again."
        );
    }
};
