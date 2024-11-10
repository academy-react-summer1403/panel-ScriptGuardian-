import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const CommentCourses = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.GET_COURSES_COMMENT_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error For CommentCourses ", error);
    return false;
  }
};
export const useCommentCourses = (id) => {
  return useQuery({
    queryKey: ["CommentCourses"],
    queryFn: () => CommentCourses(id),
    enabled: !!id, // اجرای query فقط زمانی که id موجود باشد
  });
};

//Like

const AddLikeCommentCourse = async (CourseCommandId) => {
  console.log("this is AddLikeCommentCourse  ", CourseCommandId);
  try {
    const response = await http.post(
      `${ApiRoutes.ADD_LIKE_COURSES_COMMENT_URL}CourseCommandId=${CourseCommandId}`
    );
    console.log(response.message, "this response Of AddLikeCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddLikeCommentCourse = () => {
  return useMutation({
    mutationKey: ["AddLikeCommentCourse"],
    mutationFn: (data) => {
      console.log("this is AddLikeCommentCourse =", data);
      return AddLikeCommentCourse(data);
    },
  });
};

//DissLike

const AddDissLikeCommentCourse = async (CourseCommandId) => {
  console.log("this is AddLikeCommentCourse  ", CourseCommandId);
  try {
    const response = await http.post(
      `${ApiRoutes.ADD_DISS_LIKE_COURSES_COMMENT_URL}CourseCommandId=${CourseCommandId}`
    );
    console.log(response.message, "this response Of AddDissLikeCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddDissLikeCommentCourse = () => {
  return useMutation({
    mutationKey: ["AddDissLikeCommentCourse"],
    mutationFn: (data) => {
      console.log("this is AddDissLikeCommentCourse =", data);
      return AddDissLikeCommentCourse(data);
    },
  });
};

//Handel Delete Like And Diss Like

const DeleteLikeCommentCourse = async (CourseCommandId) => {
  console.log("this is AddLikeCommentCourse  ", CourseCommandId);
  try {
    const response = await http.delete(
      `${ApiRoutes.DELETE_LIKE_COURSES_COMMENT_URL}CourseCommandId=${CourseCommandId}`
    );
    console.log(response.message, "this response Of DeleteLikeCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDeleteLikeCommentCourse = () => {
  return useMutation({
    mutationKey: ["DeleteLikeCommentCourse"],
    mutationFn: (data) => {
      console.log("this is DeleteLikeCommentCourse =", data);
      return DeleteLikeCommentCourse(data);
    },
  });
};

//ADD Comment

const AddCommentCourse = async (formData) => {
  console.log("this is AddLikeCommentCourse  ", formData);

  try {
    const response = await http.post(
      ApiRoutes.ADD_COURSES_COMMENT_URL,
      formData,
      {
        // data: formData,
        headers: {
          "Content-Type": "application/form-data",
        },
      }
    );
    console.log(response.message, "this response Of AddCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddCommentCourse = () => {
  return useMutation({
    mutationKey: ["AddCommentCourse"],
    mutationFn: (data) => {
      console.log("this is AddCommentCourse =", data);
      return AddCommentCourse(data);
    },
  });
};

//Get Replay

const ReplayCommentCourses = async ({ courseId, CommentId }) => {
  try {
    const response = await http.get(
      `${ApiRoutes.GET_REPLAY_COURSES_COMMENT_URL}/${courseId}/${CommentId}`
    );
    return response;
  } catch (error) {
    console.log("This error For ReplayCommentCourses ", error);
    return false;
  }
};
export const useReplayCommentCourses = (data) => {
  return useQuery({
    queryKey: ["ReplayCommentCourses", data],
    queryFn: () => ReplayCommentCourses(data),
    enabled: !!data, // اجرای query فقط زمانی که id موجود باشد
  });
};

// Add Replay

const AddReplayCommentCourse = async (formData) => {
  console.log("this is AddReplayCommentCourse  ", formData);

  try {
    const response = await http.post(
      ApiRoutes.ADD_COURSES_REPLAY_COMMENT_URL,
      formData,
      {
        // data: formData,
        headers: {
          "Content-Type": "application/form-data",
        },
      }
    );
    console.log(response.message, "this response Of AddReplayCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddReplayCommentCourse = () => {
  return useMutation({
    mutationKey: ["AddReplayCommentCourse"],
    mutationFn: (data) => {
      console.log("this is AddReplayCommentCourse =", data);
      return AddReplayCommentCourse(data);
    },
  });
};
