import * as Yup from "yup";
//Login Validation

export const validationSchema = Yup.object({
  phoneOrGmail: Yup.string()
    .required("این فیلد الزامی است")
    .test(
      "is-valid-phone-or-email",
      "لطفا یک شماره تلفن یا ایمیل معتبر وارد کنید",
      (value) => {
        const phoneRegex = /^09\d{9}$/; // مثال برای شماره تلفن (10 رقم با پیش شماره 09)
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

        return phoneRegex.test(value) || emailRegex.test(value);
      }
    ),
  password: Yup.string()
    .required("این فیلد الزامی است")
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"), // اصلاح تعداد کاراکتر
  rememberMe: Yup.boolean(),
});

export const validationRegisterCode = Yup.object({
  phoneNumber: Yup.string()
    .required("این فیلد الزامی است")
    .matches(/^(\+98|0)?9\d{9}$/, "لطفا یک شماره تلفن معتبر وارد کنید")
    .min(11, "شماره تلفن باید  11 کاراکتر باشد"),
});

export const validationRegisterVerification = Yup.object().shape({
  verifyCode1: Yup.string()
    .matches(/^[0-9]$/, "فقط عدد مجاز است")
    .required("این فیلد اجباری است"),
  verifyCode2: Yup.string()
    .matches(/^[0-9]$/, "فقط عدد مجاز است")
    .required("این فیلد اجباری است"),
  verifyCode3: Yup.string()
    .matches(/^[0-9]$/, "فقط عدد مجاز است")
    .required("این فیلد اجباری است"),
  verifyCode4: Yup.string()
    .matches(/^[0-9]$/, "فقط عدد مجاز است")
    .required("این فیلد اجباری است"),
  verifyCode5: Yup.string()
    .matches(/^[0-9]$/, "فقط عدد مجاز است")
    .required("این فیلد اجباری است"),
});

//Register Finish

export const validationRegisterFinish = Yup.object().shape({
  gmail: Yup.string()
    .email("فرمت جیمیل معتبر نیست")
    .required("جیمیل الزامی است"),
  password: Yup.string()
    .min(6, "حداقل 6 کاراکتر")
    .required("رمز عبور الزامی است"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است")
    .required("شماره تلفن الزامی است"),
});
