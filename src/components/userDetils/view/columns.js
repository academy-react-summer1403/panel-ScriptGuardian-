// ** React Imports
import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  MoreVertical,
  Archive,
  Trash2,
} from "react-feather";

import default_image from "../../../images/default_image.png";
import { useAcceptCourseReserve } from "../../../core/services/api/Admin/handelreserve";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** Table columns
export const columns = [
  {
    name: "نام دوره",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <Avatar
            img={
              row?.tumbImageAddress && row?.tumbImageAddress !== "Not-set"
                ? row?.tumbImageAddress
                : default_image
            }
          />

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
    minWidth: "200px",
    name: "تاریخ رزرو",
    cell: (row) => row.reserverDate,
  },
  {
    name: "وضعیت پذیرش ",
    sortable: true,
    minWidth: "150px",
    sortField: "userRoles",
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.accept ? "light-primary" : "light-danger"}
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
      const queryClient = useQueryClient();

      const { mutate: Accept } = useAcceptCourseReserve();
      const handelAccept = (value) => {
        Accept(value.reserveId, value.courseId, value.studentId, {
          onSuccess: (data) => {
            if (data.success == true) {
              toast.success("با موفقیت رزرو پذیرفته شد");
              queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
            } else {
              toast.error("    خطا در رزرو");
            }
          },
        });
      };
      return (
        <>
          {row.accept ? (
            <p className="text-success">پذیرفته شده</p>
          ) : (
            <Button
              onClick={() => {
                handelAccept(row);
              }}
            >
              پذیرفتن
            </Button>
          )}
        </>
      );
    },
  },
];

export const columns2 = [
  {
    name: "عنوان دوره",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <Avatar
            img={
              row?.tumbImageAddress && row?.tumbImageAddress !== "Not-set"
                ? row?.tumbImageAddress
                : default_image
            }
          />

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
    name: "توضیحات دوره",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span
              className="d-block fw-bold text-truncate"
              title={row?.describe} // تولتیپ برای نمایش متن کامل
            >
              {row.describe.length > 20
                ? row.describe.slice(0, 20) + "..."
                : row.describe}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "تاریخ رزرو",
    cell: (row) => row.lastUpdate,
  },
  // {
  //   name: "وضعیت پذیرش ",
  //   sortable: true,
  //   minWidth: "150px",
  //   sortField: "userRoles",
  //   selector: (row) => row.isActive,
  //   cell: (row) => {
  //     return (
  //       <>
  //         {" "}
  //         <h5 className="text-truncate text-muted mb-0">
  //           <Badge
  //             pill
  //             color={row.accept ? "light-primary" : "light-danger"}
  //             className="me-1"
  //           >
  //             {row.accept ? "پذیرفته شده" : "پذیرفته نشده"}
  //           </Badge>
  //         </h5>
  //       </>
  //     );
  //   },
  // },
  // {
  //   name: "اقدامات",
  //   minWidth: "100px",

  //   cell: (row) => {
  //     const queryClient = useQueryClient();

  //     const { mutate: Accept } = useAcceptCourseReserve();
  //     const handelAccept = (value) => {
  //       Accept(value.reserveId, value.courseId, value.studentId, {
  //         onSuccess: (data) => {
  //           if (data.success == true) {
  //             toast.success("با موفقیت رزرو پذیرفته شد");
  //             queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
  //           } else {
  //             toast.error("    خطا در رزرو");
  //           }
  //         },
  //       });
  //     };
  //     return (
  //       <>
  //         {row.accept ? (
  //           <p className="text-success">پذیرفته شده</p>
  //         ) : (
  //           <Button
  //             onClick={() => {
  //               handelAccept(row);
  //             }}
  //           >
  //             پذیرفتن
  //           </Button>
  //         )}
  //       </>
  //     );
  //   },
  // },
];
