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
import { Check, Briefcase, X, DollarSign, User } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";
import { useActiveCourse } from "../../../core/services/api/Admin/handelreserve";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import ModalCustom from "./Modal/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const MySwal = withReactContent(Swal);
// const UserInfoCard = ({ selectedUser }) => {

const UserInfoCard = ({ data }) => {
  // ** State
  const [show, setShow] = useState(false);
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
      data?.imageAddress && data?.imageAddress !== "Not-set"
        ? data?.imageAddress
        : false
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={data?.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
          style={{ width: "100%" }}
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

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
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

  const queryClient = useQueryClient();

  const { mutate: ChangeActivity } = useActiveCourse();

  const ActiveCourse = (id) => {
    ChangeActivity(
      { active: true, id },

      {
        onSuccess: (data) => {
          if (data.success === true) {
            queryClient.invalidateQueries("GetAllCourseDetailsAdmin");
            toast.success("دوره با موفق فعال شد");
          }
        },
      }
    );
  };

  const DeActiveCourse = (id) => {
    ChangeActivity(
      { active: false, id },

      {
        onSuccess: (data) => {
          if (data.success === true) {
            queryClient.invalidateQueries("GetAllCourseDetailsAdmin");
            toast.success("دوره با موفقیت غیر فعال شد");
          }
        },
      }
    );
  };

  const handleSuspendedClick = (id) => {
    return MySwal.fire({
      title: "آیا مطمئنید که می خواهید دوره رو غیرفعال کنید",
      text: "البته یک عمل قابل بازگشت است",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        DeActiveCourse(id);
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز بود",
          text: "دوره با موفقیت غیرفعال شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const handleSuspendedClick2 = (id) => {
    return MySwal.fire({
      title: "آیا مطمئنید که می خواهید دوره رو فعال کنید",
      text: "البته یک عمل قابل بازگشت است",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        ActiveCourse(id);
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز بود",
          text: "دوره با موفقیت فعال شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg(data)}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{data?.title ? data?.title : ""}</h4>
                  {/* 
                  <Badge color={"blue"} className="text-capitalize">
                    رولللل
                  </Badge> */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <DollarSign className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.cost}</h4>
                <small> قیمت </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <User className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.courseUserTotal}</h4>
                <small>تعداد دانشجو</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> استاد:</span>
                <NavLink to={`/UsersPage/${data?.teacherId}`}>
                  {data?.teacherName ? data?.teacherName : ""}{" "}
                </NavLink>
              </li>

              {/* <li className="mb-75">
                <span className="fw-bolder me-25"> سطح دوره:</span>
                <span>
                  {data?.courseLevelName ? data?.courseLevelName : ""}{" "}
                </span>
              </li> */}
              <li className="mb-75">
                <span className="fw-bolder me-25"> وضعیت:</span>
                <span>
                  {data?.isActive ? (
                    <Badge color="success">فعال</Badge>
                  ) : (
                    <Badge color="danger">غیرفعال</Badge>
                  )}
                </span>
              </li>

              <li className="mb-75">
                <span className="fw-bolder me-25"> زمان ساخت:</span>
                <span>
                  <strong>
                    {data?.insertDate && convertIsoToJalali(data?.insertDate)}
                  </strong>{" "}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> زمان شروع:</span>
                <span>
                  <strong>
                    {data?.startTime && convertIsoToJalali(data?.startTime)}
                  </strong>{" "}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> زمان پایان:</span>
                <strong>
                  {data?.endTime && convertIsoToJalali(data?.endTime)}
                </strong>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            {data?.isActive ? (
              <Button
                className="ms-1"
                color="danger"
                outline
                // onClick={handleSuspendedClick}
                onClick={() => {
                  // DeActiveCourse(data?.courseId);
                  handleSuspendedClick(data?.courseId);
                }}
              >
                غیرفعال کردن
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="success"
                outline
                // onClick={handleSuspendedClick}
                onClick={() => {
                  // ActiveCourse(data?.courseId);
                  handleSuspendedClick2(data?.courseId);
                }}
              >
                فعال کردن
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
