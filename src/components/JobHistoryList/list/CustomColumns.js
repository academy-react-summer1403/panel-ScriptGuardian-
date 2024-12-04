import Avatar from "@components/avatar";
import default_image from "../../../images/default_image.png";
import NoProfile from "../../../images/profile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  X,
} from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import { useActiveCourse } from "../../../core/services/api/Admin/handelreserve";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام کمپانی",
    minWidth: "150px",
    sortable: (row) => row.companyName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.companyName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "عنوان کار",
    minWidth: "150px",
    sortable: (row) => row.jobTitle,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.jobTitle}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "درباره کار",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.aboutJob,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.aboutJob}
          </span>
        </>
      );
    },
  },
  {
    name: "وبسایت",
    minWidth: "150px",
    sortable: (row) => row.companyWebSite,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.companyWebSite}</span>
          </div>
        </div>
      );
    },
  },

  {
    name: "لینکدین",
    minWidth: "150px",
    sortable: (row) => row.companyLinkdin,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.companyLinkdin}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تاریخ شروع",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.workStartDate,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {" "}
            {row?.workStartDate ? convertIsoToJalali(row?.workStartDate) : ""}
          </h5>
        </>
      );
    },
  },
  {
    name: "تاریخ پایان",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.workEndDate,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {" "}
            {row?.workEndDate ? convertIsoToJalali(row?.workEndDate) : ""}
          </h5>
        </>
      );
    },
  },

  {
    name: "اقدامات",
    minWidth: "100px",

    cell: (row) => {
      const queryClient = useQueryClient();
      const navigate = useNavigate();

      const { mutate: ChangeActivity } = useActiveCourse();

      const ActiveCourse = (id) => {
        ChangeActivity(
          { active: true, id },

          {
            onSuccess: (data) => {
              if (data.success === true) {
                queryClient.invalidateQueries("GetAllCourses");
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
                queryClient.invalidateQueries("GetAllCourses");
                toast.success("دوره با موفقیت غیر فعال شد");
              }
            },
          }
        );
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {row?.isActive ? (
                <>
                  <DropdownItem
                    onClick={() => {
                      DeActiveCourse(row?.courseId);
                    }}
                    lassName="w-100"
                  >
                    <X size={14} className="me-50" />
                    <span className="align-middle"> غیر فعال کردن دوره </span>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    className="w-100"
                    onClick={() => {
                      ActiveCourse(row?.courseId);
                    }}
                  >
                    <Check size={14} className="me-50" />
                    <span className="align-middle">فعال کردن دوره</span>
                  </DropdownItem>
                </>
              )}

              <DropdownItem
                className="w-100"
                onClick={() => {
                  navigate(`/CourseListPage/${row.courseId}`);
                }}
              >
                <ExternalLink size={14} className="me-50" />
                <span className="align-middle">جزییات دوره</span>
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
