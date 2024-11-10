import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const CoursesComment = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_COURSES_COMMENTS_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error Four Get Detail Courses   CoursesComment ", error);
    return false;
  }
};
export const useCoursesComment = (id) => {
  return useQuery({
    queryKey: ["CoursesComment"],
    queryFn: () => CoursesComment(id),
    enabled: !!id,
  });
};


//!TODO