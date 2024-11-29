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
import {
  useCreateCateGoryNews,
  useCreateNews,
} from "../../core/services/api/Admin/handelCreateNews";
import { useFormik } from "formik";
import { validationSchema } from "../../core/services/validation/validationSchema/Auth";
import {
  validationForCreateNews,
  validationForCreateNewsCateGory,
} from "../../core/services/validation/AdminPanel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { mutate: createCateGoryNews } = useCreateCateGoryNews();

  // ** USE Formik
  const formik = useFormik({
    initialValues: {
      CategoryName: "",
      Image: "Not-set",
      IconAddress: "",
      IconName: "",
      GoogleTitle: "",
      GoogleDescribe: "",
    },
    validationSchema: validationForCreateNewsCateGory,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      createCateGoryNews(formData, {
        onSuccess: (data) => {
          if (data.success == true) {
            formik.resetForm();
            toast.success("دسته بندی با موفقیت اضافه شد");
            navigate("/AddNewsPage");
          } else {
            toast.error("خطا در اضافه کردن دسته بندی");
          }
        },
      });
    },
  });

  console.log("data of cate", data);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">فورم اضافه کردن دسته بندی خبر جدید</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <form className="mt-2 pt-50" onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="CategoryName">
                  نام دسته بندی{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder="نام دسته بندی را وارد کنید"
                  {...formik.getFieldProps("CategoryName")}
                />

                {formik.errors.CategoryName && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.CategoryName}
                  </div>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Image">
                  عکس دسته بندی{" "}
                </Label>

                <Input
                  id="Image"
                  type="file"
                  placeholder="عکس دسته بندی را وارد کنید"
                  onChange={(event) =>
                    formik.setFieldValue("Image", event.currentTarget.files[0])
                  }
                />

                {formik.errors.Image && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.Image}
                  </div>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="IconAddress">
                  آدرس آیکون دسته بندی{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder="آدرس آیکون دسته بندی را وارد کنید"
                  {...formik.getFieldProps("IconAddress")}
                />

                {formik.errors.IconAddress && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.IconAddress}
                  </div>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="IconName">
                  نام آیکون دسته بندی{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder="نام آیکون دسته بندی را وارد کنید"
                  {...formik.getFieldProps("IconName")}
                />

                {formik.errors.IconName && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.IconName}
                  </div>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="GoogleTitle">
                  عنوان گوگل دسته بندی{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder=" عنوان گوگل دسته بندی را وارد کنید"
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
                  توضیحات گوگل دسته بندی{" "}
                </Label>

                <Input
                  id="Title"
                  placeholder=" توضیحات گوگل دسته بندی را وارد کنید"
                  {...formik.getFieldProps("GoogleDescribe")}
                />

                {formik.errors.GoogleDescribe && (
                  <div className="text-danger top-0 end-0 me-3">
                    {formik.errors.GoogleDescribe}
                  </div>
                )}
              </Col>
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  ثبت{" "}
                </Button>
                {/* <Button color="secondary" outline>
                  Discard
                </Button> */}
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountTabs;
