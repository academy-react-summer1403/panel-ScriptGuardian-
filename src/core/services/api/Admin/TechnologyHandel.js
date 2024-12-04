import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetTechList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_TECH_LIST_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetTechList ", error);
    return false;
  }
};
export const useGetTechList = () => {
  return useQuery({
    queryKey: ["GetTechList"],
    queryFn: () => {
      return GetTechList();
    },
  });
};

//Add

const AddTech = async (user) => {
  console.log("this is AddTech", user);
  const row = {
    techName: user?.techName,
    parentId: user?.parentId,
    describe: user?.describe,
    iconAddress: user?.iconAddress,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_TECH_LIST_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddTech");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddTech = () => {
  return useMutation({
    mutationKey: ["AddTech"],
    mutationFn: (data) => {
      console.log("this is user AddTech =", data);
      return AddTech(data);
    },
  });
};

//edit

const EditStatus = async (user) => {
  console.log("this is EditStatus", user);
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
