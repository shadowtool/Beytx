import { axiosInstance } from "@/lib/axios";
import { ROUTES } from "@/constants/routes";
import { COUNTRY } from "@/constants/constants";

export const updatePropertyMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${variables?.propertyId}`,
    { ...variables, country: COUNTRY.name }
  );
  return response.data;
};

export const archivePropertyMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${variables?.propertyId}`,
    { archived: true, country: COUNTRY.name }
  );
  return response.data;
};

export const createPropertyMutation = async (variables) => {
  const response = await axiosInstance.post(`${ROUTES.ADD_PROPERTY}`, {
    ...variables,
    country: COUNTRY.name,
  });
  return response.data;
};

export const deletePropertyMutation = async (variables) => {
  const response = await axiosInstance.delete(
    `${ROUTES.DELETE_PROPERTY}/${variables?.propertyId ?? ""}?country=${COUNTRY.name}`
  );
  return response.data;
};

export const deleteUserMutation = async (variables) => {
  const response = await axiosInstance.delete(
    `${ROUTES.GET_USER_INFO}/${variables?.userId ?? ""}`
  );
  return response.data;
};

export const updateUserMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_USER_INFO}/${variables.userId}`,
    {
      ...variables,
    }
  );

  return response?.data;
};

export const toggleListingInSavedListings = async (userId, propertyId) => {
  const { data } = await axiosInstance.post(ROUTES.ADD_TO_SAVED_LISTINGS, {
    userId,
    propertyId,
  });
  return data;
};

export const updatePropertyStatusMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${variables?.propertyId}`,
    { ...variables, country: COUNTRY.name }
  );
  return response.data;
};

export async function markReportAsResolvedMutation(reportId) {
  const response = await axiosInstance.put(ROUTES.UPDATE_REPORT, {
    id: reportId,
  });

  if (!response) {
    throw new Error("Failed to mark report as resolved");
  }

  return response.data;
}

export const createReportMutationFn = async (formData) => {
  return axiosInstance.post("/reports", formData);
};
