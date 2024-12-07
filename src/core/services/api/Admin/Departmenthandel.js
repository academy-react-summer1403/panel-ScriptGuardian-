import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetDepartList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_DEPARTMENT_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetDepartList ", error);
    return false;
  }
};
export const useGetDepartList = () => {
  return useQuery({
    queryKey: ["GetDepartList"],
    queryFn: () => {
      return GetDepartList();
    },
  });
};

//Add

const AddDepartment = async (user) => {
  console.log("this is AddDepartment", user);
  const row = {
    id: user?.id,
    depName: user?.depName,
    buildingId: user?.buildingId,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_DEPARTMENT_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddDepartment");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddDepartment = () => {
  return useMutation({
    mutationKey: ["AddDepartment"],
    mutationFn: (data) => {
      console.log("this is user AddDepartment =", data);
      return AddDepartment(data);
    },
  });
};

//Update

const UpdateDepartment = async (user) => {
  console.log("this is AddDepartment", user);
  const row = {
    id: user?.id,
    depName: user?.depName,
    buildingId: user?.buildingId,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_UPDATE_DEPARTMENT_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response UpdateDepartment");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateDepartment = () => {
  return useMutation({
    mutationKey: ["UpdateDepartment"],
    mutationFn: (data) => {
      console.log("this is user UpdateDepartment =", data);
      return UpdateDepartment(data);
    },
  });
};
