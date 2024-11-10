import { useMutation } from "@tanstack/react-query";
import http from "../../../../interceptors/interceptors";
import { ApiRoutes } from "../../ApiRoutes/ApiRoutes";

//setup First

const RegisterCode = async (user) => {
  console.log("this is user", user);
  try {
    const response = await http.post(ApiRoutes.REGISTER_CODE_URL, user);
    console.log(response.message, "this response Of Register Code");
    return response;
  } catch (error) {
    return false;
  }
};

export const useRegisterCode = () => {
  return useMutation({
    mutationKey: ["RegisterCode"],
    mutationFn: (data) => {
      console.log("this is user RegisterCode data =", data);
      return RegisterCode(data);
    },
  });
};

//setup Second

const RegisterVerification = async (user) => {
  console.log("this is user", user);
  try {
    const response = await http.post(
      ApiRoutes.REGISTER_CODE_VERIFICATION_URL,
      user
    );
    console.log(response.message, "this response Of Register Code");
    return response;
  } catch (error) {
    return false;
  }
};

export const useRegisterVerification = () => {
  return useMutation({
    mutationKey: ["RegisterVerificationCode"],
    mutationFn: (data) => {
      console.log("this is user RegisterVerificationCode data =", data);
      return RegisterVerification(data);
    },
  });
};

//setup Third

const RegisterFinish = async (user) => {
  console.log("this is user", user);
  try {
    const response = await http.post(ApiRoutes.REGISTER_CODE_FINISH, user);
    console.log(response.message, "this response Of  RegisterFinish");
    return response;
  } catch (error) {
    return false;
  }
};

export const useRegisterFinish = () => {
  return useMutation({
    mutationKey: ["RegisterFinish"],
    mutationFn: (data) => {
      console.log("this is user RegisterFinish data =", data);
      return RegisterFinish(data);
    },
  });
};
