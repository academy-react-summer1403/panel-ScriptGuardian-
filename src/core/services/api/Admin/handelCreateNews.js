import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const CreateNews = async (formData) => {
  console.log("this is editProfile", formData);
  try {
    const response = await http.post(
      ApiRoutes.PANEL_CREATE_NEWS_ADMIN_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.message, "this CreateNews success");
    return response;
  } catch (error) {
    console.log(error, "this error CreateNews");
    console.log(error.message, "this error CreateNews message");

    return false;
  }
};

export const useCreateNews = () => {
  return useMutation({
    mutationKey: ["CreateNews"],
    mutationFn: (data) => {
      console.log("this is user CreateNews =", data);
      return CreateNews(data);
    },
  });
};
