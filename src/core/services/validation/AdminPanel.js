import * as Yup from "yup";

//Add Users
export const validationSchemaForAddNewUser = Yup.object({
  lastName: Yup.string().required("این فیلد الزامی است."),
  firstName: Yup.string().required("این فیلد الزامی است."),
  gmail: Yup.string().required("این فیلد الزامی است."),
  phoneNumber: Yup.string().required("این فیلد الزامی است."),
  password: Yup.string().required("این فیلد الزامی است."),
});

export const validationForCreateNews = Yup.object().shape({
  Title: Yup.string()
    .required("عنوان الزامی است")
    .max(255, "عنوان نباید بیش از ۲۵۵ کاراکتر باشد"),
  GoogleTitle: Yup.string()
    .required("عنوان گوگل الزامی است")
    .max(255, "عنوان گوگل نباید بیش از ۲۵۵ کاراکتر باشد"),
  GoogleDescribe: Yup.string()
    .required("توضیحات گوگل الزامی است")
    .max(500, "توضیحات گوگل نباید بیش از ۵۰۰ کاراکتر باشد"),
  MiniDescribe: Yup.string()
    .required("توضیحات کوتاه الزامی است")
    .max(255, "توضیحات کوتاه نباید بیش از ۲۵۵ کاراکتر باشد"),
  Describe: Yup.string()
    .required("توضیحات کامل الزامی است")
    .min(50, "توضیحات کامل باید حداقل ۵۰ کاراکتر باشد"),
  Keyword: Yup.string()
    .required("کلمات کلیدی الزامی است")
    .matches(/^[a-zA-Z, ]*$/, "کلمات کلیدی باید فقط شامل حروف و کاما باشد"),
  IsSlider: Yup.boolean()
    .required("وضعیت اسلایدر الزامی است")
    .oneOf([true, false], "مقدار وضعیت اسلایدر باید درست یا نادرست باشد"),
  NewsCatregoryId: Yup.string()
    .required("شناسه دسته‌بندی خبر الزامی است")
    .matches(/^\d+$/, "شناسه دسته‌بندی خبر باید عدد باشد"),
  Image: Yup.string()
    .required("تصویر الزامی است")
    .test(
      "is-valid-image",
      "تصویر باید یک آدرس معتبر باشد یا مقدار 'Not-set' باشد",
      (value) => value === "Not-set" || Yup.string().url().isValidSync(value)
    ),
});




export const validationSchemaForAddNewCourses = Yup.object().shape({
  currentCourseType: Yup
    .object()
    .required("لطفاً نوع دوره را انتخاب کنید."),
  currentCourseLevel: Yup
    .object()
    .required("لطفاً سطح دوره را انتخاب کنید."),
});
