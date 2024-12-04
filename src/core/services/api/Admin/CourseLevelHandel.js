import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetCourseLevelList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_LEVEL_COURSE_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetCourseLevelList ", error);
    return false;
  }
};
export const useGetCourseLevelList = () => {
  return useQuery({
    queryKey: ["GetCourseLevelList"],
    queryFn: () => {
      return GetCourseLevelList();
    },
  });
};

//Add
