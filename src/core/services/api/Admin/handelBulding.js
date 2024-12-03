import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetBuildingList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_LIST_BUILDING_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetBuildingList ", error);
    return false;
  }
};
export const useGetBuildingList = () => {
  return useQuery({
    queryKey: ["GetBuildingList"],
    queryFn: () => {
      return GetBuildingList();
    },
  });
};

//details

const GetBuildingDetails = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_BUILDING_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetBuildingDetails ", error);
    return false;
  }
};
export const useGetBuildingDetails = (id) => {
  return useQuery({
    queryKey: ["GetBuildingDetails", id],
    queryFn: () => {
      return GetBuildingDetails(id);
    },
  });
};

//update

const UpdateBuilding = async (user) => {
  console.log("this is UpdateBuilding", user);
  const row = {
    id: user?.id,
    buildingName: user?.buildingName,
    workDate: user?.workDate,
    floor: user?.floor,
    latitude: user?.latitude,
    longitude: user?.longitude,
    active: user?.active,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_BUILDING_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response UpdateBuilding");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateBuilding = () => {
  return useMutation({
    mutationKey: ["UpdateBuilding"],
    mutationFn: (data) => {
      console.log("this is user UpdateBuilding =", data);
      return UpdateBuilding(data);
    },
  });
};
