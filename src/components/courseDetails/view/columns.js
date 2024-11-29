// ** React Imports
import { Fragment, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
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
  Check,
  X,
} from "react-feather";

import default_image from "../../../images/default_image.png";
import { useAcceptCourseReserve } from "../../../core/services/api/Admin/handelreserve";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Modal2ForAcceptReserve from "./Modal/Modal2ForAcceptReserve";
import {
  useAcceptCommentCourse,
  useDeleteCommentCourse,
  useDontAcceptCommentCourse,
  useGetUsersPaymentDetails,
} from "../../../core/services/api/Admin/handelUsers";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import PaymentShowScreenModalInCourse from "./Modal/PaymentShowScreenModalInCourse";
import PaymentDetailsModalInCourseDetails from "./Modal/PaymentDetailsModalInCourseDetails";
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
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => (
      <Link
        className="fw-bolder"
        to={`/apps/invoice/preview/${row.id}`}
      >{`#${row.id}`}</Link>
    ),
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row.invoiceStatus,
    cell: (row) => {
      const color = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].color
          : "primary",
        Icon = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].icon
          : Edit;
      return (
        <Fragment>
          <Avatar
            color={color}
            icon={<Icon size={14} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            <span className="fw-bold">{row.invoiceStatus}</span>
            <br />
            <span className="fw-bold">Balance:</span> {row.balance}
            <br />
            <span className="fw-bold">Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },

  {
    name: "Total Paid",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>${row.total || 0}</span>,
  },
  {
    minWidth: "200px",
    name: "Issued Date",
    cell: (row) => row.dueDate,
  },
  {
    name: "Action",
    minWidth: "110px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send
          className="text-body cursor-pointer"
          size={17}
          id={`send-tooltip-${row.id}`}
        />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link
          className="text-body"
          to={`/apps/invoice/preview/${row.id}`}
          id={`pw-tooltip-${row.id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download
          className="text-body cursor-pointer"
          size={17}
          id={`download-tooltip-${row.id}`}
        />
        <UncontrolledTooltip
          placement="top"
          target={`download-tooltip-${row.id}`}
        >
          Download Invoice
        </UncontrolledTooltip>
      </div>
    ),
  },
];

export const columns2 = (CourseDetails) => [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
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
              to={`/UsersPage/${row.studentId}`}
            >
              {row.studentName}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "تاریخ رزرو",
    cell: (row) => row.reserverDate && convertIsoToJalali(row.reserverDate),
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
      const [isOpenModal, setIsOpenModal] = useState(false);
      const toggleAcceptModal = () => {
        setIsOpenModal(!isOpenModal);
      };

      // const { mutate: Accept } = useAcceptCourseReserve();
      // const handelAccept = (value) => {
      //   Accept(value.reserveId, value.courseId, value.studentId, {
      //     onSuccess: (data) => {
      //       if (data.success == true) {
      //         toast.success("با موفقیت رزرو پذیرفته شد");
      //         queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
      //       } else {
      //         toast.error("    خطا در رزرو");
      //       }
      //     },
      //   });
      // };
      console.log("unicAAAAA", CourseDetails);
      return (
        <>
          {row.accept ? (
            <p className="text-success">پذیرفته شده</p>
          ) : (
            <Button
              onClick={() => {
                // handelAccept(row);
                toggleAcceptModal();
              }}
            >
              پذیرفتن
            </Button>
          )}

          <Modal2ForAcceptReserve
            isOpenModal={isOpenModal}
            toggleAcceptModal={toggleAcceptModal}
            courseId={CourseDetails?.courseId}
            teacherId={CourseDetails?.teacherId}
            studentId={row?.studentId}
            setIsOpenModal={setIsOpenModal}
          />
        </>
      );
    },
  },
];

export const columns3ForComment = [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <Avatar
            img={
              row?.pictureAddress && row?.pictureAddress !== "Not-set"
                ? row?.pictureAddress
                : default_image
            }
          />

          <div className="user-info text-truncate ms-1">
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/UsersPage/${row.userId}`}
            >
              {row.author}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "عنوان کامنت",
    cell: (row) => <span>{row?.describe}</span>,
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
      //TODO
      const queryClient = useQueryClient();

      const { mutate: AcceptComment } = useAcceptCommentCourse();
      const { mutate: NotAcceptComment } = useDontAcceptCommentCourse();
      const { mutate: DeleteComment } = useDeleteCommentCourse();

      const handelAccept = (id) => {
        console.log(id, "id for test");
        AcceptComment(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("GetAllCommentsList");
            toast.success("با موفقیت با کامنت موفقیت شد");
          },
        });
      };

      const handelDontAccept = (id) => {
        NotAcceptComment(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("GetAllCommentsList");
            toast.success("با موفقیت با کامنت مخالفت شد");
          },
        });
      };

      const handelDelete = (id) => {
        DeleteComment(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("GetAllCommentsList");
            toast.success("با موفقیت  کامنت حذف شد");
          },
        });
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" className="w-100">
                <Check color="green" size={16} />
                <span
                  className="align-middle"
                  onClick={() => {
                    console.log(row.id, "id for test1");
                    handelAccept(row.id);
                    console.log(row.id, "id for test2");
                  }}
                >
                  تایید نظر{" "}
                </span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <X color="red" size={14} />{" "}
                <span
                  className="align-middle"
                  onClick={() => {
                    handelDontAccept(row.id);
                  }}
                >
                  رد نظر{" "}
                </span>
              </DropdownItem>
              <DropdownItem size="sm">
                <Trash2 size={14} className="me-50" />
                <span
                  className="align-middle"
                  onClick={() => {
                    handelDelete(row.id);
                  }}
                >
                  حذف نظر
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];

