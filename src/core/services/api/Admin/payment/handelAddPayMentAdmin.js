import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../../../../interceptors/interceptors";
import { ApiRoutes } from "../../ApiRoutes/ApiRoutes";

//AdddPaymentStepOne

const AddPaymentAdminForUserStepOne = async (user) => {
  console.log("this is AddPaymentAdminForUserStepOne", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_PAYMENT_STEP_ONE_URL}`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(
      response.message,
      "this response AddPaymentAdminForUserStepOne"
    );
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddPaymentAdminForUserStepOne = () => {
  return useMutation({
    mutationKey: ["AddPaymentAdminForUserStepOne"],
    mutationFn: (data) => {
      console.log("this is user AddPaymentAdminForUserStepOne =", data);
      return AddPaymentAdminForUserStepOne(data);
    },
  });
};

//two

const AddPaymentAdminForUserStepTwo = async (user) => {
  console.log("this is AddPaymentAdminForUserStepTwo", user);
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_PAYMENT_STEP_TWO_URL}`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(
      response.message,
      "this response AddPaymentAdminForUserStepTwo"
    );
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddPaymentAdminForUserStepTwo = () => {
  return useMutation({
    mutationKey: ["AddPaymentAdminForUserStepTwo"],
    mutationFn: (data) => {
      console.log("this is user AddPaymentAdminForUserStepTwo =", data);
      return AddPaymentAdminForUserStepTwo(data);
    },
  });
};
