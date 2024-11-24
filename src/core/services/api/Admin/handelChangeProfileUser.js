import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const UpdateUser = async (user) => {
  console.log("this is UpdateUser", user);
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_USER_ADMIN_URL}`,
      user
    );
    console.log(response.message, "this response UpdateUser");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: (data) => {
      console.log("this is user UpdateUser =", data);
      return UpdateUser(data);
    },
  });
};

const UpdateCourse = async (user) => {
  console.log("this is UpdateUser", user);
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_COURSE_ADMIN_URL}`,
      user
    );
    console.log(response.message, "this response UpdateCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationKey: ["UpdateCourse"],
    mutationFn: (data) => {
      console.log("this is user UpdateCourse =", data);
      return UpdateCourse(data);
    },
  });
};

const UpdateNews = async (user) => {
  console.log("this is UpdateUser", user);
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_NEWS_ADMIN_URL}`,
      user
    );
    console.log(response.message, "this response UpdateNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateNews = () => {
  return useMutation({
    mutationKey: ["UpdateNews"],
    mutationFn: (data) => {
      console.log("this is user UpdateNews =", data);
      return UpdateNews(data);
    },
  });
};
