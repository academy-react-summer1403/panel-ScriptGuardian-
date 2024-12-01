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
  Repeat,
  MessageCircle,
} from "react-feather";
import { useReplayCommentCoursesInCommentList } from "../../../core/services/api/Admin/handelComment";
import default_image from "../../../images/default_image.png";
import { useAcceptCourseReserve } from "../../../core/services/api/Admin/handelreserve";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Modal2ForAcceptReserve from "./Modal/Modal2ForAcceptReserve";
import { useCoursesDetail } from "../../../core/services/api/DetailCourses/GetDetailCourses";
import {
  useAcceptCommentCourse,
  useDeleteCommentCourse,
  useDontAcceptCommentCourse,
  useGetAllCourseDetailsAdmin,
  useGetAllCourseDetailsAdminForReserve,
  useGetUsersPaymentDetails,
} from "../../../core/services/api/Admin/handelUsers";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import PaymentShowScreenModal from "./Modal/PaymentShowScreenModal";
import PaymentDetailsModal from "./Modal/PaymentDetailsModal";
import ShowReplaysModal from "./Modal/ShowReplaysModal";
import ReplayCustomModalTwo from "./Modal/ReplayCustomModalTwo";

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
    minWidth: "200px",
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1" title={row.courseName}>
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/CourseListPage/${row.courseId}`}
            >
              {row.courseName.length > 15
                ? row.courseName.substring(0, 15) + "..."
                : row.courseName}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "100px",
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
      const { data: CourseDetails, refetch } =
        useGetAllCourseDetailsAdminForReserve(row?.courseId);
      const queryClient = useQueryClient();
      const [isOpenModal, setIsOpenModal] = useState(false);
      const toggleAcceptModal = () => {
        setIsOpenModal(!isOpenModal);
        refetch();
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
            setIsOpenModal={setIsOpenModal}
            toggleAcceptModal={toggleAcceptModal}
            courseId={row?.courseId}
            teacherId={CourseDetails?.teacherId}
            studentId={row?.studentId}
          />
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
    minWidth: "150px",
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
              title={row.title}
            >
              {row.title.length > 15
                ? row.title.substring(0, 15) + "..."
                : row.title}
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
    minWidth: "250px",
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
    name: " آخرین آپدیت",
    cell: (row) => (
      <strong>{row.lastUpdate && convertIsoToJalali(row.lastUpdate)}</strong>
    ),
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

export const PayCol = [
  {
    name: "پرداخت شده",
    sortable: true,
    sortField: "id",
    minWidth: "200px",
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
          <PaymentShowScreenModal
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
    minWidth: "200px",

    cell: (row) => {
      const navigate = useNavigate();
      const {
        data: detailsPayment,
        refetch,
        isPending,
      } = useGetUsersPaymentDetails(row?.paymentId);
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

          <PaymentDetailsModal
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

export const columns3ForComment = [
  {
    name: "نام دوره",
    sortable: true,
    sortField: "id",
    minWidth: "170px",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1" title={row.courseTitle}>
            <NavLink
              className="d-block fw-bold text-truncate"
              to={`/CourseListPage/${row.userId}`}
            >
              {row.courseTitle.length > 15
                ? row.courseTitle.slice(0, 15) + "..."
                : row.courseTitle}
            </NavLink>
          </div>
        </div>
      );
    },
  },

  {
    minWidth: "150px",
    name: "عنوان کامنت",
    cell: (row) => (
      <span 
      title={row.commentTitle}>
        {row.commentTitle.length > 15
          ? row.commentTitle.slice(0, 15) + "..."
          : row.commentTitle}
      </span>
    ),
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
    name: "تعداد پاسخ ",
    sortable: true,
    minWidth: "72px",
    sortField: "userRoles",
    selector: (row) => row.accept,
    cell: (row) => {
      const [show, setShow] = useState(false);
      const { data: ReplayList, refetch } =
        useReplayCommentCoursesInCommentList({
          courseId: row?.courseId,
          CommentId: row.commentId,
        });
      const ClickModal = () => {
        setShow(!show);
        refetch();
      };

      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <div
              onClick={() => {
                if (row.replyCount != "0") {
                  ClickModal();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {row.replyCount != "0" ? <Eye className="mr-1" size={16} /> : ""}
              <span> {row?.replyCount}</span>
            </div>
          </h5>
          <ShowReplaysModal
            setShow={setShow}
            show={show}
            data={ReplayList}
            refetch={refetch}
          />
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
            queryClient.invalidateQueries("GetAllListUsersComment");
            toast.success("با موفقیت با کامنت موفقیت شد");
          },
        });
      };

      const handelDontAccept = (id) => {
        NotAcceptComment(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("GetAllListUsersComment");
            toast.success("با موفقیت با کامنت مخالفت شد");
          },
        });
      };

      const handelDelete = (id) => {
        DeleteComment(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("GetAllListUsersComment");
            toast.success("با موفقیت  کامنت حذف شد");
          },
        });
      };

      const [show, setShow] = useState(false);

      const toggelShow = () => {
        setShow(!show);
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag="a"
                className="w-100"
                onClick={() => {
                  console.log(row.commentId, "id for test1");
                  handelAccept(row.commentId);
                  console.log(row.commentId, "id for test2");
                }}
              >
                <Check color="green" size={16} />
                <span className="align-middle">تایید نظر </span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  handelDontAccept(row.commentId);
                }}
              >
                <X color="red" size={14} />{" "}
                <span className="align-middle">رد نظر </span>
              </DropdownItem>
              <DropdownItem
                size="sm"
                onClick={() => {
                  handelDelete(row.commentId);
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف نظر</span>
              </DropdownItem>

              <DropdownItem size="sm" onClick={toggelShow}>
                <MessageCircle size={14} className="me-50" />
                <span className="align-middle">پاسخ دادن به نظر </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <ReplayCustomModalTwo
            setShow={setShow}
            show={show}
            commentId={row?.commentId}
            courseId={row?.courseId}
          />
        </div>
      );
    },
  },
];
