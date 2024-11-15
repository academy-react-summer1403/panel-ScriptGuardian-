import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAllUsers = async ({
  currentPage,
  rowsPerPage,
  searchTerm,
  IsActiveUser,
  roleId,
}) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: searchTerm ? searchTerm : undefined,
    IsActiveUser: IsActiveUser,
    roleId: roleId ? roleId : undefined,
  };
  try {
    const response = await http.get(ApiRoutes.PANEL_GET_ALL_USERS_URL, {
      params: AllParams,
    });
    return response;
  } catch (error) {
    console.log("This error For Get AllUsers in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllUsers = ({
  currentPage,
  rowsPerPage,
  searchTerm,
  IsActiveUser,
  roleId,
}) => {
  return useQuery({
    queryKey: [
      "GetAllUsers",
      currentPage,
      rowsPerPage,
      searchTerm,
      IsActiveUser,
      roleId,
    ],
    queryFn: () => {
      return GetAllUsers({
        currentPage,
        rowsPerPage,
        searchTerm,
        IsActiveUser,
        roleId,
      });
    },
  });
};

//UserDetails

const GetAllUsersDetailsAdmin = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_USERS_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllUsersDetailsAdmin in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllUsersDetailsAdmin = (id) => {
  return useQuery({
    queryKey: ["GetAllUsersDetailsAdmin"],
    queryFn: () => {
      return GetAllUsersDetailsAdmin(id);
    },
  });
};

//Add

const AddNewUser = async (user) => {
  console.log("this is AddNewUser", user);
  try {
    const response = await http.post(ApiRoutes.PANEL_ADD_NEW_USER_URL, user);
    console.log(response.message, "this response AddNewUser");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddNewUser = () => {
  return useMutation({
    mutationKey: ["AddNewUser"],
    mutationFn: (data) => {
      console.log("this is user AddNewUser =", data);
      return AddNewUser(data);
    },
  });
};

//get All Courses

const GetAllCourses = async ({ currentPage, rowsPerPage, searchTerm }) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: searchTerm ? searchTerm : undefined,
  };
  try {
    const response = await http.get(ApiRoutes.PANEL_GET_ALL_COURSES_ADMIN_URL, {
      params: AllParams,
    });
    return response;
  } catch (error) {
    console.log("This error For Get GetAllCourses in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllCourses = ({ currentPage, rowsPerPage, searchTerm }) => {
  return useQuery({
    queryKey: ["GetAllCourses", currentPage, rowsPerPage, searchTerm],
    queryFn: () => {
      return GetAllCourses({ currentPage, rowsPerPage, searchTerm });
    },
  });
};

//Course Details

//UserDetails

const GetAllCourseDetailsAdmin = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_COURSE_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllCourseDetailsAdmin in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllCourseDetailsAdmin = (id) => {
  return useQuery({
    queryKey: ["GetAllCourseDetailsAdmin"],
    queryFn: () => {
      return GetAllCourseDetailsAdmin(id);
    },
  });
};

//News Details

const GetAllNewsDetailsAdmin = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_NEWS_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllNewsDetailsAdmin in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllNewsDetailsAdmin = (id) => {
  return useQuery({
    queryKey: ["GetAllNewsDetailsAdmin"],
    queryFn: () => {
      return GetAllNewsDetailsAdmin(id);
    },
  });
};

//get All Comments

const GetAllCommentsList = async ({ currentPage, rowsPerPage, searchTerm }) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: searchTerm ? searchTerm : undefined,
  };
  try {
    const response = await http.get(
      ApiRoutes.PANEL_GET_ALL_COMMENTS_ADMIN_URL,
      {
        params: AllParams,
      }
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetAllCourses in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllCommentsList = ({
  currentPage,
  rowsPerPage,
  searchTerm,
}) => {
  return useQuery({
    queryKey: ["GetAllCommentsList", currentPage, rowsPerPage, searchTerm],
    queryFn: () => {
      return GetAllCommentsList({ currentPage, rowsPerPage, searchTerm });
    },
  });
};

//accept Comment

const AcceptCommentCourse = async (user) => {
  console.log("this is AcceptCommentCourse", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ACCEPT_COMMENTS_ADMIN_URL}CommentCourseId=${user}`
    );
    console.log(response.message, "this response AcceptCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAcceptCommentCourse = () => {
  return useMutation({
    mutationKey: ["AcceptCommentCourse"],
    mutationFn: (data) => {
      console.log("this is user AcceptCommentCourse =", data);
      return AcceptCommentCourse(data);
    },
  });
};

//Not Accept Comment

const DontAcceptCommentCourse = async (user) => {
  console.log("this is DontAcceptCommentCourse", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_NOT_ACCEPT_COMMENTS_ADMIN_URL}CommentCourseId=${user}`
    );
    console.log(response.message, "this response DontAcceptCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDontAcceptCommentCourse = () => {
  return useMutation({
    mutationKey: ["DontAcceptCommentCourse"],
    mutationFn: (data) => {
      console.log("this is user DontAcceptCommentCourse =", data);
      return DontAcceptCommentCourse(data);
    },
  });
};

//Delete User Comment

const DeleteCommentCourse = async (user) => {
  console.log("this is DeleteCommentCourse", user);
  try {
    const response = await http.delete(
      `${ApiRoutes.PANEL_DELETE_COMMENTS_ADMIN_URL}CourseCommandId=${user}`
    );
    console.log(response.message, "this response DeleteCommentCourse");
    return response;
  } catch (error) {
    return false;
  }
};

export const useDeleteCommentCourse = () => {
  return useMutation({
    mutationKey: ["DeleteCommentCourse"],
    mutationFn: (data) => {
      console.log("this is user DeleteCommentCourse =", data);
      return DeleteCommentCourse(data);
    },
  });
};

//handel News

//GetAll News

const GetAllNewsList = async ({ currentPage, rowsPerPage, searchTerm }) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: searchTerm ? searchTerm : undefined,
  };
  try {
    const response = await http.get(ApiRoutes.PANEL_GET_ALL_NEWS_ADMIN_URL, {
      params: AllParams,
    });
    return response;
  } catch (error) {
    console.log("This error For Get GetAllNewsList in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllNewsList = ({ currentPage, rowsPerPage, searchTerm }) => {
  return useQuery({
    queryKey: ["GetAllNewsList", currentPage, rowsPerPage, searchTerm],
    queryFn: () => {
      return GetAllNewsList({ currentPage, rowsPerPage, searchTerm });
    },
  });
};

//Get  CateGory News List

const GetAllCateGoryList = async () => {
  try {
    const response = await http.get(
      ApiRoutes.PANEL_GET_CATEGORY_NEWS_ADMIN_URL
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllCateGoryList in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllCateGoryList = () => {
  return useQuery({
    queryKey: ["GetAllCateGoryList"],
    queryFn: () => {
      return GetAllCateGoryList();
    },
  });
};
