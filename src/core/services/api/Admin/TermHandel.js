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

const AddTerm = async (user) => {
  console.log("this is AddTerm", user);
  const row = {
    id: user?.id,
    termName: user?.termName,
    departmentId: user?.departmentId,
    startDate: user?.startDate,
    endDate: user?.endDate,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_TERM_LIST_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddTerm");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddTerm = () => {
  return useMutation({
    mutationKey: ["AddTerm"],
    mutationFn: (data) => {
      console.log("this is user AddTerm =", data);
      return AddTerm(data);
    },
  });
};

//edit

const EditTerm = async (user) => {
  console.log("this is EditTerm", user);
  const row = {
    id: user?.id,
    termName: user?.termName,
    departmentId: user?.departmentId,
    startDate: user?.startDate,
    endDate: user?.endDate,
    expire: user?.expire,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_TERM_LIST_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response EditTerm");
    return response;
  } catch (error) {
    return false;
  }
};

export const useEditTerm = () => {
  return useMutation({
    mutationKey: ["EditTerm"],
    mutationFn: (data) => {
      console.log("this is user EditTerm =", data);
      return EditTerm(data);
    },
  });
};
