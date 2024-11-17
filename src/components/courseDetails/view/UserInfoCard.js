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

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import ModalCustom from "./Modal/Modal";

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

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
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

  // const renderUserImg = (data) => {
  //   return (
  //     <Avatar
  //       initials
  //       color={"light-primary"}
  //       className="rounded mt-3 mb-2"
  //       content={data?.fName ? data?.fName : ""}
  //       contentStyles={{
  //         borderRadius: 0,
  //         fontSize: "calc(48px)",
  //         width: "100%",
  //         height: "100%",
  //       }}
  //       style={{
  //         height: "110px",
  //         width: "110px",
  //       }}
  //     />
  //   );
  // };

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

  const handleReset = () => {
    reset({
      username: "amir",
      lastName: "hosseni",
      firstName: "amir",
    });
  };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
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
                  {/* <h4>
                    {selectedUser !== null
                      ? selectedUser.fullName
                      : "Eleanor Aguilar"}
                  </h4> */}
                  <h4>{data?.title ? data?.title : ""}</h4>
                  {/* {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.role]}
                      className="text-capitalize"
                    >
                      {selectedUser.role}
                    </Badge>
                  ) : null} */}

                  <Badge color={"blue"} className="text-capitalize">
                    رولللل
                  </Badge>
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
                <span>{data?.teacherName ? data?.teacherName : ""} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> وضعیت:</span>
                <span>
                  {data?.courseStatusName ? data?.courseStatusName : ""}{" "}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> زمان شروع:</span>
                <span>{data?.startTime ? data?.startTime : ""} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> زمان شروع:</span>
                <span>{data?.endTime ? data?.endTime : ""} </span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              Suspended
            </Button>
          </div>
        </CardBody>
      </Card>
      <ModalCustom setShow={setShow} show={show} data={data} />
    </Fragment>
  );
};

export default UserInfoCard;
