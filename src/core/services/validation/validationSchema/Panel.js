import * as Yup from "yup";

export const validationEditPass = Yup.object({
  oldPassword: Yup.string().required("رمز عبور فعلی الزامی است"),
  newPassword: Yup.string()
    .min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد")
    .required("رمز عبور جدید الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "رمز عبورهای جدید باید یکسان باشند")
    .required("تکرار رمز عبور جدید الزامی است"),
});
