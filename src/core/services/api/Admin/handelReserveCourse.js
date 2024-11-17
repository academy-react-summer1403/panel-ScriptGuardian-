import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const GetAllCourseDetailsReserves = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_COURSE_RESERVE_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllCourseDetailsReserves in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllCourseDetailsReserves = (id) => {
  return useQuery({
    queryKey: ["GetAllCourseDetailsReserves"],
    queryFn: () => {
      return GetAllCourseDetailsReserves(id);
    },
  });
};
