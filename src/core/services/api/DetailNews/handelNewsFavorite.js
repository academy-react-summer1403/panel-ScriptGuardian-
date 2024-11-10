import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const AddFavoriteNews = async (NewsId) => {
  console.log("this is Post Like ", NewsId);
  try {
    const response = await http.post(
      ApiRoutes.DETAILS_ADD_FAVORITE_NEWS_URL,
      null,
      {
        params: {
          NewsId,
        },
      }
    );
    console.log(response.message, "this response Of  AddFavoriteCourses");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddFavoriteNews = () => {
  return useMutation({
    mutationKey: ["AddFavoriteNews"],
    mutationFn: (NewsId) => {
      console.log("this is AddFavoriteNews =", NewsId);
      return AddFavoriteNews(NewsId);
    },
  });
};

//handel Delete

const DeleteFavoriteNews = async (deleteEntityId) => {
  console.log("this is CourseFavoriteId ", deleteEntityId);
  try {
    const response = await http.delete(
      ApiRoutes.DETAILS_DELETE_FAVORITE_NEWS_URL,
      {
        data: {
          deleteEntityId,
        },
      }
    );
    console.log(response.message, "this response Of  DeleteFavoriteNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDeleteFavoriteNews = () => {
  return useMutation({
    mutationKey: ["DeleteFavoriteNews"],
    mutationFn: (deleteEntityId) => {
      console.log("this is DeleteFavoriteNews =", deleteEntityId);
      return DeleteFavoriteNews(deleteEntityId);
    },
  });
};