export const columns4ForPayMent = [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <Avatar
            img={
              row?.pictureAddress && row?.pictureAddress !== "Not-set"
                ? row?.pictureAddress
                : default_image
            }
          />

          <div className="user-info text-truncate ms-1">
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/UsersPage/${row.userId}`}
            >
              {row.studentName}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "تاریخ",
    cell: (row) => <span>{row?.peymentDate}</span>,
  },
  {
    name: "وضعیت پذیرش ",
    sortable: true,
    minWidth: "150px",
    sortField: "userRoles",
    selector: (row) => row.accept,
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

export const columns6ForWhosPayAndWhosNotPayed = [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <div
              className="d-block fw-bold text-truncate"
              to={`/UsersPage/${row.userId}`}
            >
              {row.studentName}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "نام گروه",
    cell: (row) => <span>{row?.groupName}</span>,
  },
  {
    name: "وضعیت اتمام اقساط ",
    sortable: true,
    minWidth: "150px",
    sortField: "userRoles",
    selector: (row) => row.peymentDone,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.peymentDone ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.peymentDone ? "به اتمام رسیده" : "تمام نشده"}
            </Badge>
          </h5>
        </>
      );
    },
  },
];

export const columns5ForUserListInCourse = [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/UsersPage/${row.studentId}`}
            >
              {row.studentName}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "200px",
    name: "نمره دانشجو",
    cell: (row) => <span>{row?.courseGrade ?? "ثبت نشده"}</span>,
  },

  {
    name: "وضعیت پرداخت",
    sortable: true,
    minWidth: "50px",
    sortField: "userRoles",
    selector: (row) => row.peymentDone,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.peymentDone ? "light-success" : "light-danger"}
              className="me-1"
            >
              {row.peymentDone ? "پرداخت شده" : "پرداخت نشده"}
            </Badge>
          </h5>
        </>
      );
    },
  },

  {
    name: "اعلان",
    sortable: true,
    minWidth: "50px",
    sortField: "userRoles",
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.notification ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.notification ? "فعال" : "غیرفعال"}
            </Badge>
          </h5>
        </>
      );
    },
  },

  // {
  //   name: "اقدامات",
  //   minWidth: "100px",

  //   cell: (row) => {
  //     //TODO
  //     const queryClient = useQueryClient();

  //     const { mutate: AcceptComment } = useAcceptCommentCourse();
  //     const { mutate: NotAcceptComment } = useDontAcceptCommentCourse();
  //     const { mutate: DeleteComment } = useDeleteCommentCourse();

  //     const handelAccept = (id) => {
  //       console.log(id, "id for test");
  //       AcceptComment(id, {
  //         onSuccess: () => {
  //           queryClient.invalidateQueries("GetAllCommentsList");
  //           toast.success("با موفقیت با کامنت موفقیت شد");
  //         },
  //       });
  //     };

  //     const handelDontAccept = (id) => {
  //       NotAcceptComment(id, {
  //         onSuccess: () => {
  //           queryClient.invalidateQueries("GetAllCommentsList");
  //           toast.success("با موفقیت با کامنت مخالفت شد");
  //         },
  //       });
  //     };

  //     const handelDelete = (id) => {
  //       DeleteComment(id, {
  //         onSuccess: () => {
  //           queryClient.invalidateQueries("GetAllCommentsList");
  //           toast.success("با موفقیت  کامنت حذف شد");
  //         },
  //       });
  //     };
  //     return (
  //       <div className="column-action">
  //         <UncontrolledDropdown>
  //           <DropdownToggle tag="div" className="btn btn-sm">
  //             <MoreVertical size={14} className="cursor-pointer" />
  //           </DropdownToggle>
  //           <DropdownMenu>
  //             <DropdownItem tag="a" className="w-100">
  //               <Check color="green" size={16} />
  //               <span
  //                 className="align-middle"
  //                 onClick={() => {
  //                   console.log(row.id, "id for test1");
  //                   handelAccept(row.id);
  //                   console.log(row.id, "id for test2");
  //                 }}
  //               >
  //                 تایید نظر{" "}
  //               </span>
  //             </DropdownItem>
  //             <DropdownItem className="w-100">
  //               <X color="red" size={14} />{" "}
  //               <span
  //                 className="align-middle"
  //                 onClick={() => {
  //                   handelDontAccept(row.id);
  //                 }}
  //               >
  //                 رد نظر{" "}
  //               </span>
  //             </DropdownItem>
  //             <DropdownItem size="sm">
  //               <Trash2 size={14} className="me-50" />
  //               <span
  //                 className="align-middle"
  //                 onClick={() => {
  //                   handelDelete(row.id);
  //                 }}
  //               >
  //                 حذف نظر
  //               </span>
  //             </DropdownItem>
  //           </DropdownMenu>
  //         </UncontrolledDropdown>
  //       </div>
  //     );
  //   },
  // },
];

