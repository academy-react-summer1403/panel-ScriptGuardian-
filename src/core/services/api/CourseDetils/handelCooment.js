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

//With Filter

const GetAllListCourseCommentFilterCourseId = async ({ total, curentPage }) => {
  const AllParams = {
    PageNumber: curentPage ? curentPage : 1,
    RowsOfPage: total ? total : 10,
  };
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_USERS_COMMENT_LIST_WITH_FILTER_URL}`,
      {
        params: AllParams,
      }
    );
    return response.comments;
  } catch (error) {
    console.log(
      "This error For Get GetAllListCourseCommentFilterCourseId in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllListCourseCommentFilterCourseId = ({
  total,
  curentPage,
}) => {
  return useQuery({
    queryKey: ["GetAllListCourseCommentFilterCourseId", total, curentPage],
    queryFn: () => {
      return GetAllListCourseCommentFilterCourseId({ total, curentPage });
    },
    // enabled: !!id,
  });
};

export const useCoursesPayMent = (id) => {
  return useQuery({
    queryKey: ["CoursesPayMentDetails"],
    queryFn: () => CoursesPayMent(id),
    enabled: !!id,
  });
};

//!TODO

//
const CourseUserList = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_COURSES_USER_LIST_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error Four Get Detail Courses   CourseUserList ", error);
    return false;
  }
};
export const useCourseUserList = (id) => {
  return useQuery({
    queryKey: ["CourseUserList"],
    queryFn: () => CourseUserList(id),
    enabled: !!id,
  });
};

//use Course Details : Payment Accepted And Rejected

const CoursesPayMentDetailsWhoPayed = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_COURSES_PAYMENT_WHO_PAYED_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error Four Get Detail Courses   CoursesPayMentDetailsWhoPayed ",
      error
    );
    return false;
  }
};
export const useCoursesPayMentDetailsWhoPayed = (id) => {
  return useQuery({
    queryKey: ["CoursesPayMentDetailsWhoPayed"],
    queryFn: () => CoursesPayMentDetailsWhoPayed(id),
    enabled: !!id,
  });
};
