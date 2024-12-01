import StateManagedSelect from "react-select";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import { Check, X } from "react-feather";
import { useFormik } from "formik";
import {
  useUpdateCourse,
  useUpdateUser,
} from "../../../../core/services/api/Admin/handelChangeProfileUser";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCourseStepOne } from "../../../../core/services/api/Admin/handelAddCourse";
import { useState } from "react";
import Select from "react-select";
import * as Yup from "yup";

const ModalCustom = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const { data: GetCourseStepOne } = useCreateCourseStepOne();
  const { mutate: UpdateProfile } = useUpdateCourse();
  console.log(data, "this data from course details");

  const [currentValue, setCurrentValue] = useState({
    currentCourseType: null, //1
    currentCourseLevelDtos: null, //2
    currentClassRoomDtos: null, //3
    currentTermDtos: null, //4
  });

  const formik = useFormik({
    initialValues: {
      Id: data?.courseId ?? "",
      Title: data?.title ?? "",
      Describe: data?.describe ?? "",
      MiniDescribe: "تست تست تست تست ",
      Capacity: "33",
      CourseTypeId: currentValue?.currentCourseType?.value ?? "2", //? آنلاین
      SessionNumber: "1", // custom
      CurrentCoursePaymentNumber: data?.paymentDoneTotal ?? "", //?
      TremId: currentValue?.currentTermDtos?.value ?? "2", // just my custom
      ClassId: currentValue?.currentClassRoomDtos?.value ?? "2",
      CourseLvlId: currentValue?.currentCourseLevelDtos?.value ?? "2",
      TeacherId: data?.teacherId ?? "",
      Cost: data?.cost ?? "",
      UniqeUrlString: "", //?
      Image: data?.imageAddress ?? "Not-set",
      StartTime: data?.startTime ?? "",
      EndTime: data?.endTime ?? "",
      GoogleSchema: "تستستستستستستستستستستستستستس", //?
      GoogleTitle: "تستستستستستستستستستستستستستستس", //?
      CoursePrerequisiteId: data?.courseId ?? "", //? course id mishe
      TumbImageAddress: data?.imageAddress ?? " Not-set", //my custom
      ImageAddress: data?.imageAddress ?? " Not-set", //my custom
      ShortLink: "123456", //?
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      UniqeUrlString: Yup.string().required("وارد کردن این فیلد الزامی است."),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      UpdateProfile(formData, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetAllCourseDetailsAdmin");

            setShow(false);
          }
        },
      });
    },
  });

  const courseTypeDtos =
    (GetCourseStepOne &&
      GetCourseStepOne?.courseTypeDtos?.map((item) => ({
        value: item.id,
        label: item.typeName,
      }))) ||
    [];
  //2
  const courseLevelDtos =
    (GetCourseStepOne &&
      GetCourseStepOne?.courseLevelDtos?.map((item) => ({
        value: item.id,
        label: item.levelName,
      }))) ||
    [];
  //3
  const statusDtos =
    (GetCourseStepOne &&
      GetCourseStepOne?.statusDtos?.map((item) => ({
        value: item.id,
        label: item.statusName,
      }))) ||
    [];
  //4
  const classRoomDtos =
    (GetCourseStepOne &&
      GetCourseStepOne?.classRoomDtos?.map((item) => ({
        value: item.id,
        label: item.classRoomName,
      }))) ||
    [];
  //5

  //6
  const termDtos =
    (GetCourseStepOne &&
      GetCourseStepOne?.termDtos?.map((item) => ({
        value: item.id,
        label: item.termName,
      }))) ||
    [];

  const handleChange = (key, value) => {
    setCurrentValue((prev) => ({
      ...prev,
      [key]: value, // بروزرسانی مقدار ورودی مشخص
    }));
  };
  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">تغییر اطلاعات دوره </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              {/* title */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="Title">
                  عنوان دوره{" "}
                </Label>

                <Input
                  id="Title"
                  name="Title"
                  placeholder="عنوان دوره را وارد کنید"
                  {...formik?.getFieldProps("Title")}
                />
              </Col>

              {/* MiniDescribe */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="MiniDescribe">
                  توضیحات کوتاه دوره{" "}
                </Label>

                <Input
                  id="MiniDescribe"
                  name="MiniDescribe"
                  placeholder="متن دوره را وارد کنید"
                  {...formik?.getFieldProps("MiniDescribe")}
                />
              </Col>
            </Row>
            <Row className="gy-1 pt-75 mb-1">
              {/* Capacity */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="Capacity">
                  ظرفیت دوره
                </Label>

                <Input
                  id="Capacity"
                  name="Capacity"
                  placeholder="ظرفیت دوره را وارد کنید"
                  {...formik?.getFieldProps("Capacity")}
                />
              </Col>
              {/* UniqeUrlString */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="Capacity">
                  ای دی اختصاصی دوره
                </Label>

                <Input
                  id="UniqeUrlString"
                  name="UniqeUrlString"
                  placeholder="یونیک دوره را وارد کنید"
                  {...formik?.getFieldProps("UniqeUrlString")}
                />

                {formik.touched.UniqeUrlString &&
                formik.errors.UniqeUrlString ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.UniqeUrlString}
                  </div>
                ) : null}
              </Col>
            </Row>

            <Row className="">
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`country-`}>
                  نوع دوره
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`country-`}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseTypeDtos}
                  defaultValue={courseTypeDtos[0]}
                  onChange={(data) => handleChange("currentCourseType", data)}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`country`}>
                  سطح دوره{" "}
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`country`}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseLevelDtos}
                  // Todo
                  defaultValue={courseLevelDtos[0]}
                  onChange={(data) =>
                    handleChange("currentCourseLevelDtos", data)
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`countr`}>
                  کلاس دوره{" "}
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`country`}
                  className="react-select"
                  classNamePrefix="select"
                  options={classRoomDtos}
                  defaultValue={classRoomDtos[0]}
                  onChange={(data) =>
                    handleChange("currentClassRoomDtos", data)
                  }
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for={`countr`}>
                  ترم دوره{" "}
                </Label>
                <Select
                  onChange={(data) => handleChange("currentTermDtos", data)}
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`cou`}
                  className="react-select"
                  classNamePrefix="select"
                  options={termDtos}
                  defaultValue={termDtos[0]}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12} xs={12}>
                <Label className="form-label" for="Describe">
                  توضیحات دوره{" "}
                </Label>

                <Input
                  type="textarea"
                  id="Describe"
                  name="Describe"
                  placeholder="متن دوره را وارد کنید"
                  {...formik?.getFieldProps("Describe")}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalCustom;
