import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//handel like

const AddRateCourses = async ({ CourseId, RateNumber }) => {
  console.log("this is Post Like ", CourseId);
  try {
    const response = await http.post(
      `${ApiRoutes.DETAILS_COURSES_RATE_URL}CourseId=${CourseId}&RateNumber=${RateNumber}`
    );
    console.log(response.message, "this response Of  AddRateCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddRateCourses = () => {
  return useMutation({
    mutationKey: ["AddRateCourses"],
    mutationFn: (data) => {
      console.log("this is AddRateCourses =", data);
      return AddRateCourses(data);
    },
  });
};
