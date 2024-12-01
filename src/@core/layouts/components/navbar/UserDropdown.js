// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import {
  getItem,
  removeItem,
} from "../../../../core/services/storage/storage.services";
import { useGetStudentProfile } from "../../../../core/services/api/Panel/GetProfile";

import NoProfile from "../../../../images/profile.png";

const UserDropdown = () => {
  const navigate = useNavigate();

  const handelLogOut = () => {
    removeItem("token");
    removeItem("id");
    removeItem("roles");
    navigate("/login");
  };

  const { data: Information } = useGetStudentProfile();
  const userId = getItem("id");
  const handelGoToUserDetails = () => {
    navigate(`UsersPage/${userId}`);
  };
  const Roles = getItem("roles");
  console.log(Roles, "Roles");
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      {/* TODO */}
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {Information?.fName} {Information?.lName}
          </span>
          <span className="user-status">
            {Roles.includes("Administrator") && Roles.includes("Teacher")
              ? "ادمین و استاد"
              : Roles.includes("Administrator")
              ? "ادمین"
              : Roles.includes("Teacher")
              ? "استاد"
              : ""}
          </span>
        </div>
        <Avatar
          img={
            Information?.currentPictureAddress &&
            Information?.currentPictureAddress !== "Not-set"
              ? Information?.currentPictureAddress
              : NoProfile
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to="/"
          onClick={(e) => {
            e.preventDefault();
            handelGoToUserDetails();
          }}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل</span>
        </DropdownItem>
        <DropdownItem onClick={handelLogOut}>
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
