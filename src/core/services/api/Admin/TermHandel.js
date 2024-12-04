import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetTermList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_TERM_LIST_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetTermList ", error);
    return false;
  }
};
export const useGetTermList = () => {
  return useQuery({
    queryKey: ["GetTermList"],
    queryFn: () => {
      return GetTermList();
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

const EditTech = async (user) => {
  console.log("this is EditTech", user);
  const row = {
    techName: user?.techName,
    parentId: user?.parentId,
    describe: user?.describe,
    iconAddress: user?.iconAddress,
    id: user?.id,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_TECH_LIST_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response EditTech");
    return response;
  } catch (error) {
    return false;
  }
};

export const useEditTech = () => {
  return useMutation({
    mutationKey: ["EditTech"],
    mutationFn: (data) => {
      console.log("this is user EditTech =", data);
      return EditTech(data);
    },
  });
};
