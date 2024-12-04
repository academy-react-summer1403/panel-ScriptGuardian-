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
import EditDepart from "./EditDepart";
import { useState } from "react";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام دپارتمان",
    minWidth: "150px",
    sortable: (row) => row.depName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.depName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام ساختمان",
    minWidth: "150px",
    sortable: (row) => row.buildingName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <NavLink to={`/BuildingPage/${row?.id}`}>
              {row?.buildingName}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    name: "تاریخ ساخت",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.insertDate,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {" "}
            {row?.insertDate ? convertIsoToJalali(row?.insertDate) : ""}
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
      const [show, setShow] = useState(false);

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100" onClick={() => setShow(!show)}>
                <Edit size={14} className="me-50" />
                <span className="align-middle"> ویرایش</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <EditDepart show={show} setShow={setShow} data={row} />
        </div>
      );
    },
  },
];
