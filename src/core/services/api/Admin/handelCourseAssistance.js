import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAssistanceCourseList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_ASSISTANCE_COURSE_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetAssistanceCourseList ", error);
    return false;
  }
};
export const useGetAssistanceCourseList = () => {
  return useQuery({
    queryKey: ["GetAssistanceCourseList"],
    queryFn: () => {
      return GetAssistanceCourseList();
    },
  });
};

//Add

const AddAssistanceCourse = async (user) => {
  console.log("this is AddAssistanceCourse", user);
  const row = {
    courseId: user?.courseId,
    userId: user?.userId,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_ASSISTANCE_COURSE_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddAssistanceCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddAssistanceCourse = () => {
  return useMutation({
    mutationKey: ["AddAssistanceCourse"],
    mutationFn: (data) => {
      console.log("this is user AddAssistanceCourse =", data);
      return AddAssistanceCourse(data);
    },
  });
};
