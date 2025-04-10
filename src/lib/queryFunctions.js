import { axiosInstance } from "./axios";
import { ROUTES } from "../constants/routes";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosInstance.post(`${ROUTES.UPLOAD_CONTENT}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const fetchPropertyListings = async (
  pageParam = 1,
  itemsPerPage,
  filters
) => {
  try {
    const response = await axiosInstance.get(`${ROUTES.GET_PROPERTIES}`, {
      params: { page: pageParam, limit: itemsPerPage, ...filters },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching property listings:", error);
    throw error;
  }
};

export const fetchPropertyListingsAdmin = async (
  pageParam = 1,
  itemsPerPage,
  filters
) => {
  try {
    const response = await axiosInstance.get(
      `${ROUTES.GET_ALL_PROPERTIES_ADMIN}`,
      {
        params: { page: pageParam, limit: itemsPerPage, ...filters },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching property listings:", error);
    throw error;
  }
};

export const fetchPropertiesOfLoggedUser = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${ROUTES.GET_PROPERTIES}?userId=${userId ?? ""}`
    );
    return response?.data?.properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const fetchPropertyDetails = async (propertyName) => {
  const response = await axiosInstance.get(
    `${ROUTES.GET_PROPERTIES}/${propertyName ?? ""}`
  );
  return response?.data;
};

export const fetchFeaturedListings = async () => {
  const response = await axiosInstance.get(`${ROUTES.GET_FEATURED_PROPERTIES}`);
  return response?.data?.properties;
};

export const fetchUserInfo = async (userId) => {
  if (!userId) return null;
  const { data } = await axiosInstance.get(`${ROUTES.GET_USER_INFO}/${userId}`);
  return data;
};

export const fetchCities = async () => {
  const { data } = await axiosInstance.get(`${ROUTES.GET_LOCATIONS}`);
  return data;
};

export const fetchFavorites = async (userId) => {
  const { data } = await axiosInstance.get(
    `${ROUTES.GET_USER_SAVED_LISTINGS}?userId=${userId}`
  );
  return data;
};

export const fetchUserAccountStatus = async (email) => {
  const { data } = await axiosInstance.get(
    `${ROUTES.CHECK_USER_EXISTS}?email=${email}`
  );
  return data;
};

export const fetchAllUsers = async (pageParam = 1, itemsPerPage) => {
  const { data } = await axiosInstance.get(`${ROUTES.GET_ALL_USERS_ADMIN}`, {
    params: { page: pageParam, limit: itemsPerPage },
  });
  return data;
};
