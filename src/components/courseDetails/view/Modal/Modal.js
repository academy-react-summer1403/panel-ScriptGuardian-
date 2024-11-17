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
      MiniDescribe: "", //?
      Capacity: "", //?
      CourseTypeId: "", //?
      SessionNumber: "", //?
      CurrentCoursePaymentNumber: "", //?
      TremId: "", //?
      ClassId: "", //?
      CourseLvlId: "", //?
      TeacherId: data?.teacherId ?? "",
      Cost: data?.cost ?? "",
      UniqeUrlString: "", //?
      Image: data?.imageAddress ?? "",
      StartTime: data?.startTime ?? "",
      EndTime: data?.endTime ?? "",
      GoogleSchema: "", //?
      GoogleTitle: "", //?
      CoursePrerequisiteId: "", //?
      TumbImageAddress: "", //?
      ImageAddress: data?.imageAddress ?? "", //??
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values, {
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
