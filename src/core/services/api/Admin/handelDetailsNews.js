import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const GetAllNewsComments = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_NEWS_COMMENTS_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllNewsComments in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllNewsComments = (id) => {
  return useQuery({
    queryKey: ["GetAllNewsComments"],
    queryFn: () => {
      return GetAllNewsComments(id);
    },
  });
};

const UpdateCommentNews = async (user) => {
  console.log("this is UpdateCommentNews", user);
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_NEWS_COMMENT_URL}`,
      user
    );
    console.log(response.message, "this response UpdateCommentNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateCommentNews = () => {
  return useMutation({
    mutationKey: ["UpdateCommentNews"],
    mutationFn: (data) => {
      console.log("this is user UpdateCommentNews =", data);
      return UpdateCommentNews(data);
    },
  });
};
