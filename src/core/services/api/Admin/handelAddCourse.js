import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const CreateCourseStepOne = async () => {
  try {
    const response = await http.get(
      ApiRoutes.PANEL_GET_CREATE_COURSE_STEP_ONE_ADMIN_URL
    );
    return response;
  } catch (error) {
    console.log("This error For Get  CreateCourseStepOne ", error);
    return false;
  }
};
export const useCreateCourseStepOne = () => {
  return useQuery({
    queryKey: ["CreateCourseStepOne"],
    queryFn: () => {
      return CreateCourseStepOne();
    },
  });
};
