import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const UpdateUser = async (user) => {
  console.log("this is UpdateUser", user);
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_USER_ADMIN_URL}`,
      user
    );
    console.log(response.message, "this response UpdateUser");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: (data) => {
      console.log("this is user UpdateUser =", data);
      return UpdateUser(data);
    },
  });
};
