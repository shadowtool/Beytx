import { axiosInstance } from "./axios";
import { ROUTES } from "../constants/routes";
import imageCompression from "browser-image-compression";

export const uploadImage = async (file) => {
  const folder = "uploads";

  if (!file) throw new Error("No file provided for upload.");

  const options = {
    maxSizeMB: 7,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);

  const fileNameWithoutExt = file.name.split(".")[0];

  const publicId = `${folder}/${fileNameWithoutExt}`;

  const signatureRes = await axiosInstance.post("/upload/generate-signature", {
    folder,
    public_id: publicId,
  });

  const { signature, timestamp, apiKey, cloudName } = signatureRes.data;

  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", folder);
  formData.append("public_id", publicId?.replace(" ", "_"));
  formData.append("signature", signature);

  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const uploadRes = await axiosInstance.post(cloudinaryUploadUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return uploadRes.data.secure_url;
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

export const fetchAgentListings = async (agentId) => {
  const { data } = await axiosInstance.get(
    `${ROUTES.GET_USER_LISTINGS}/${agentId}`
  );
  return data;
};

export const fetchPropertyTypes = async () => {
  const { data } = await axiosInstance.get(`${ROUTES.GET_PROPERTY_TYPES}`);
  return data;
};

export const fetchAllReports = async (pageParam = 1, itemsPerPage) => {
  const { data } = await axiosInstance.get(`${ROUTES.GET_ALL_REPORTS}`, {
    params: { page: pageParam, limit: itemsPerPage },
  });
  return data;
};
