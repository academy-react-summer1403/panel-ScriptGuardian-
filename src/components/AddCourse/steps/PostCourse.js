// ** React Imports
import { useFormik } from "formik";
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import { useCreateCourseStepTwo } from "../../../core/services/api/Admin/handelAddCourse";
import { toast } from "react-toastify";
import { validationSchemaForAddNewCourses } from "../../../core/services/validation/AdminPanel";

const PostCourse = ({
  stepper,
  type,
  setCurrentValue,
  currentValue,
  setGetId,
}) => {
  const { mutate: CreateCourse, data } = useCreateCourseStepTwo();
  if (data?.id) {
    setGetId(data.id);
  }
  const handleChange = (key, value) => {
    setCurrentValue((prev) => ({
      ...prev,
      [key]: value, // بروزرسانی مقدار ورودی مشخص
    }));
  };

  const formik = useFormik({
    initialValues: {
      Title: currentValue?.Title, //1
      Describe: currentValue?.Describe, //2
      MiniDescribe: currentValue?.MiniDescribe, //3
      MiniDescribe: currentValue?.MiniDescribe, //4
      Capacity: currentValue?.Capacity, //5
      CourseTypeId: currentValue?.currentCourseType?.value, //6
      SessionNumber: currentValue?.SessionNumber, //7
      CurrentCoursePaymentNumber: currentValue?.CurrentCoursePaymentNumber, //8 //? idk
      TremId: currentValue?.currentTermDtos?.value, //9
      ClassId: currentValue?.currentClassRoomDtos?.value, //11
      CourseLvlId: currentValue?.currentCourseLevelDtos?.value, //12
      TeacherId: currentValue?.currentTeachers?.value, //13
      Cost: currentValue?.Cost, //14
      UniqeUrlString: currentValue?.uniqeUrlString, //14
      StartTime: currentValue?.StartTime, //14
      EndTime: currentValue?.EndTime, //14
      GoogleSchema: currentValue?.GoogleSchema, //14
      GoogleTitle: currentValue?.GoogleTitle, //14
      CoursePrerequisiteId: currentValue?.CoursePrerequisiteId,
      ShortLink: currentValue?.ShortLink,
      TumbImageAddress: currentValue?.TumbImageAddress,
      ImageAddress: currentValue?.ImageAddress,
    },
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      CreateCourse(formData, {
        onSuccess: (data) => {
          if (data.success) {
            stepper.next();
            toast.success(
              "   ثبت دوره موفق بود لطفا تکنولوژی مورد نظر را انتخاب کنید     "
            );
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
        <h5 className="mb-0">اطلاعات تخصصی</h5>
        <small>لطفا اطلاعات تخصصی مربوط به دوره خود را وراد کنید</small>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              عنوان گوگل {currentValue?.Title}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="عنوان گوگل دوره را وارد کنید"
              value={currentValue.GoogleTitle}
              onChange={(e) => handleChange("GoogleTitle", e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              اسکیمای گوگل دوره خود را وارد کنید{" "}
            </Label>
            <Input
              type="Number"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="اسکیمای دوره را وارد کنید"
              value={currentValue.GoogleSchema}
              onChange={(e) => handleChange("GoogleSchema", e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              لینک کوتاه دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="لینک کوتاه دوره را وارد کنید"
              value={currentValue.shortLink}
              onChange={(e) => handleChange("shortLink", e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              URL مخصوص دوره شما{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="URL  دوره را وارد کنید"
              value={currentValue.uniqeUrlString}
              onChange={(e) => handleChange("uniqeUrlString", e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"
            // onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PostCourse;
