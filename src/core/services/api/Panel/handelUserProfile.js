import { useMutation } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const AddProfileImage = async (formData) => {
  console.log("this is AddProfileImage", formData);
  try {
    const response = await http.post(
      ApiRoutes.PANEL_ADD_PROFILE_IMAGE_URL,
      formData,
      {
        headers: {
          "Content-Type": "application/form-data",
        },
      }
    );
    console.log(response.message, "this EditProfile success");
    return response;
  } catch (error) {
    console.log(error, "this error editprofile");
    console.log(error.message, "this error AddProfileImage message");

    return false;
  }
};

export const useAddProfileImage = () => {
  return useMutation({
    mutationKey: ["AddProfileImage"],
    mutationFn: (data) => {
      console.log("this is user AddProfileImage =", data);
      return AddProfileImage(data);
    },
  });
};

//Handel Select

const SelectProfileImage = async (formData) => {
  console.log("this is SelectProfileImage", formData);
  try {
    const response = await http.post(
      ApiRoutes.PANEL_SELECT_PROFILE_IMAGE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.message, "this EditProfile success");
    return response;
  } catch (error) {
    console.log(error, "this error editprofile");
    console.log(error.message, "this error SelectProfileImage message");

    return false;
  }
};

export const useSelectProfileImage = () => {
  return useMutation({
    mutationKey: ["SelectProfileImage"],
    mutationFn: (data) => {
      console.log("this is user SelectProfileImage =", data);
      return SelectProfileImage(data);
    },
  });
};

//Handel Delete

const DeleteProfileImage = async (formData) => {
  console.log("this is DeleteProfileImage", formData);
  try {
    const response = await http.delete(
      ApiRoutes.PANEL_DELETE_PROFILE_IMAGE_URL,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }
    );
    console.log(response.message, "this DeleteProfileImage success");
    return response;
  } catch (error) {
    console.log(error, "this error DeleteProfileImage");
    console.log(error.message, "this error DeleteProfileImage message");

    return false;
  }
};

export const useDeleteProfileImage = () => {
  return useMutation({
    mutationKey: ["DeleteProfileImage"],
    mutationFn: (formData) => {
      console.log("this is user DeleteProfileImage =", formData);
      return DeleteProfileImage(formData);
    },
  });
};
