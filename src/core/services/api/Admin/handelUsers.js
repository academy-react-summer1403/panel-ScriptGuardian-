import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAllUsers = async ({ currentPage, rowsPerPage, searchTerm }) => {
  const AllParams = {
    PageNumber: currentPage ? currentPage : 1,
    RowsOfPage: rowsPerPage ? rowsPerPage : 10,
    Query: searchTerm ? searchTerm : undefined,
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
export const useGetAllUsers = ({ currentPage, rowsPerPage, searchTerm }) => {
  return useQuery({
    queryKey: ["GetAllUsers", currentPage, rowsPerPage, searchTerm],
    queryFn: () => {
      return GetAllUsers({ currentPage, rowsPerPage, searchTerm });
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
