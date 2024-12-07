import Avatar from "@components/avatar";
import NoProfile from "../../../images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Archive,
  Check,
  Database,
  Edit2,
  ExternalLink,
  Key,
  MoreVertical,
  Settings,
  Slack,
  Trash2,
  User,
  X,
} from "react-feather";
import {
  Badge,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  NavLink,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../../core/services/api/Admin/handelChangeProfileUser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useGetAllUsersDetailsAdmin,
  useGetAllUsersDetailsAdminForLists,
} from "../../../core/services/api/Admin/handelUsers";
import { useState } from "react";
export const CustomColumns = (toggleSidebar2, roles) => [
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
      const MySwal = withReactContent(Swal);

      const queryClient = useQueryClient();
      const { data, refetch } = useGetAllUsersDetailsAdminForLists(row?.id);
      const { mutate: UpdateProfile } = useUpdateUser();

      const formik = useFormik({
        initialValues: {
          id: data?.id ? data?.id : "",
          fName: data?.fName ? data?.fName : "",
          lName: data?.lName ? data?.lName : "",
          userName: data?.userName ? data?.userName : "",
          gmail: data?.gmail ? data?.gmail : "",
          phoneNumber: data?.phoneNumber ? data?.phoneNumber : "",
          active: data?.active,
          isDelete: data?.isDelete,
          isTecher: data?.isTecher,
          isStudent: data?.isStudent,
          recoveryEmail: data?.recoveryEmail ? data?.recoveryEmail : "",
          twoStepAuth: data?.twoStepAuth,
          userAbout: data?.userAbout ? data?.userAbout : "",
          currentPictureAddress: data?.currentPictureAddress
            ? data?.currentPictureAddress
            : "",
          linkdinProfile: data?.linkdinProfile ? data?.linkdinProfile : "",
          telegramLink: data?.telegramLink ? data?.telegramLink : "",
          receiveMessageEvent: data?.receiveMessageEvent,
          homeAdderess: data?.homeAdderess ? data?.homeAdderess : "",
          nationalCode: data?.nationalCode ? data?.nationalCode : "",
          gender: data?.gender,
          latitude: data?.latitude ? data?.latitude : "51.3890",
          longitude: data?.latitude ? data?.latitude : "35.6892",
          insertDate: data?.insertDate ? data?.insertDate : "",
          birthDay: data?.birthDay ? data?.birthDay : "",
          roles:
            data?.roles?.map((role) => ({
              id: role.id || "",
              roleName: role.roleName || "",
              roleParentName: role.roleParentName || "",
            })) || [],
          courses:
            data?.courses?.map((course) => ({
              title: course.title || "",
              describe: course.describe || "",
              tumbImageAddress: course.tumbImageAddress || "",
              lastUpdate: course.lastUpdate || "",
              courseId: course.courseId || "",
            })) || [],
          coursesReseves:
            data?.coursesReseves?.map((reserve) => ({
              reserveId: reserve.reserveId || "",
              courseId: reserve.courseId || "",
              courseName: reserve.courseName || "",
              studentId: reserve.studentId || "",
              studentName: reserve.studentName || "",
              reserverDate: reserve.reserverDate || "",
              accept: reserve.accept,
            })) || [],
          userProfileId: data?.userProfileId ? data?.userProfileId : undefined,
        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
          UpdateProfile(values, {
            onSuccess: (data) => {
              if (data.success == true) {
                // toast.success("ویرایش با موفقیت انجام شد");
                queryClient.invalidateQueries("GetStudentProfile");
                queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
                queryClient.invalidateQueries("GetAllUsers");
              }
            },
          });
        },
      });

      const handleSuspendedClick = () => {
        refetch();
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید کاربر رو غیرفعال کنید",
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
            formik.setFieldValue("active", false);
            formik.submitForm();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "کاربر با موفقیت غیرفعال شد",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          }
        });
      };

      const handleSuspendedClick2 = () => {
        refetch();
        return MySwal.fire({
          title: "آیا مطمئنید که میخواهید کاربر رو فعال کنید",
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
            formik.setFieldValue("active", true);
            formik.submitForm();
            MySwal.fire({
              icon: "success",
              title: "موفقیت آمیز بود",
              text: "کاربر با موفقیت فعال شد",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          }
        });
      };

      const [show, setShow] = useState(false);
      console.log("rolesrolesroles", roles?.roles);
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
              {row.active == "True" ? (
                <DropdownItem
                  className="w-100"
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleSuspendedClick}
                >
                  <X size={14} className="me-50" />

                  <span> غیرفعال کردن</span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="w-100"
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleSuspendedClick2}
                >
                  <Check size={14} className="me-50" />

                  <span> فعال کردن</span>
                </DropdownItem>
              )}

              <DropdownItem
                className="w-100"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setShow(true)}
              >
                <Key size={14} className="me-50" />

                <span> مدیریت دسترسی </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Modal isOpen={show} toggle={() => setShow(false)}>
            <ModalHeader toggle={() => setShow(false)}>
              مدیریت دسترسی کاربر
            </ModalHeader>
            <ModalBody>
              <Row className="role-list p-3 rounded shadow-sm form-switch">
                {roles?.roles?.map((item, index) => (
                  <Col
                    key={index}
                    className="d-flex align-items-center justify-content-between mb-3 p-2 bg-light rounded"
                    sm={6}
                  >
                    <Label
                      className="m-0 text-primary fw-bold"
                      style={{ cursor: "pointer" }}
                    >
                      {item?.roleName}
                    </Label>
                    <Input
                      type="switch"
                      className="form-switch-custom "
                      style={{ cursor: "pointer" }}
                      checked={row?.userRoles?.includes(item?.roleName)}
                    />
                  </Col>
                ))}
              </Row>
            </ModalBody>
          </Modal>
        </div>
      );
    },
  },
];
