import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const DetailNews = async (id) => {
  try {
    const response = await http.get(`${ApiRoutes.DETAILS_NEWS_PAGE_URL}${id}`);
    return response;
  } catch (error) {
    console.log("This error For DetailNews.js", error);
    return false;
  }
};
export const useDetailNews = (id) => {
  return useQuery({
    queryKey: ["DetailNews"],
    queryFn: () => DetailNews(id),
    enabled: !!id, // اجرای query فقط زمانی که id موجود باشد
  });
};
