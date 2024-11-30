// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";

import { selectThemeColors } from "@utils";
import { useFormik } from "formik";
import {
  useCreateCourseStepThird,
  useCreateCourseStepTwo,
} from "../../../core/services/api/Admin/handelAddCourse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validationForAddNewCourse,
  validationSchemaForAddNewUser,
} from "../../../core/services/validation/AdminPanel";
const SocialLinks = ({
  stepper,
  type,
  data,
  setCurrentValue,
  currentValue,
  getId,
}) => {
  const navigate = useNavigate();
  const technologyDtos =
    (data &&
      data?.technologyDtos?.map((item) => ({
        value: item.id,
        label: item.techName,
      }))) ||
    [];

  const handleChange = (key, value) => {
    setCurrentValue((prev) => ({
      ...prev,
      [key]: value, // بروزرسانی مقدار ورودی مشخص
    }));
  };
  const { mutate: AddTec } = useCreateCourseStepThird();

  const formik = useFormik({
    initialValues: {
      techId:
        currentValue &&
        currentValue?.currentTechnologyDtos?.map((item) => ({
          techId: item?.value,
        }))
          ? currentValue?.currentTechnologyDtos?.map((item) => ({
              techId: item?.value,
            }))
          : [],
      courseId: getId,
    },
    validationSchema: Yup.object({
      techId: Yup.array()
        .min(1, "لطفا حداقل یک تکنولوژی انتخاب کنید")
        .required("انتخاب تکنولوژی الزامی است"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      AddTec(values, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("   در ثبت دوره موفق بودید     ");
            navigate(`/CourseListPage/${getId}`);
          } else {
            toast.error("ثبت دوره  ناموفق بود");
          }
        },
      });
    },
  });
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">تکنولوژی </h5>
        <small> لطفا تکنولوژی یا تکنولوژی های مورد نظر خود را وارد کنید</small>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              تکنولوژی دوره{" "}
            </Label>
            <Select
              isMulti
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={technologyDtos}
              defaultValue={technologyDtos[0]}
              onChange={(data) => handleChange("currentTechnologyDtos", data)}
            />

            {formik.touched.techId &&
              formik.errors.techId && (
                <div className="text-danger">
                  {formik.errors.techId}
                </div>
              )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <div className=""></div>
          <Button
            color="success"
            className="btn-submit"
            // onClick={() => alert("submitted")}
          >
            ارسال
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
