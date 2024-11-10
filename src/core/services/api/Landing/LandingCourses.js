import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const LandingCourses = async () => {
  try {
    const response = await http.get(`${ApiRoutes.LANDING_COURSES_URL}?Count=4`);
    return response;
  } catch (error) {
    console.log("This error Four Landing Courses.js", error);
    return false;
  }
};
export const useLandingCourses = () => {
  return useQuery({
    queryKey: ["LandingCourses"],
    queryFn: LandingCourses,
  });
};
