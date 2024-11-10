import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetStudentProfile = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_PROFILE_URL}`);
    return response;
  } catch (error) {
    console.log("This error Four Landing Courses.js", error);
    return false;
  }
};
export const useGetStudentProfile = () => {
  return useQuery({
    queryKey: ["GetStudentProfile"],
    queryFn: GetStudentProfile,
  });
};
