import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//handel like

const AddLikeNews = async (newsId) => {
  console.log("this is Post Like ", newsId);
  try {
    const response = await http.post(
      `${ApiRoutes.DETAILS_ADD_LIKE_NEWS_URL}${newsId}`
    );
    console.log(response.message, "this response Of  AddLikeForNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddLikeNews = () => {
  return useMutation({
    mutationKey: ["AddLikeForNews"],
    mutationFn: (newsId) => {
      console.log("this is AddLikeNews =", newsId);
      return AddLikeNews(newsId);
    },
  });
};

//handel dissLike

const AddDissLikeNews = async (newsId) => {
  console.log("this is AddDissLikeNews Like ", newsId);
  try {
    const response = await http.post(
      `${ApiRoutes.DETAILS_ADD_DISS_LIKE_NEWS_URL}${newsId}`
    );
    console.log(response.message, "this response Of  AddDissLikeNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDissAddLikeNews = () => {
  return useMutation({
    mutationKey: ["AddDissLikeNews"],
    mutationFn: (newsId) => {
      console.log("this is AddDissLikeNews =", newsId);
      return AddDissLikeNews(newsId);
    },
  });
};

//HAndel Delete like news

const DeleteLikeNews = async (id) => {
  console.log("this is Delete CourseLike ", id);
  try {
    const response = await http.delete(ApiRoutes.DETAILS_DELETE_LIKE_NEWS_URL, {
      data: {
        deleteEntityId: `${id}`,
      },
    });
    console.log(response.message, "this response Of  DeleteLikeNews");
    return response;
  } catch (error) {
    console.log(error, "this error Of  DeleteLikeNews");
    return false;
  }
};

export const useDeleteLikeNews = () => {
  return useMutation({
    mutationKey: ["DeleteLikeNews"],
    mutationFn: (id) => {
      console.log("this is DeleteLikeNews =", id);
      return DeleteLikeNews(id);
    },
  });
};
