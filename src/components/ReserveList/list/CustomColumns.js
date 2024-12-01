import Avatar from "@components/avatar";
import default_image from "../../../images/default_image.png";
import NoProfile from "../../../images/profile.png";
import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  Check,
  Database,
  Edit2,
  ExternalLink,
  MoreVertical,
  Settings,
  Slack,
  Trash2,
  User,
  UserMinus,
} from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import CustomModal from "./modal/modal";
import { useState } from "react";
import {
  useGetAllCourseDetailsAdmin,
  useGetAllCourseDetailsAdminForReserve,
} from "../../../core/services/api/Admin/handelUsers";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
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
                <span className="align-middle" onClick={toggleSidebar2}>
                  ویرایش کاربر
                </span>
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

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  // {
  //   name: " دوره عنوان",
  //   sortable: true,
  //   minWidth: "172px",
  //   sortField: "title",
  //   selector: (row) => row.title,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex justify-content-left align-items-center">
  //         <Avatar
  //           className="me-1"
  //           img={
  //             row.pictureAddress &&
  //             row.pictureAddress != null &&
  //             row.pictureAddress !== "Not-set"
  //               ? row.pictureAddress
  //               : NoProfile
  //           }
  //           width="32"
  //           height="32"
  //         />
  //         <div className="d-flex flex-column">
  //           <Link
  //             to={`/users/${row.id}`}
  //             className="user_name text-truncate text-body"
  //             // onClick={() => store.dispatch(getUser(row.id))}
  //           >
  //             <span className="fw-bolder">
  //               {row.title} {row.lname}
  //             </span>
  //           </Link>
  //           <small className="text-truncate text-muted mb-0">{row.gmail}</small>
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    name: "عنوان دوره",
    minWidth: "250px",
    sortable: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          {row.avatar === "" ? (
            <Avatar color={`light`} content={row.full_name} initials />
          ) : (
            <Avatar
              img={
                row?.tumbImageAddress && row?.tumbImageAddress !== "Not-set"
                  ? row?.tumbImageAddress
                  : default_image
              }
            />
          )}
          <div className="user-info text-truncate ms-1">
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/CourseListPage/${row.courseId}`}
            >
              {row.title}
            </NavLink>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام استاد",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.fullName,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.fullName}
          </span>
        </>
      );
    },
  },

  {
    name: "قیمت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.cost,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">{row.cost}</h5>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.isActive ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.isActive ? "فعال" : "غیرفعال"}
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
                <span className="align-middle" onClick={toggleSidebar2}>
                  ویرایش کاربر
                </span>
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

export const CustomColumnsForListReserve = (toggleSidebar2) => [
  {
    name: "نام دوره",
    minWidth: "250px",
    sortable: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/CourseListPage/${row.courseId}`}
            >
              {row.courseName}
            </NavLink>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام دانشجو",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <>
          <NavLink
            to={`/UsersPage/${row?.studentId}`}
            className="text-truncate text-capitalize align-middle"
          >
            {row.studentName}
          </NavLink>
        </>
      );
    },
  },

  {
    name: "زمان رزرو ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.reserverDate,

    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {row?.reserverDate && convertIsoToJalali(row.reserverDate)}
          </h5>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.accept ? "light-success" : "light-danger"}
              className="me-1"
            >
              {row.accept ? "پذیرفته شده" : "پذیرفته نشده"}
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
      const [isOpenModal, setIsOpenModal] = useState(false);
      const {
        data: CourseDetails,
        refetch,
        isFetching,
      } = useGetAllCourseDetailsAdminForReserve(row?.courseId);

      const toggleAcceptModal = () => {
        setIsOpenModal(!isOpenModal);
        refetch();
      };

      return (
        <>
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                {row.accept ? (
                  ""
                ) : (
                  <DropdownItem
                    tag="a"
                    className="w-100"
                    onClick={toggleAcceptModal}
                  >
                    <Check size={14} className="me-50" />
                    <span className="align-middle"> موافقت </span>
                  </DropdownItem>
                )}

                <DropdownItem
                  tag="a"
                  href={`/CourseListPage/${row.courseId}`}
                  className="w-100"
                >
                  <ExternalLink size={14} className="me-50" />
                  <span className="align-middle"> جزییات دوره</span>
                </DropdownItem>
                <DropdownItem size="sm" href={`/UsersPage/${row.studentId}`}>
                  <User size={14} className="me-50" />
                  <span className="align-middle">جزییات کاربر</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <CustomModal
            isOpenModal={isOpenModal}
            toggleAcceptModal={toggleAcceptModal}
            setIsOpenModal={setIsOpenModal}
            teacherId={CourseDetails?.teacherId}
            courseId={CourseDetails?.courseId}
            studentId={row?.studentId}
          />
        </>
      );
    },
  },
];
