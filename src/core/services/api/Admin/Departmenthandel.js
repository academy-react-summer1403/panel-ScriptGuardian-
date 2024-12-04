import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetDepartList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_DEPARTMENT_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetDepartList ", error);
    return false;
  }
};
export const useGetDepartList = () => {
  return useQuery({
    queryKey: ["GetDepartList"],
    queryFn: () => {
      return GetDepartList();
    },
  });
};

//Add
