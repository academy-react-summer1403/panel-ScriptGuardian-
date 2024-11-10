import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

//handel like Comment And DissLike

const AddLikeCommentNews = async ({ commentId, LikeType }) => {
  console.log("this is Post Like ", commentId);
  try {
    const response = await http.post(
      `${ApiRoutes.DETAILS_NEWS_PAGE_LIKE_COMMENT_URL}${commentId}?LikeType=${LikeType}`
    );
    console.log(response.message, "this response Of AddLikeCommentNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddLikeCommentNews = () => {
  return useMutation({
    mutationKey: ["AddLikeCommentNews"],
    mutationFn: (data) => {
      console.log("this is AddLikeCommentNews =", data);
      return AddLikeCommentNews(data);
    },
  });
};

//Delete
const DeleteLikeCommentNews = async (deleteEntityId) => {
  try {
    const response = await http.delete(
      ApiRoutes.DETAILS_NEWS_PAGE_DELETE_LIKE_COMMENT_URL,
      {
        data: {
          deleteEntityId,
        },
      }
    );
    console.log(response.message, "this response Of DeleteLikeCommentNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDeleteLikeCommentNews = () => {
  return useMutation({
    mutationKey: ["DeleteLikeCommentNews"],
    mutationFn: (data) => {
      console.log("this is DeleteLikeCommentNews =", data);
      return DeleteLikeCommentNews(data);
    },
  });
};

///handel Replay

const ReplayCommentNews = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.DETAILS_NEWS_PAGE_REPLAY_COMMENT_URL}Id=${id}`
    );
    return response;
  } catch (error) {
    console.log("This error For ReplayCommentNews  ", error);
    return false;
  }
};
export const useReplayCommentNews = (id) => {
  return useQuery({
    queryKey: ["ReplayCommentNews", id],
    queryFn: () => ReplayCommentNews(id),
    enabled: !!id, // اجرای query فقط زمانی که id موجود باشد
  });
};

//Add Comment

const AddCommentForNews = async ({
  newsId,
  userIpAddress,
  title,
  describe,
  userId,
}) => {
  try {
    const response = await http.post(ApiRoutes.NEWS_DETAILS_ADD_COMMENT_URL, {
      newsId,
      userIpAddress,
      title,
      describe,
      userId,
    });
    return response;
  } catch (error) {
    console.log("This error For AddCommentForNews  ", error);
    return false;
  }
};
export const useAddCommentForNews = () => {
  return useMutation({
    mutationKey: ["AddCommentForNews"],
    mutationFn: (data) => {
      console.log("this is AddCommentForNews =", data);
      return AddCommentForNews(data);
    },
  });
};

//Add Replay Comment

const AddReplayCommentForNews = async ({
  newsId,
  userIpAddress,
  title,
  describe,
  userId,
  parentId,
}) => {
  try {
    const response = await http.post(
      ApiRoutes.NEWS_DETAILS_ADD_REPLAY_COMMENT_URL,
      {
        newsId,
        userIpAddress,
        title,
        describe,
        userId,
        parentId,
      }
    );
    return response;
  } catch (error) {
    console.log("This error For AddReplayCommentForNews  ", error);
    return false;
  }
};
export const useAddReplayCommentForNews = () => {
  return useMutation({
    mutationKey: ["AddCommentForNews"],
    mutationFn: (data) => {
      console.log("this is AddReplayCommentForNews =", data);
      return AddReplayCommentForNews(data);
    },
  });
};
