import * as Yup from "yup";

//Add Users
export const validationSchemaForAddNewUser = Yup.object({
  lastName: Yup.string().required("این فیلد الزامی است."),
  firstName: Yup.string().required("این فیلد الزامی است."),
  gmail: Yup.string().required("این فیلد الزامی است."),
  phoneNumber: Yup.string().required("این فیلد الزامی است."),
  password: Yup.string().required("این فیلد الزامی است."),
});
