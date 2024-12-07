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
import { useFormik } from "formik";

import { useActiveCourse } from "../../../core/services/api/Admin/handelreserve";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import { useState } from "react";
import ModalEditClass from "./modal/ModalEditStatus";
import ModalEditStatus from "./modal/ModalEditStatus";
import ModalAddStatus from "./modal/ModalAddStatus";
import { useEditTerm } from "../../../core/services/api/Admin/TermHandel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const CustomColumnsForListCourse = (toggleSidebar2) => [
  {
    name: "نام ترم",
    minWidth: "150px",
    sortable: (row) => row.termName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span>{row?.termName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام دپارتمان",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.departmentName,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.departmentName}
          </span>
        </>
      );
    },
  },

  {
    name: " تاریخ شروع  ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.iconAddress,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.iconAddress}
            {row?.startDate ? convertIsoToJalali(row?.startDate) : ""}
          </span>
        </>
      );
    },
  },

  {
    name: " تاریخ پایان  ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.iconAddress,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.iconAddress}
            {row?.startDate ? convertIsoToJalali(row?.startDate) : ""}
          </span>
        </>
      );
    },
  },

  {
    name: "وضعیت",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.expire,
    cell: (row) => {
      return (
        <>
          <Badge
            className={`text-truncate text-capitalize align-middle `}
            color={`${row.expire ? "light-danger" : "light-success"}`}
            pill
          >
            {row.expire ? "منقضی شده" : " فعال"}
          </Badge>
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
      const [show, setShow] = useState(false);
      const { mutate: UpdateProfile } = useEditTerm();

      const formik = useFormik({
        initialValues: {
          id: row?.id,
          termName: row?.termName,
          departmentId: row?.departmentId,
          startDate: row?.startDate,
          endDate: row?.endDate,
          expire: row?.expire,
        },
        enableReinitialize: true,

        onSubmit: (values) => {
          UpdateProfile(values, {
            onSuccess: (data) => {
              if (data.success == true) {
                // toast.success(" با موفقیت  ویرایش شد");
                queryClient.invalidateQueries("GetTermList");
                formik.resetForm();
                setShow(false);
              } else {
                toast.error("خطا در ویرایش کردن");
              }
            },
          });
        },
      });

      const handleSuspendedClick = () => {
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید ترم رو منقضی کنید",
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
            formik.setFieldValue("expire", true);
            formik.submitForm();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "ترم با موفقیت منقضی شد",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          }
        });
      };

      const handleSuspendedClick2 = () => {
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید ترم رو فعال کنید",
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
            formik.setFieldValue("expire", false);
            formik.submitForm();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "ترم با موفقیت فعال شد",
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
                className="w-100 cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                ویرایش <Edit size={14} />
              </DropdownItem>
              {row?.expire ? (
                <DropdownItem
                  className="w-100 cursor-pointer"
                  onClick={() => {
                    handleSuspendedClick2();
                  }}
                >
                  فعال کردن <Check size={14} />
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="w-100 cursor-pointer"
                  onClick={() => {
                    handleSuspendedClick();
                  }}
                >
                  منقضی کردن <X size={14} />
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
          <ModalEditStatus show={show} setShow={setShow} data={row} />
        </div>
      );
    },
  },
];
