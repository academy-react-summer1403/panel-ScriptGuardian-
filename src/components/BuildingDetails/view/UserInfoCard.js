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
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import { NavLink } from "react-router-dom";

const UserInfoCard = ({ data, ID }) => {
  // ** State
  const [show, setShow] = useState(false);
  const handelShow = () => {
    setShow(!show);
  };
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

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg(data)}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{data?.buildingName ? data?.buildingName : ""}</h4>

                  <Badge color={"blue"} className="text-capitalize"></Badge>
                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25"> تعداد طبقه :</span>
                <span>{data?.floor ? data?.floor : ""} </span>
              </li>

              <li className="mb-75">
                <span className="fw-bolder me-25"> وضعیت:</span>
                <Badge color={`${data?.active ? "success" : "danger"}`}>
                  {data?.active ? "فعال" : "غیرفعال"}
                </Badge>
              </li>

              <li className="mb-75">
                <span className="fw-bolder me-25"> تاریخ کار:</span>
                <span>
                  {data?.workDate ? convertIsoToJalali(data?.workDate) : ""}{" "}
                </span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={handelShow}>
              ویرایش
            </Button>
          </div>
        </CardBody>
      </Card>
      <ModalCustom show={show} setShow={setShow} data={data} ID={ID} />
    </Fragment>
  );
};

export default UserInfoCard;
