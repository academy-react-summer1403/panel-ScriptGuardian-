import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const GetClassRoomList = async () => {
  try {
    const response = await http.get(`${ApiRoutes.PANEL_LIST_CLASS_ROOM_URL}`);
    return response;
  } catch (error) {
    console.log("This error For Get GetClassRoomList ", error);
    return false;
  }
};
export const useGetClassRoomList = () => {
  return useQuery({
    queryKey: ["GetClassRoomList"],
    queryFn: () => {
      return GetClassRoomList();
    },
  });
};

//Add

const AddClassRoom = async (user) => {
  console.log("this is AddClassRoom", user);
  const row = {
    id: user?.id,
    classRoomName: user?.classRoomName,
    capacity: user?.capacity,
    buildingId: user?.buildingId,
  };
  console.log(row, "this row");
  try {
    const response = await http.post(
      `${ApiRoutes.PANEL_ADD_CLASS_ROOM_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response AddClassRoom");
    return response;
  } catch (error) {
    return false;
  }
};

export const useAddClassRoom = () => {
  return useMutation({
    mutationKey: ["AddClassRoom"],
    mutationFn: (data) => {
      console.log("this is user AddClassRoom =", data);
      return AddClassRoom(data);
    },
  });
};

//update Class

const UpdateClassRoom = async (user) => {
  console.log("this is UpdateClassRoom", user);
  const row = {
    id: user?.id,
    classRoomName: user?.classRoomName,
    capacity: user?.capacity,
    buildingId: user?.buildingId,
  };
  console.log(row, "this row");
  try {
    const response = await http.put(
      `${ApiRoutes.PANEL_UPDATE_CLASS_ROOM_URL}`,
      row,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message, "this response UpdateClassRoom");
    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateClassRoom = () => {
  return useMutation({
    mutationKey: ["UpdateClassRoom"],
    mutationFn: (data) => {
      console.log("this is user UpdateClassRoom =", data);
      return UpdateClassRoom(data);
    },
  });
};
