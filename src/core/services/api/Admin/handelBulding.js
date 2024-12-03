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
