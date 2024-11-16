import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const AcceptCourseReserve = async (user) => {
  console.log("this is AcceptCourseReserve", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ACCEPT_RESERVE_ADMIN_URL}`,
      user
    );
    console.log(response.message, "this response AcceptCourseReserve");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAcceptCourseReserve = () => {
  return useMutation({
    mutationKey: ["AcceptCourseReserve"],
    mutationFn: (data) => {
      console.log("this is user AcceptCourseReserve =", data);
      return AcceptCourseReserve(data);
    },
  });
};
