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
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import CustomSpinner from "../../../common/animation/CustomSpiner";

const ModalCustom = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const countryOptions = [
    { value: "uk", label: "UK" },
    { value: "usa", label: "USA" },
    { value: "france", label: "France" },
    { value: "russia", label: "Russia" },
    { value: "canada", label: "Canada" },
  ];

  const { mutate: UpdateProfile, isPending } = useUpdateUser();

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
          accept: reserve.accept,
        })) || [],
      userProfileId: data?.userProfileId ? data?.userProfileId : undefined,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetStudentProfile");
            queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
            queryClient.invalidateQueries("GetAllUsers");
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
            <h1 className="mb-1">تغییر اطلاعات کاربر </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="fName">
                  نام{" "}
                </Label>

                <Input
                  id="fName"
                  name="fName"
                  placeholder="نام کاربری را وارد کنید"
                  {...formik?.getFieldProps("fName")}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="lName">
                  نام خانوادگی{" "}
                </Label>

                <Input
                  id="lName"
                  name="lName"
                  placeholder="نام خانوادگی را وارد کنید"
                  {...formik?.getFieldProps("lName")}
                />
              </Col>

              {/* <Col md={6} xs={12}>
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
              </Col> */}
              {/* <Col xs={12}>
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
              </Col> */}
            </Row>

            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="gmail">
                  ایمیل کاربر{" "}
                </Label>

                <Input
                  id="gmail"
                  name="gmail"
                  placeholder="ایمیل  کاربر را وارد کنید"
                  {...formik?.getFieldProps("gmail")}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="userAbout">
                  درباره کاربر{" "}
                </Label>

                <Input
                  id="fName"
                  name="fName"
                  placeholder=" اطلاعات درباره کاربر را وارد کنید"
                  {...formik?.getFieldProps("userAbout")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="telegramLink">
                  آدرس تلگرام{" "}
                </Label>

                <Input
                  id="telegramLink"
                  name="telegramLink"
                  placeholder=" اطلاعات درباره آدرس تلگرام را وارد کنید"
                  {...formik?.getFieldProps("telegramLink")}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="linkdinProfile">
                  ادرس لینکدین{" "}
                </Label>

                <Input
                  id="linkdinProfile"
                  name="linkdinProfile"
                  placeholder=" آدرس لینکدین  کاربر را وارد کنید"
                  {...formik?.getFieldProps("linkdinProfile")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="userName">
                  نام کاربری{" "}
                </Label>

                <Input
                  id="userName"
                  name="userName"
                  placeholder=" اطلاعات درباره نام کاربری  را وارد کنید"
                  {...formik?.getFieldProps("userName")}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phoneNumber">
                  شماره تلفن{" "}
                </Label>

                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder=" شماره تلفن   کاربر را وارد کنید"
                  {...formik?.getFieldProps("phoneNumber")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              <Col xs={12} className="text-center mt-2 pt-50">
                {isPending ? (
                  <Button
                    type="submit"
                    className="me-1"
                    color="primary"
                    style={{ width: "74px" }}
                  >
                    <CustomSpinner size={16} />
                  </Button>
                ) : (
                  <Button type="submit" className="me-1" color="primary">
                    ارسال{" "}
                  </Button>
                )}
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalCustom;
