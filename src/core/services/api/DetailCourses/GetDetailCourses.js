import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const CoursesDetail = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_COURSES_PAGE_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error Four Get Detail Courses CoursesDetail.js", error);
    return false;
  }
};
export const useCoursesDetail = (id) => {
  return useQuery({
    queryKey: ["CoursesDetail"],
    queryFn: () => CoursesDetail(id),
    enabled: !!id,
  });
};
