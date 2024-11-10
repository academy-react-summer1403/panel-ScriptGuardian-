import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//handel like

const AddReserveCourse = async (courseId) => {
  console.log("this is AddReserveCourse ", courseId);
  try {
    const response = await http.post(
      `${ApiRoutes.DETAILS_COURSES_ADD_TO_RESERVE_URL}`,{
        courseId
      }
    );
    console.log(response.message, "this response Of  AddReserveCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddReserveCourse = () => {
  return useMutation({
    mutationKey: ["AddReserveCourse"],
    mutationFn: (courseId) => {
      console.log("this is AddReserveCourse =", courseId);
      return AddReserveCourse(courseId);
    },
  });
};
