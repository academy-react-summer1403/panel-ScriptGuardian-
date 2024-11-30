// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import ModalCustom from "./Modal/Modal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useUpdateUser } from "../../../core/services/api/Admin/handelChangeProfileUser";
import { useQueryClient } from "@tanstack/react-query";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);
// const UserInfoCard = ({ selectedUser }) => {

const UserInfoCard = ({ data }) => {
  // ** State
  console.log(data, "this is best data");
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: data?.userName,
      lastName: data?.lName,
      firstName: data?.fName,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (
      data?.currentPictureAddress && data?.currentPictureAddress !== "Not-set"
        ? data?.currentPictureAddress
        : false
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={data?.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={data?.fName ? data?.fName : ""}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  //API
  const queryClient = useQueryClient();

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
            // toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetStudentProfile");
            queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
            queryClient.invalidateQueries("GetAllUsers");
          }
        },
      });
    },
  });

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "آیا مطمعنید که میخاهید کاربر رو غیرفعال کنید",
      text: "البته یک عمل قابل بازگشت است",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "یله",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      formik.setFieldValue("active", false);
      formik.submitForm();
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز بود",
          text: "کاربر با موفقیت غیرفعال شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
      // else if (result.dismiss === MySwal.DismissReason.cancel) {
      //   MySwal.fire({
      //     title: "Cancelled",
      //     text: "Cancelled Suspension :)",
      //     icon: "error",
      //     customClass: {
      //       confirmButton: "btn btn-success",
      //     },
      //   });
      // }
    });
  };

  const handleSuspendedClick2 = () => {
    return MySwal.fire({
      title: "آیا مطمعنید که میخاهید کاربر رو فعال کنید",
      text: "البته یک عمل قابل بازگشت است",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "یله",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      formik.setFieldValue("active", true);
      formik.submitForm();
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز بود",
          text: "کاربر با موفقیت فعال شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  //Modal

  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg(data)}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  {/* <h4>
                    {selectedUser !== null
                      ? selectedUser.fullName
                      : "Eleanor Aguilar"}
                  </h4> */}
                  <h4>
                    {data?.fName ? data?.fName : ""}{" "}
                    {data?.lName ? data?.lName : ""}
                  </h4>
                  {/* {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.role]}
                      className="text-capitalize"
                    >
                      {selectedUser.role}
                    </Badge>
                  ) : null} */}

                  {/* <Badge color={"blue"} className="text-capitalize">
                    رولللل
                  </Badge> */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data && data?.courses.length}</h4>
                <small>دوره ها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data && data?.coursesReseves.length}</h4>
                <small>رزرو شده</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام کاربری :</span>
                <span>{data?.userName ? data?.userName : ""} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام :</span>
                <span>{data?.fName ? data?.fName : ""} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام خانوادگی:</span>
                <span>{data?.lName ? data?.lName : ""}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">ایمیل</span>
                <span>{data?.gmail ? data?.gmail : ""}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">وضعیت:</span>

                {data?.active ? (
                  <span className="text-success">فعال</span>
                ) : (
                  <span className="text-danger"> غیرفعال</span>
                )}
              </li>
              <li className="mb-75">
                <span
                  className="fw-bolder me-25"
                  style={{ whiteSpace: "nowrap" }}
                >
                  رول ها:
                </span>
                {Array.isArray(data?.roles) && data.roles.length > 0 ? (
                  data.roles.map((role) => (
                    <span
                      className={`me-1 ${
                        role?.roleName == "Student" ? "text-success" : ""
                      }  ${role?.roleName == "Teacher" ? "text-warning" : ""} `}
                      key={role?.roleName}
                    >
                      {role?.roleName || ""}
                    </span>
                  ))
                ) : (
                  <span>student</span>
                )}
              </li>

              <li className="mb-75">
                <span className="fw-bolder me-25"> آدرس :</span>
                <span>{data?.homeAdderess ? data?.homeAdderess : ""} </span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>

            {data?.active ? (
              <Button
                className="ms-1"
                color="danger"
                outline
                onClick={handleSuspendedClick}
              >
                غیرفعال کردن
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="success"
                outline
                onClick={handleSuspendedClick2}
              >
                فعال کردن{" "}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <ModalCustom setShow={setShow} show={show} data={data} />
    </Fragment>
  );
};

export default UserInfoCard;
