import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetJobHistoryList = async () => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_JOB_HISTORY_LIST_URL}`
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetJobHistoryList ", error);
    return false;
  }
};
export const useGetJobHistoryList = () => {
  return useQuery({
    queryKey: ["GetJobHistoryList"],
    queryFn: () => {
      return GetJobHistoryList();
    },
  });
};
