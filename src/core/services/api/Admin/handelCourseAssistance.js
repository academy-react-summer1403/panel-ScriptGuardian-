import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetAssistanceCourseList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_ASSISTANCE_COURSE_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetAssistanceCourseList ", error);
    return false;
  }
};
export const useGetAssistanceCourseList = () => {
  return useQuery({
    queryKey: ["GetAssistanceCourseList"],
    queryFn: () => {
      return GetAssistanceCourseList();
    },
  });
};
