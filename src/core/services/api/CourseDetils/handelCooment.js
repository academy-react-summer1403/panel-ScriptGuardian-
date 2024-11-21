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
    queryKey: ["CoursesCommentDetails"],
    queryFn: () => CoursesComment(id),
    enabled: !!id,
  });
};

const CoursesPayMent = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_COURSES_PAYMENT_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error Four Get Detail Courses   CoursesPayMent ", error);
    return false;
  }
};
export const useCoursesPayMent = (id) => {
  return useQuery({
    queryKey: ["CoursesPayMentDetails"],
    queryFn: () => CoursesPayMent(id),
    enabled: !!id,
  });
};

//!TODO
