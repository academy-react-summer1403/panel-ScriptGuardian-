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

import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

import { useActiveCourse } from "../../../core/services/api/Admin/handelreserve";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import EditBuild from "./modal/EditBuild";
import { useState } from "react";
import { useActiveBuilding } from "../../../core/services/api/Admin/handelBulding";

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام ساختمان",
    minWidth: "150px",
    sortable: (row) => row.buildingName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.buildingName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تعداد طبقه",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.floor,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.floor}
          </span>
        </>
      );
    },
  },

  {
    name: "تاریخ کار",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.workDate,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {" "}
            {row?.workDate ? convertIsoToJalali(row?.workDate) : ""}
          </h5>
        </>
      );
    },
  },

  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.active,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {" "}
            {row?.active ? (
              <Badge color="light-success" pill>
                فعال
              </Badge>
            ) : (
              <Badge color="light-danger" pill>
                {" "}
                غیر فعال
              </Badge>
            )}
          </h5>
        </>
      );
    },
  },

  {
    name: "اقدامات",
    minWidth: "100px",

    cell: (row) => {
      const MySwal = withReactContent(Swal);

      const queryClient = useQueryClient();
      const navigate = useNavigate();
      const [show, setShow] = useState();

      //

      const { mutate: ChangeActivity } = useActiveBuilding();

      const ActiveCourse = () => {
        ChangeActivity(
          { id: row.id, active: true },

          {
            onSuccess: (data) => {
              if (data.success === true) {
                queryClient.invalidateQueries("GetBuildingDetails");
                toast.success("ساختمان با موفقیت فعال شد");
              } else {
                toast.error("خطا در فعال کردن ساختمان");
              }
            },
          }
        );
      };

      const DeActiveCourse = () => {
        ChangeActivity(
          { id: row.id, active: false },

          {
            onSuccess: (data) => {
              if (data.success === true) {
                queryClient.invalidateQueries("GetBuildingDetails");
                toast.success("ساختمان با موفقیت غیر فعال شد");
              } else {
                toast.error("خطا در غیر فعال کردن ساختمان");
              }
            },
          }
        );
      };

      const handleSuspendedClick = () => {
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید ساختمان را غیرفعال کنید",
          text: "البته یک عمل قابل بازگشت است",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "بله",
          cancelButtonText: "لغو",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          buttonsStyling: false,
        }).then(function (result) {
          if (result.value) {
            DeActiveCourse();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "ساختمان با موفقیت غیرفعال شد",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          }
        });
      };

      const handleSuspendedClick2 = () => {
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید ساختمان رو فعال کنید",
          text: "البته یک عمل قابل بازگشت است",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "بله",
          cancelButtonText: "لغو",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          buttonsStyling: false,
        }).then(function (result) {
          if (result.value) {
            ActiveCourse();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "ساختمان با موفقیت فعال شد",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          }
        });
      };

      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  setShow(true);
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              {row.active ? (
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    handleSuspendedClick();
                  }}
                >
                  <X size={14} className="me-50" />
                  <span className="align-middle">غیرفعال کردن ساختمان</span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    handleSuspendedClick2();
                  }}
                >
                  <Check size={14} className="me-50" />
                  <span className="align-middle">فعال کردن ساختمان</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
          <EditBuild setShow={setShow} show={show} data={row} />
        </div>
      );
    },
  },
];
