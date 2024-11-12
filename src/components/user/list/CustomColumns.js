import Avatar from "@components/avatar";
import NoProfile from "../../../images/profile.png";
import { Link } from "react-router-dom";
import {
  Archive,
  Database,
  Edit2,
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
  UncontrolledDropdown,
} from "reactstrap";

export const CustomColumns = [
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
              to={`/users/${row.id}`}
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
              color={row.active ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.active ? "فعال" : "غیرفعال"}
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
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem
                tag={Link}
                className="w-100"
                to={`${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات کاربر</span>
              </DropdownItem> */}
              <DropdownItem
                tag="a"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   dispatch(dispatch(toggleEditSidebar));
                //   setData2(row);
                // }}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">ویرایش کاربر</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   // const params = {}
                //   // store.dispatch(deleteUser(row.id));
                //   deleteUserFn.mutate(
                //     row.id
                //     // {
                //     //   onSuccess:()=> {useQueryClient(queryClient)}
                //     // }
                //   );
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف کاربر</span>
              </DropdownItem>
              <DropdownItem size="sm">
                <Archive size={14} className="me-50" />
                <span className="align-middle">دسترسی</span>
              </DropdownItem>
              {/* <UserAddRole
              // modal={modal}
              // id={row.id}
              // userName={row.fname + " " + row.lname}
              // toggleModal={toggleModal}
              // userRoles={row.role}
              // refetch={refetch}
              /> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