export const PayColInCoursePage = [
  {
    name: "نام دانشجو",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <NavLink
            to={`/UsersPage/${row?.studentId}`}
            className="user-info text-truncate ms-1"
          >
            {row?.studentName}
          </NavLink>
        </div>
      );
    },
  },
  {
    name: "پرداخت شده",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.paid,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <strong>{row?.paid}</strong> تومان
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "50px",
    name: "تاریخ پرداخت",
    cell: (row) => row.peymentDate && convertIsoToJalali(row.peymentDate),
  },
  {
    name: "تصویر پرداخت ",
    sortable: true,
    minWidth: "50px",
    sortField: "userRoles",
    selector: (row) => row.paymentInvoiceImage,
    cell: (row) => {
      // ** States
      const [show, setShow] = useState(false);

      const toogelModal = () => {
        setShow(!show);
      };
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {row.paymentInvoiceImage ? (
              <div className="cursor-pointer	" onClick={toogelModal}>
                نمایش
                <Eye size={13} />
              </div>
            ) : (
              "ثبت نشده"
            )}
          </h5>
          <PaymentShowScreenModalInCourse
            isOpenModal={show}
            toggleAcceptModal={toogelModal}
            paymentInvoiceImage={row?.paymentInvoiceImage}
            groupName={row?.groupName}
          />
        </>
      );
    },
  },
  {
    name: "وضعیت پذیرش ",
    sortable: true,
    minWidth: "50px",
    sortField: "userRoles",
    selector: (row) => row.accept,
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
    minWidth: "200px",

    cell: (row) => {
      const navigate = useNavigate();
      const {
        data: detailsPayment,
        refetch,
        isPending,
      } = useGetUsersPaymentDetails(row?.id);
      const [show, setShow] = useState(false);

      const toogelModal = () => {
        setShow(false);
      };
      const handelClickDetailsPayment = () => {
        refetch();
        setShow(!show);
      };

      console.log(detailsPayment, "detailsPayment");
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100">
                <Archive size={14} className="me-50" />
                <span
                  className="align-middle"
                  onClick={() => {
                    navigate(`/CourseListPage/${row?.courseId}`);
                  }}
                >
                  جزئیات دوره
                </span>
              </DropdownItem>

              <DropdownItem
                className="w-100"
                onClick={handelClickDetailsPayment}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">جزئیات پرداخت </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <PaymentDetailsModalInCourseDetails
            isOpenModal={show}
            toggleAcceptModal={toogelModal}
            detailsPayment={detailsPayment}
            isPending={isPending}
          />
        </div>
      );
    },
  },
];

export const GroupOfCourseDetailsList = [
  {
    name: "نام گروه",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.groupName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <NavLink
            to={`/CourseGroupPage/${row?.groupId}`}
            className="user-info text-truncate ms-1"
          >
            {row?.groupName}
          </NavLink>
        </div>
      );
    },
  },
  {
    name: "نام استاد",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.teacherName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <NavLink
            to={`/UsersPage/${row?.teacherId}`}
            className="user-info text-truncate ms-1"
          >
            <strong>{row?.teacherName}</strong>
          </NavLink>
        </div>
      );
    },
  },

  {
    minWidth: "50px",
    name: "ظرفیت دوره",
    cell: (row) => row.courseCapacity,
  },

  {
    minWidth: "50px",
    name: "ظرفیت گروه",
    cell: (row) => row.groupCapacity,
  },

  {
    name: "اقدامات",
    minWidth: "200px",

    cell: (row) => {
      const navigate = useNavigate();
      const {
        data: detailsPayment,
        refetch,
        isPending,
      } = useGetUsersPaymentDetails(row?.id);
      const [show, setShow] = useState(false);

      const toogelModal = () => {
        setShow(false);
      };
      const handelClickDetailsPayment = () => {
        refetch();
        setShow(!show);
      };

      console.log(detailsPayment, "detailsPayment");
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100">
                <Archive size={14} className="me-50" />
                <span
                  className="align-middle"
                  onClick={() => {
                    navigate(`/CourseListPage/${row?.courseId}`);
                  }}
                >
                  جزئیات دوره
                </span>
              </DropdownItem>

              <DropdownItem
                className="w-100"
                onClick={handelClickDetailsPayment}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">جزئیات پرداخت </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <PaymentDetailsModalInCourseDetails
            isOpenModal={show}
            toggleAcceptModal={toogelModal}
            detailsPayment={detailsPayment}
            isPending={isPending}
          />
        </div>
      );
    },
  },
];
