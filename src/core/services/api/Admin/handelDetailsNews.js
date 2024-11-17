import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";
const GetAllNewsComments = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_NEWS_COMMENTS_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log(
      "This error For Get GetAllNewsComments in handelUsers.js ",
      error
    );
    return false;
  }
};
export const useGetAllNewsComments = (id) => {
  return useQuery({
    queryKey: ["GetAllNewsComments"],
    queryFn: () => {
      return GetAllNewsComments(id);
    },
  });
};
