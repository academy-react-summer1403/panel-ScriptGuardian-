import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAllUsers = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_ALL_USERS_URL}`);
    return response.listUser;
  } catch (error) {
    console.log("This error For Get AllUsers in handelUsers.js ", error);
    return false;
  }
};
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GetAllUsers"],
    queryFn: GetAllUsers,
  });
};
