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
import {
  Check,
  Briefcase,
  X,
  Heart,
  ThumbsDown,
  ThumbsUp,
  Eye,
  MessageCircle,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import ModalCustom from "./modal/ModalCustom";
const MySwal = withReactContent(Swal);
// const UserInfoCard = ({ selectedUser }) => {

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  useActiveCourse,
  useActiveNews,
} from "../../../core/services/api/Admin/handelreserve";

const UserInfoCard = ({ data, ID }) => {
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
      data?.currentImageAddress && data?.currentImageAddress !== "Not-set"
        ? data?.currentImageAddress
        : false
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={data?.currentImageAddress}
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
          content={data?.title ? data?.title : ""}
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

  const queryClient = useQueryClient();

  const { mutate: ChangeActivity } = useActiveNews();

  const ActiveCourse = () => {
    const formData = new FormData();
    formData.append("Id", ID);
    formData.append("Active", true);
    ChangeActivity(
      formData,

      {
        onSuccess: (data) => {
          if (data.success === true) {
            queryClient.invalidateQueries("GetAllNewsDetailsAdmin");
            toast.success("خبر با موفقیت فعال شد");
          }
        },
      }
    );
  };

  const DeActiveCourse = () => {
    const formData = new FormData();
    formData.append("Id", ID);
    formData.append("Active", false);
    ChangeActivity(
      formData,

      {
        onSuccess: (data) => {
          if (data.success === true) {
            queryClient.invalidateQueries("GetAllNewsDetailsAdmin");
            toast.success("خبر با موفقیت غیر فعال شد");
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
                  <h4>{data?.title ? data?.title : ""}</h4>

                  <Badge color={"blue"} className="text-capitalize"></Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <ThumbsUp className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.currentLikeCount}</h4>
                <small> تعداد لایک </small>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <ThumbsDown className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.currentDissLikeCount}</h4>
                <small> تعداد دیس لایک</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start ">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.currentView}</h4>
                <small> تعداد بازدید </small>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageCircle className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.commentsCount}</h4>
                <small> تعداد کامنت</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام نویسنده:</span>
                <span>
                  {data?.addUserFullName ? data?.addUserFullName : ""}{" "}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> وضعیت:</span>
                <span
                  className={`${data?.active ? "text-success" : "text-danger"}`}
                >
                  {data?.active ? "فعال" : "غیرفعال"}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> نام گروه:</span>
                <span>
                  {data?.newsCatregoryName ? data?.newsCatregoryName : ""}{" "}
                </span>
              </li>
              <li className="mb-75">
                <span
                  className="fw-bolder me-25"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {" "}
                  توضیحات خبر:
                </span>
                <span>{data?.describe ? data?.describe : ""} </span>
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
                // onClick={handleSuspendedClick}
                onClick={() => {
                  DeActiveCourse();
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
                  ActiveCourse();
                }}
              >
                فعال کردن
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <ModalCustom show={show} setShow={setShow} data={data} />
    </Fragment>
  );
};

export default UserInfoCard;
