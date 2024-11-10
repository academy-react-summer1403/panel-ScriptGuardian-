import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const PanelChangePassword = async (user) => {
  console.log("this is PanelChangePassword", user);
  try {
    const response = await http.post(ApiRoutes.PANEL_CHANGE_PASSWORD_URL, user);
    console.log(response.message, "this response PanelChangePassword");
    return response;
  } catch (error) {
    return false;
  }
};

export const usePanelChangePassword = () => {
  return useMutation({
    mutationKey: ["PanelChangePassword"],
    mutationFn: (data) => {
      console.log("this is user PanelChangePassword data =", data);
      return PanelChangePassword(data);
    },
  });
};
