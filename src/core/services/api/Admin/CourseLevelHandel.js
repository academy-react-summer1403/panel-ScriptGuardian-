import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetCourseLevelList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_GET_LEVEL_COURSE_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetCourseLevelList ", error);
    return false;
  }
};
export const useGetCourseLevelList = () => {
  return useQuery({
    queryKey: ["GetCourseLevelList"],
    queryFn: () => {
      return GetCourseLevelList();
    },
  });
};

//Add

const AddLevel = async (user) => {
  console.log("this is AddLevel", user);
  const row = {
    id: user?.id,
    levelName: user?.levelName,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_LEVEL_COURSE_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddLevel");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddLevel = () => {
  return useMutation({
    mutationKey: ["AddLevel"],
    mutationFn: (data) => {
      console.log("this is user AddLevel =", data);
      return AddLevel(data);
    },
  });
};

//edit

const EditLevel = async (user) => {
  console.log("this is EditLevel", user);
  const row = {
    id: user?.id,
    levelName: user?.levelName,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_EDIT_LEVEL_COURSE_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response EditLevel");
    return response;
  } catch (error) {
    return false;
  }
};

export const useEditLevel = () => {
  return useMutation({
    mutationKey: ["EditLevel"],
    mutationFn: (data) => {
      console.log("this is user EditLevel =", data);
      return EditLevel(data);
    },
  });
};
