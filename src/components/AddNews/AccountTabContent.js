// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import { useGetAllCateGoryList } from "../../core/services/api/Admin/handelUsers";
import { useCreateNews } from "../../core/services/api/Admin/handelCreateNews";
import { useFormik } from "formik";
import { validationSchema } from "../../core/services/validation/validationSchema/Auth";
import { validationForCreateNews } from "../../core/services/validation/AdminPanel";

// const currencyOptions = [
//   { label: "USD" },
//   { value: "euro", label: "Euro" },
//   { value: "pound", label: "Pound" },
//   { value: "bitcoin", label: "Bitcoin" },
// ];

const AccountTabs = () => {
  // ** API
  //TODO
  const { data } = useGetAllCateGoryList();

  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: " لطفا یک دسته بندی انتخاب کنید",
  });

  const { mutate: createNews } = useCreateNews();

  // ** USE Formik
  const formik = useFormik({
    initialValues: {
      Title: "",
      GoogleTitle: "",
      GoogleDescribe: "",
      MiniDescribe: "",
      Describe: "",
      Keyword: "",
      IsSlider: false,
      NewsCatregoryId: currentRole?.value,
      Image: "",
    },
    // validationSchema: validationForCreateNews,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      createNews(formData);
    },
  });
  // تبدیل داده‌ها به فرمت قابل استفاده در کامپوننت Select
  const options = data?.map((item) => ({
    value: item?.id,
    label: item?.categoryName,
  }));

  console.log("data of cate", data);
  // ** Hooks
  const defaultValues = {
    lastName: "",
    firstName: "amir",
  };
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** States
  const [avatar, setAvatar] = useState("");

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">فورم اضافه کردن خبر</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          {/* <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatar}
                alt="Generic placeholder image"
                height="100"
                width="100"
              />
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                >
                  Upload
                  <Input
                    type="file"
                    onChange={onChange}
                    hidden
                    accept="image/*"
                  />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  onClick={handleImgReset}
                >
                  Reset
                </Button>
                <p className="mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800kB
                </p>
              </div>
            </div>
          </div> */}
          <form className="mt-2 pt-50" onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان خبر{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder="عنوان را وارد کنید"
                  {...formik.getFieldProps("Title")}
                />

                {formik.errors.Title && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.Title}
                  </div>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="GoogleTitle">
                  عنوان گوگل{" "}
                </Label>

                <Input
                  id="GoogleTitle"
                  placeholder="عنوان  گوگل را وارد کنید"
                  {...formik.getFieldProps("GoogleTitle")}
                />

                {formik.errors.GoogleTitle && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.GoogleTitle}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="GoogleDescribe">
                  توضیحات گوگل{" "}
                </Label>

                <Input
                  id="GoogleDescribe"
                  placeholder="توضیحات  گوگل را وارد کنید"
                  {...formik.getFieldProps("GoogleDescribe")}
                />

                {formik.errors.GoogleDescribe && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.GoogleDescribe}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="MiniDescribe">
                  توضیحات کوتاه{" "}
                </Label>

                <Input
                  id="MiniDescribe"
                  placeholder="توضیحات  کوتاه را وارد کنید"
                  {...formik.getFieldProps("MiniDescribe")}
                />

                {formik.errors.MiniDescribe && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.MiniDescribe}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Describe">
                  توضیحات{" "}
                </Label>

                <Input
                  id="Describe"
                  placeholder="توضیحات   را وارد کنید"
                  {...formik.getFieldProps("Describe")}
                />

                {formik.errors.Describe && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.Describe}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Keyword">
                  کلمه کلیدی{" "}
                </Label>

                <Input
                  id="Keyword"
                  placeholder="کلمه کلیدی را وارد کنید"
                  {...formik.getFieldProps("Keyword")}
                />

                {formik.errors.Keyword && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.Keyword}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Image">
                  تصویر{" "}
                </Label>

                <Input
                  id="Image"
                  placeholder="تصویر  را وارد کنید"
                  {...formik.getFieldProps("Image")}
                />

                {formik.errors.Image && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.Image}
                  </div>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="currency">
                  دسته بندی خبر
                </Label>
                <Select
                  id="NewsCatregoryId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options}
                  theme={selectThemeColors}
                  value={options?.find(
                    (option) => option.value === formik.values.NewsCatregoryId
                  )} // پیدا کردن گزینه مناسب
                  onChange={(data) => {
                    formik.setFieldValue("NewsCatregoryId", data?.value || ""); // مقدار فرمیک به‌روزرسانی می‌شود
                    setCurrentRole(data);
                  }}
                />
              </Col>
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  Save changes
                </Button>
                <Button color="secondary" outline>
                  Discard
                </Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountTabs;
