import Avatar from "@components/avatar";
import NoProfile from "../../../images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Archive,
  Database,
  Edit2,
  ExternalLink,
  MoreVertical,
  Settings,
  Slack,
  Trash2,
  User,
} from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

export const CustomColumns = (toggleSidebar2) => [
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "172px",
    sortField: "gmail",
    selector: (row) => row.gmail,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar
            className="me-1"
            img={
              row.pictureAddress &&
              row.pictureAddress != null &&
              row.pictureAddress !== "Not-set"
                ? row.pictureAddress
                : NoProfile
            }
            width="32"
            height="32"
          />
          <div className="d-flex flex-column">
            <Link
              to={`/UsersPage/${row.id}`}
              className="user_name text-truncate text-body"
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">
                {row.fname} {row.lname}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.gmail}</small>
          </div>
        </div>
      );
    },
  },

  {
    name: "نقش کاربر",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.userRoles,
    cell: (row) => {
      const roleObj = {
        Administrator: {
          class: "text-success",
          icon: Database,
        },
        Student: {
          class: "text-primary",
          icon: User,
        },
        Teacher: {
          class: "text-info",
          icon: Edit2,
        },
        author: {
          class: "text-warning",
          icon: Settings,
        },
        admin: {
          class: "text-danger",
          icon: Slack,
        },
      };
      const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            <Icon
              size={18}
              className={`${
                roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""
              } me-50`}
            />
            {row.userRoles
              ? row.userRoles.length > 20
                ? row.userRoles.slice(0, 20) + "..."
                : row.userRoles
              : "Student"}
          </span>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.active,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.active === "True" ? "light-success" : "light-danger"}
              className="me-1"
            >
              {row.active === "True" ? "فعال" : "غیرفعال"}
            </Badge>
          </h5>
        </>
      );
    },
  },
  {
    name: "اقدامات",
    minWidth: "100px",

    cell: (row) => {
      const navigate = useNavigate();
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="w-100"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => navigate(`/UsersPage/${row?.id}`)}
              >
                <ExternalLink size={14} className="me-50" />

                <span> جزییات کاربر</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
