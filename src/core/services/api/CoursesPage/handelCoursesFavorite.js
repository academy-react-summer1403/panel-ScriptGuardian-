import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const AddFavoriteCourses = async (courseId) => {
  console.log("this is Post Like ", courseId);
  try {
    const response = await http.post(`${ApiRoutes.ADD_COURSES_FAVORITE_URL}`, {
      courseId,
    });
    console.log(response.message, "this response Of  AddFavoriteCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddFavoriteCourses = () => {
  return useMutation({
    mutationKey: ["AddFavoriteCourses"],
    mutationFn: (courseId) => {
      console.log("this is AddFavoriteCourses =", courseId);
      return AddFavoriteCourses(courseId);
    },
  });
};

const DeleteFavoriteCourses = async (formData) => {
  console.log("this is CourseFavoriteId ", formData);
  try {
    const response = await http.delete(ApiRoutes.DELETE_COURSES_FAVORITE_URL, {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.message, "this response Of  DeleteFavoriteCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDeleteFavoriteCourses = () => {
  return useMutation({
    mutationKey: ["DeleteFavoriteCourses"],
    mutationFn: (formData) => {
      console.log("this is DeleteFavoriteCourses =", formData);
      return DeleteFavoriteCourses(formData);
    },
  });
};
