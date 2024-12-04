import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetStatusList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_STATUS_LIST_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetStatusList ", error);
    return false;
  }
};
export const useGetStatusList = () => {
  return useQuery({
    queryKey: ["GetStatusList"],
    queryFn: () => {
      return GetStatusList();
    },
  });
};

//Add

const AddStatus = async (user) => {
  console.log("this is AddStatus", user);
  const row = {
    statusName: user?.statusName,
    describe: user?.describe,
    statusNumber: user?.statusNumber,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_STATUS_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddStatus");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddStatus = () => {
  return useMutation({
    mutationKey: ["AddStatus"],
    mutationFn: (data) => {
      console.log("this is user AddStatus =", data);
      return AddStatus(data);
    },
  });
};

//edit

const EditStatus = async (user) => {
  console.log("this is AddStatus", user);
  const row = {
    statusName: user?.statusName,
    describe: user?.describe,
    statusNumber: user?.statusNumber,
    id: user?.id,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_EDIT_STATUS_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response EditStatus");
    return response;
  } catch (error) {
    return false;
  }
};

export const useEditStatus = () => {
  return useMutation({
    mutationKey: ["EditStatus"],
    mutationFn: (data) => {
      console.log("this is user EditStatus =", data);
      return EditStatus(data);
    },
  });
};
