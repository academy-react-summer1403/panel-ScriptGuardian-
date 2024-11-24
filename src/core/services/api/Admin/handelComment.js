import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const ReplayCommentCoursesInCommentList = async ({ courseId, CommentId }) => {
  try {
    const response = await http.get(
      `${ApiRoutes.GET_REPLAY_COURSES_COMMENT_URL}/${courseId}/${CommentId}`
    );
    return response;
  } catch (error) {
    console.log("This error For ReplayCommentCoursesInCommentList ", error);
    return false;
  }
};
export const useReplayCommentCoursesInCommentList = (data) => {
  return useQuery({
    queryKey: ["ReplayCommentCoursesInCommentList", data],
    queryFn: () => ReplayCommentCoursesInCommentList(data),
    enabled: false,
  });
};
