import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//
const AcceptCourseReserve = async ({ studentId, courseId, selectedGroup }) => {
  console.log("this is AcceptCourseReserve", {
    studentId,
    courseId,
    selectedGroup,
  });
  const data = {
    courseId: courseId,
    courseGroupId: selectedGroup,
    studentId: studentId,
  };
  try {
    const response = await http.post(
      ApiRoutes.PANEL_ACCEPT_RESERVE_ADMIN_URL,
      data,
      {
        headers: {
          "Content-Type": "application/json", // ارسال داده به صورت JSON
        },
      }
    );
    console.log(response.message, "this response AcceptCourseReserve");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAcceptCourseReserve = () => {
  return useMutation({
    mutationKey: ["AcceptCourseReserve"],
    mutationFn: ({ studentId, courseId, selectedGroup }) => {
      console.log("this is user AcceptCourseReserve =", {
        studentId,
        courseId,
        selectedGroup,
      });
      return AcceptCourseReserve({ studentId, courseId, selectedGroup });
    },
  });
};

//get Reserve Group

const GetGroupCourse = async ({ teacherId, courseId }) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_COURSE_GROUP_ADMIN_URL}TeacherId=${teacherId}&CourseId=${courseId}`
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetGroupCourse  ", error);
    return false;
  }
};
export const useGetGroupCourse = ({ teacherId, courseId }) => {
  return useQuery({
    queryKey: ["GetGroupCourse", teacherId, courseId],
    queryFn: () => {
      return GetGroupCourse({ teacherId, courseId });
    },
  });
};

//Update Comment News

///CourseGroup

const AddNewGroupForCourses = async (user) => {
  console.log("this is AddNewGroupForCourses", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_NEW_COURSE_GROUP_URL}`,
      user
    );
    console.log(response.message, "this response AddNewGroupForCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddNewGroupForCourses = () => {
  return useMutation({
    mutationKey: ["AddNewGroupForCourses"],
    mutationFn: (data) => {
      console.log("this is user AddNewGroupForCourses =", data);
      return AddNewGroupForCourses(data);
    },
  });
};
