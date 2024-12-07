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
import ModalEditClass from "./modal/ModalEditStatus";
import ModalEditStatus from "./modal/ModalEditStatus";
import ModalAddStatus from "./modal/ModalAddStatus";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام تکنولوژی",
    minWidth: "150px",
    sortable: (row) => row.techName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.techName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "توضیحات تکنولوژی",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.describe,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.describe}
          </span>
        </>
      );
    },
  },

  // {
  //   name: " آیکون",
  //   sortable: true,
  //   minWidth: "172px",
  //   sortField: "userRoles",
  //   selector: (row) => row.iconAddress,
  //   cell: (row) => {
  //     return (
  //       <>
  //         <span className="text-truncate text-capitalize align-middle">
  //           {row.iconAddress}
  //         </span>
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
          <ModalEditStatus show={show} setShow={setShow} data={row} />
        </div>
      );
    },
  },
];
