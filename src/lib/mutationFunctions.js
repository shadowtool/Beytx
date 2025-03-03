import { axiosInstance } from "@/axios";
import { ROUTES } from "@/constants/routes";

export const updatePropertyMutation = async (propertyId, variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_PROPERTIES}/${propertyId}`,
    { ...variables }
  );
  return response.data;
};

export const createPropertyMutation = async (variables) => {
  const response = await axiosInstance.post(`${ROUTES.ADD_PROPERTY}`, {
    ...variables,
  });
  return response.data;
};

export const deletePropertyMutation = async (propertyId) => {
  const response = await axiosInstance.delete(
    `${ROUTES.GET_PROPERTIES}/${propertyId}`
  );
  return response.data;
};

export const updateUserMutation = async (variables) => {
  const response = await axiosInstance.put(
    `${ROUTES.GET_USER_INFO}/${variables.userId}`,
    {
      email: variables.email,
      phoneNumber: variables.phoneNumber,
      image: variables.image,
    }
  );

  return response?.data;
};
