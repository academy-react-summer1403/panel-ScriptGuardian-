import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const AddRateNews = async ({NewsId ,RateNumber }) => {
  console.log("this is AddRateNews", {RateNumber , NewsId});
  try {
    const response = await http.post(
      `${ApiRoutes.ADD_RATE_NEWS_URL}NewsId=${NewsId}&RateNumber=${RateNumber}`
    );
    console.log(response.message, "this response AddRateNews");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddRateNews = () => {
  return useMutation({
    mutationKey: ["AddRateNews"],
    mutationFn: (data) => {
      console.log("this is user AddRateNews data =", data);
      return AddRateNews(data);
    },
  });
};
