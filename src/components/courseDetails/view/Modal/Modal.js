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

const ModalCustom = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const countryOptions = [
    { value: "uk", label: "UK" },
    { value: "usa", label: "USA" },
    { value: "france", label: "France" },
    { value: "russia", label: "Russia" },
    { value: "canada", label: "Canada" },
  ];

  const { mutate: UpdateProfile } = useUpdateCourse();
  console.log(data, "this data from course details");

  const formik = useFormik({
    initialValues: {
      Id: data?.courseId ?? "",
      Title: data?.title ?? "",
      Describe: data?.describe ?? "",
      MiniDescribe: "تست تست تست تست ",
      Capacity: "33",
      CourseTypeId: "2", //? آنلاین
      SessionNumber: "1", // custom
      CurrentCoursePaymentNumber: data?.paymentDoneTotal ?? "", //?
      TremId: "1", // just my custom
      ClassId: "2", //? "ClassRoom 2"
      CourseLvlId: "3", //? پیشرفته
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

      // Id: "b503e37c-3f21-ef11-b6c7-cc06a3e06235",
      // Title: "JavaScript",
      // Describe:
      //   "آموزش جاوا اسکریپت برای تمامی افرادی ک قصد ورود به زبان برنامه نویسی دارند مناسب می باشد . خصوصا برای علاقه مندان به حوزه فرانت ",
      // MiniDescribe: "تست تست تست",
      // Capacity: "33",
      // CourseTypeId: "2", //? آنلاین
      // SessionNumber: "1", // custom
      // CurrentCoursePaymentNumber: "0", //?
      // TremId: "1", // just my custom
      // ClassId: "2", //? "ClassRoom 2"
      // CourseLvlId: "3", //? پیشرفته
      // TeacherId: "1",
      // Cost: "870000",
      // UniqeUrlString: "1", //?
      // Image:
      //   "https://classapi.sepehracademy.ir/\\Pictures\\Course\\1718693266020_623b79fa-bde6-4186-885c-59aa129809cf.jpg",
      // StartTime: "2024-11-17T00:00:00",
      // EndTime: "2024-11-19T00:00:00",
      // GoogleSchema: "تستستستستستستستستستستستستستس", //?
      // GoogleTitle: "تستستستستستستستستستستستستستستس", //?
      // CoursePrerequisiteId: "b503e37c-3f21-ef11-b6c7-cc06a3e06235", //? course id mishe
      // TumbImageAddress:
      //   "https://classapi.sepehracademy.ir/\\Pictures\\Course\\1718693266020_623b79fa-bde6-4186-885c-59aa129809cf.jpg", //my custom
      // ImageAddress:
      //   "https://classapi.sepehracademy.ir/\\Pictures\\Course\\1718693266020_623b79fa-bde6-4186-885c-59aa129809cf.jpg", //my custom
      // ShortLink: "1", //?
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
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
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={4} xs={12}>
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
              {/* Describe */}
              <Col md={4} xs={12}>
                <Label className="form-label" for="Describe">
                  توضیحات دوره{" "}
                </Label>

                <Input
                  id="Describe"
                  name="Describe"
                  placeholder="متن دوره را وارد کنید"
                  {...formik?.getFieldProps("Describe")}
                />
              </Col>
              {/* MiniDescribe */}
              <Col md={4} xs={12}>
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
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <StateManagedSelect
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
                {/* <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button> */}
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalCustom;
