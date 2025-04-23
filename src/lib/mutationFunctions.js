import { axiosInstance } from "@/lib/axios";
import { ROUTES } from "@/constants/routes";

export const updatePropertyMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${variables?.propertyId}`,
    { ...variables }
  );
  return response.data;
};

export const archivePropertyMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${variables?.propertyId}`,
    { archived: true }
  );
  return response.data;
};

export const createPropertyMutation = async (variables) => {
  const response = await axiosInstance.post(`${ROUTES.ADD_PROPERTY}`, {
    ...variables,
  });
  return response.data;
};

export const deletePropertyMutation = async (variables) => {
  const response = await axiosInstance.delete(
    `${ROUTES.DELETE_PROPERTY}/${variables?.propertyId ?? ""}`
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
    { ...variables }
  );
  return response.data;
};
