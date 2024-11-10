import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//handel like

const AddLikeCourses = async (CourseId) => {
  console.log("this is Post Like ", CourseId);
  try {
    const response = await http.post(
      `${ApiRoutes.ADD_LIKE_COURSES_URL}${CourseId}`
    );
    console.log(response.message, "this response Of  AddLikeCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddLikeCourses = () => {
  return useMutation({
    mutationKey: ["AddLikeCourses"],
    mutationFn: (CourseId) => {
      console.log("this is AddLikeCourses =", CourseId);
      return AddLikeCourses(CourseId);
    },
  });
};

//handel dissLike

const AddDissLikeCourses = async (CourseId) => {
  console.log("this is Post Like ", CourseId);
  try {
    const response = await http.post(
      `${ApiRoutes.ADD_DISS_LIKE_COURSES_URL}${CourseId}`
    );
    console.log(response.message, "this response Of  AddLikeCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddDissLikeCourses = () => {
  return useMutation({
    mutationKey: ["AddDissLikeCourses"],
    mutationFn: (CourseId) => {
      console.log("this is AddDissLikeCourses =", CourseId);
      return AddDissLikeCourses(CourseId);
    },
  });
};

//handel delete like

const DeleteLikeCourses = async (formData) => {
  console.log("this is Delete CourseLike ", formData);
  try {
    const response = await http.delete(ApiRoutes.DELETE_LIKE_COURSES_URL , {data: formData});
    console.log(response.message, "this response Of  DeleteLikeCourses");
    return response;
  } catch (error) {
    console.log(error, "this error Of  DeleteLikeCourses");
    return false;
  }
};

export const useDeleteLikeCourses = () => {
  return useMutation({
    mutationKey: ["DeleteLikeCourses"],
    mutationFn: (formData) => {
      console.log("this is DeleteLikeCourses =", formData);
      return DeleteLikeCourses(formData);
    },
  });
};
