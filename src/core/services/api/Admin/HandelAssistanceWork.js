import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAssistanceWorkList = async () => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_LIST_ASSISTANCE_WORK_URL}`
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetAssistanceWorkList ", error);
    return false;
  }
};
export const useGetAssistanceWorkList = () => {
  return useQuery({
    queryKey: ["GetAssistanceWorkList"],
    queryFn: () => {
      return GetAssistanceWorkList();
    },
  });
};
