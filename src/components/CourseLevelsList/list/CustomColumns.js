import Avatar from "@components/avatar";
import default_image from "../../../images/default_image.png";
import NoProfile from "../../../images/profile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Archive,
  Check,
  Database,
  Edit,
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
import { useState } from "react";
import ModalEditClass from "./modal/ModalEditClass";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام سطح",
    minWidth: "550px",
    sortable: (row) => row.classRoomName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.levelName}</span>
          </div>
        </div>
      );
    },
  },

  {
    name: "آی دی سطح",
    minWidth: "250px",
    sortable: (row) => row.classRoomName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.id}</span>
          </div>
        </div>
      );
    },
  },
  // {
  //   name: "ظرفیت",
  //   sortable: true,
  //   minWidth: "172px",
  //   sortField: "userRoles",
  //   selector: (row) => row.capacity,
  //   cell: (row) => {
  //     return (
  //       <>
  //         <span className="text-truncate text-capitalize align-middle">
  //           {row.capacity}
  //         </span>
  //       </>
  //     );
  //   },
  // },

  // {
  //   name: "  تاریخ ساخت",
  //   sortable: true,
  //   minWidth: "72px",
  //   sortField: "userRoles",
  //   selector: (row) => row.inserDate,
  //   cell: (row) => {
  //     return (
  //       <>
  //         {" "}
  //         <h5 className="text-truncate text-muted mb-0">
  //           {" "}
  //           {row?.insertDate ? convertIsoToJalali(row?.insertDate) : ""}
  //         </h5>
  //       </>
  //     );
  //   },
  // },

  // {
  //   name: "ساختمان ",
  //   sortable: true,
  //   minWidth: "72px",
  //   sortField: "userRoles",
  //   selector: (row) => row.buildingName,
  //   cell: (row) => {
  //     return (
  //       <>
  //         {" "}
  //         <h5 className="text-truncate text-muted mb-0">
  //           {" "}
  //           <NavLink to={`/BuildingPage/${row?.buildingId}`}>
  //             {row?.buildingName ? row?.buildingName : ""}
  //           </NavLink>
  //         </h5>
  //       </>
  //     );
  //   },
  // },

  {
    name: "اقدامات",
    minWidth: "100px",

    cell: (row) => {
      const queryClient = useQueryClient();
      const navigate = useNavigate();
      const [show, setShow] = useState(false);

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="w-100 cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                ویرایش <Edit size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <ModalEditClass show={show} setShow={setShow} data={row} />
        </div>
      );
    },
  },
];
