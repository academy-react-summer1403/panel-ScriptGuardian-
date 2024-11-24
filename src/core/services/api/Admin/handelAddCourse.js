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

//Step Two

const CreateCourseStepTwo = async (user) => {
  console.log("this is CreateCourseStepTwo", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_NEW_COURSE_STEP_TWO_ADMIN_URL}`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.message, "this response CreateCourseStepTwo");
    return response;
  } catch (error) {
    return false;
  }
};

export const useCreateCourseStepTwo = () => {
  return useMutation({
    mutationKey: ["CreateCourseStepTwo"],
    mutationFn: (data) => {
      console.log("this is user CreateCourseStepTwo =", data);
      return CreateCourseStepTwo(data);
    },
  });
};

//Step Tree

const CreateCourseStepThird = async (user) => {
  console.log("this is CreateCourseStepThird", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_NEW_COURSE_STEP_THIRD_ADMIN_URL}courseId=${user.courseId}`,
      user.techId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response CreateCourseStepThird");
    return response;
  } catch (error) {
    return false;
  }
};

export const useCreateCourseStepThird = () => {
  return useMutation({
    mutationKey: ["CreateCourseStepThird"],
    mutationFn: (data) => {
      console.log("this is user CreateCourseStepThird =", data);
      return CreateCourseStepThird(data);
    },
  });
};
