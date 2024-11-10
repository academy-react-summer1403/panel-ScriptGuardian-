import { useMutation } from "@tanstack/react-query";
import http from "../../../../interceptors/interceptors";
import { ApiRoutes } from "../../ApiRoutes/ApiRoutes";

const Login = async (user) => {
  console.log("this is user", user);
  try {
    const response = await http.post(ApiRoutes.LOGIN_URL, user);
    console.log(response.message, "this response");
    return response;
  } catch (error) {
    return false;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["Login"],
    mutationFn: (data) => {
      console.log("this is user data =", data);
      return Login(data);
    },
  });
};
