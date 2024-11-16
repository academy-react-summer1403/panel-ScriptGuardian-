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
import { useUpdateUser } from "../../../../core/services/api/Admin/handelChangeProfileUser";

const ModalCustom = ({ show, setShow, data }) => {
  const countryOptions = [
    { value: "uk", label: "UK" },
    { value: "usa", label: "USA" },
    { value: "france", label: "France" },
    { value: "russia", label: "Russia" },
    { value: "canada", label: "Canada" },
  ];

  const { mutate: UpdateProfile } = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      id: data?.id ? data?.id : "",
      fName: data?.fName ? data?.fName : "",
      lName: data?.lName ? data?.lName : "",
      userName: data?.userName ? data?.userName : "",
      gmail: data?.gmail ? data?.gmail : "",
      phoneNumber: data?.phoneNumber ? data?.phoneNumber : "",
      active: data?.active,
      isDelete: data?.isDelete,
      isTecher: data?.isTecher,
      isStudent: data?.isStudent,
      recoveryEmail: data?.recoveryEmail ? data?.recoveryEmail : "",
      twoStepAuth: data?.twoStepAuth,
      userAbout: data?.userAbout ? data?.userAbout : "",
      currentPictureAddress: data?.currentPictureAddress
        ? data?.currentPictureAddress
        : "",
      linkdinProfile: data?.linkdinProfile ? data?.linkdinProfile : "",
      telegramLink: data?.telegramLink ? data?.telegramLink : "",
      receiveMessageEvent: data?.receiveMessageEvent,
      homeAdderess: data?.homeAdderess ? data?.homeAdderess : "",
      nationalCode: data?.nationalCode ? data?.nationalCode : "",
      gender: data?.gender,
      latitude: data?.latitude ? data?.latitude : "51.3890",
      longitude: data?.latitude ? data?.latitude : "35.6892",
      insertDate: data?.insertDate ? data?.insertDate : "",
      birthDay: data?.birthDay ? data?.birthDay : "",
      roles:
        data?.roles?.map((role) => ({
          id: role.id || "",
          roleName: role.roleName || "",
          roleParentName: role.roleParentName || "",
        })) || [],
      courses:
        data?.courses?.map((course) => ({
          title: course.title || "",
          describe: course.describe || "",
          tumbImageAddress: course.tumbImageAddress || "",
          lastUpdate: course.lastUpdate || "",
          courseId: course.courseId || "",
        })) || [],
      coursesReseves:
        data?.coursesReseves?.map((reserve) => ({
          reserveId: reserve.reserveId || "",
          courseId: reserve.courseId || "",
          courseName: reserve.courseName || "",
          studentId: reserve.studentId || "",
          studentName: reserve.studentName || "",
          reserverDate: reserve.reserverDate || "",
          accept: reserve.accept || "",
        })) || [],
      userProfileId: data?.userProfileId ? data?.userProfileId : undefined,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values);
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
            <h1 className="mb-1">تغییر اطلاعات کاربر </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="fName">
                  نام کاربری{" "}
                </Label>

                <Input
                  id="fName"
                  name="fName"
                  placeholder="نام کاربری را وارد کنید"
                  {...formik?.getFieldProps("fName")}
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
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
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
