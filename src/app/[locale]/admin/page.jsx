"use client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import {
  fetchAllUsers,
  fetchPropertyListingsAdmin,
} from "@/lib/queryFunctions";
import Loader from "@/components/Reusables/Loader";
import Popup from "@/components/Popup";
import { toast } from "react-toastify";
import Table from "@/components/Tables/Table";
import {
  deletePropertyMutation,
  deleteUserMutation,
  updatePropertyStatusMutation,
} from "@/lib/mutationFunctions";
import TablePagination from "@/components/Tables/TablePagination";
import EditProfile from "@/components/Modals/EditProfile";

const index = () => {
  const [activeTab, setActiveTab] = useState("properties");

  const [openEditProfile, setOpenEditProfile] = useState(false);

  const [selectedUserForEdit, setSelectedUserForEdit] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [session]);

  const { data: propertyData, isPending: propertiesLoading } = useQuery({
    queryKey: [ROUTES.GET_ALL_PROPERTIES_ADMIN, currentPage],
    queryFn: () => fetchPropertyListingsAdmin(currentPage, 10, {}),
    keepPreviousData: true,
  });

  const { data: usersData, isPending: usersLoading } = useQuery({
    queryKey: [ROUTES.GET_ALL_USERS, currentPage],
    queryFn: () => fetchAllUsers(currentPage, 10),
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();

  const { mutate: updatePropertyStatus } = useMutation({
    mutationFn: updatePropertyStatusMutation,
    onMutate: () => {
      toast.dismiss();
      toast.loading("Updating property...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Property updated successfully!");
      queryClient.invalidateQueries([ROUTES.GET_PROPERTIES]);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to update property");
    },
  });

  const { mutate: deleteProperty } = useMutation({
    mutationFn: (variables) => deletePropertyMutation(variables),
    onMutate: () => {
      toast.dismiss();
      toast.loading("Deleting property...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Property deleted successfully!");
      queryClient.invalidateQueries([ROUTES.GET_PROPERTIES]);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to delete property");
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (variables) => deleteUserMutation(variables),
    onMutate: () => {
      toast.dismiss();
      toast.loading("Deleting user...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("user deleted successfully!");
      queryClient.invalidateQueries([ROUTES.GET_ALL_USERS]);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to delete user");
    },
  });

  const propertyDataFilteredForTable = useMemo(() => {
    if (propertyData) {
      const propertyDataToReturn = propertyData?.properties || [];

      return propertyDataToReturn?.map((el) => {
        return {
          ...el,
          city: el?.location?.city,
          options: (
            <Popup
              options={[
                {
                  title: "Edit Property",
                  onClick: () => {
                    router.push(`/${locale}/properties/create/${el?._id}`);
                  },
                },
                {
                  title: el?.archived
                    ? "Unarchive Property"
                    : "Archive Property",
                  onClick: () =>
                    updatePropertyStatus({
                      propertyId: el?._id,
                      archived: !el?.archived,
                    }),
                },
                {
                  title: "Delete Property",
                  onClick: () => deleteProperty({ propertyId: el?._id }),
                },
                {
                  title: el?.featured
                    ? "Remove from Featured Properties"
                    : "Mark as Featured Properties",
                  onClick: () =>
                    updatePropertyStatus({
                      propertyId: el?._id,
                      featured: !el?.featured,
                    }),
                },
              ]}
            />
          ),
        };
      });
    } else return [];
  }, [propertyData]);

  const userDataFilteredForTable = useMemo(() => {
    if (usersData) {
      const usersDataToReturn = usersData?.users || [];

      return usersDataToReturn?.map((el) => {
        return {
          ...el,
          verified: el?.isVerified,
          options: (
            <Popup
              options={[
                {
                  title: "Edit User",
                  onClick: () => {
                    setOpenEditProfile(true);
                    setSelectedUserForEdit(el);
                  },
                },
                {
                  title: "Delete User",
                  onClick: () => deleteUser({ userId: el?._id }),
                },
              ]}
            />
          ),
        };
      });
    } else return [];
  }, [usersData]);

  return (
    <>
      <div className="p-8 min-h-screen">
        <div className="flex justify-center items-center gap-4 mb-8 max-w-fit border-2 border-solid border-emerald-600 py-1.5 px-3 rounded-md">
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              activeTab === "properties"
                ? "bg-emerald-600 text-white"
                : "bg-white text-jet-black"
            }`}
            onClick={() => {
              setActiveTab("properties");
              setCurrentPage(1);
            }}
          >
            Properties
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              activeTab === "users"
                ? "bg-emerald-600 text-white"
                : "bg-white text-jet-black"
            }`}
            onClick={() => {
              setActiveTab("users");
              setCurrentPage(1);
            }}
          >
            Users
          </button>
        </div>
        {activeTab === "properties" ? (
          <>
            {propertiesLoading || usersLoading ? (
              <Loader />
            ) : propertyDataFilteredForTable?.length <= 0 ? (
              <div className="h-36 w-full flex items-center justify-center">
                <h6>No Properties Found</h6>
              </div>
            ) : (
              <>
                <Table
                  headers={[
                    "title",
                    "price",
                    "archived",
                    "featured",
                    "options",
                  ]}
                  data={propertyDataFilteredForTable}
                />
                <TablePagination
                  currentPage={currentPage}
                  totalPages={propertyData?.totalPages || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            )}
          </>
        ) : activeTab === "users" ? (
          <>
            {usersLoading ? (
              <Loader />
            ) : userDataFilteredForTable?.length <= 0 ? (
              <div className="h-36 w-full flex items-center justify-center">
                <h6>No Users Found</h6>
              </div>
            ) : (
              <>
                <Table
                  headers={["name", "verified", "options"]}
                  data={userDataFilteredForTable}
                />
                <TablePagination
                  currentPage={currentPage}
                  totalPages={usersData?.totalPages || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <EditProfile
                  open={openEditProfile}
                  handleClose={() => {
                    setOpenEditProfile(false);
                  }}
                  userData={selectedUserForEdit}
                />
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default index;
