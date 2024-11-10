import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const LandingTeachers = async () => {
  try {
    const response = await http.get(ApiRoutes.LANDING_TEACHERS_URL);
    return response;
  } catch (error) {
    console.log("This error Four Landing Report.js", error);
    return false;
  }
};
export const useLandingTeachers = () => {
  return useQuery({
    queryKey: ["LandingTeachers"],
    queryFn: LandingTeachers,
  });
};
