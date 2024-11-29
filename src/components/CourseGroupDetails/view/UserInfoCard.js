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
  NavLink,
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

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg(data)}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{data?.groupName ? data?.groupName : ""}</h4>
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
                <h4 className="mb-0">{data?.courseCapacity}</h4>
                <small> ظرفیت دوره</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <User className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.groupCapacity}</h4>
                <small>ظرفیت گروه</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> استاد:</span>
                <span>
                  {data?.teacherName
                    ? data?.teacherName
                    : "هنوز استادی این گروه را انتخاب نکرده است "}{" "}
                </span>
              </li>

              <NavLink to={`/CourseList/${data?.courseId}`} className="mb-75">
                <span className="fw-bolder me-25"> نام دوره ی گروه:</span>
                <span>{data?.courseName ? data?.courseName : ""} </span>
              </NavLink>
              {/* <li className="mb-75">
                <span className="fw-bolder me-25"> وضعیت:</span>
                <span>
                  {data?.isActive ? (
                    <span className="text-success">فعال</span>
                  ) : (
                    <span className="text-danger">غیرفعال</span>
                  )}
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
              </li> */}
            </ul>
          </div>
          {/* <div className="d-flex justify-content-center pt-2">
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
                  DeActiveCourse(data?.courseId);
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
                  ActiveCourse(data?.courseId);
                }}
              >
                فعال کردن
              </Button>
            )}
          </div> */}
        </CardBody>
      </Card>
      <ModalCustom setShow={setShow} show={show} data={data} />
    </Fragment>
  );
};

export default UserInfoCard;
