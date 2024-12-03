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

const GetAssistanceWorkDetails = async (id) => {
  try {
    const response = await http.get(
      `${ApiRoutes.PANEL_GET_DETAILS_ASSISTANCE_WORK_URL}${id}`
    );
    return response;
  } catch (error) {
    console.log("This error For Get GetAssistanceWorkDetails ", error);
    return false;
  }
};
export const useGetAssistanceWorkDetails = (id) => {
  return useQuery({
    queryKey: ["GetAssistanceWorkDetails", id],
    queryFn: () => {
      return GetAssistanceWorkDetails(id);
    },
  });
};

const UpdateAssistanceWork = async (user) => {
  console.log("this is UpdateAssistanceWork", user);
  const row = {
    worktitle: user?.worktitle,
    workDescribe: user?.workDescribe,
    assistanceId: user?.assistanceId,
    workDate: user?.workDate,
    id: user?.id,
  };
  console.log(row , "this row")
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_DETAILS_ASSISTANCE_WORK_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response UpdateAssistanceWork");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateAssistanceWork = () => {
  return useMutation({
    mutationKey: ["UpdateAssistanceWork"],
    mutationFn: (data) => {
      console.log("this is user UpdateAssistanceWork =", data);
      return UpdateAssistanceWork(data);
    },
  });
};
