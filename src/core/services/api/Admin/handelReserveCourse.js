import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const GetAllCourseDetailsReserves = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_COURSE_RESERVE_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllCourseDetailsReserves in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllCourseDetailsReserves = (id) => {
  return useQuery({
    queryKey: ["GetAllCourseDetailsReserves"],
    queryFn: () => {
      return GetAllCourseDetailsReserves(id);
    },
  });
};

//Get All Reserve

const GetAllCourseReserves = async () => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_LIST_COURSE_RESERVE_URL}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllCourseReserves in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllCourseReserves = () => {
  return useQuery({
    queryKey: ["GetAllCourseReserves"],
    queryFn: () => {
      return GetAllCourseReserves();
    },
  });
};

const GetAllPaymentList = async () => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_LIST_COURSE_PAYMENT_URL}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllPaymentList in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllPaymentList = () => {
  return useQuery({
    queryKey: ["GetAllPaymentList"],
    queryFn: () => {
      return GetAllPaymentList();
    },
  });
};
