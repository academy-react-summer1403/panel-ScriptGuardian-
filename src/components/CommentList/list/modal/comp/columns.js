import Avatar from "@components/avatar";
import default_image from "../../../../../images/default_image.png";
import NoProfile from "../../../../../images/profile.png";
import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  Check,
  CheckCircle,
  CheckSquare,
  Database,
  Edit2,
  Eye,
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
// import {
//   useAcceptCommentCourse,
//   useDeleteCommentCourse,
//   useDontAcceptCommentCourse,
// } from "../../../core/services/api/Admin/handelUsers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useAcceptCommentCourse,
  useDeleteCommentCourse,
  useDontAcceptCommentCourse,
} from "../../../../../core/services/api/Admin/handelUsers";

export const columnsForReplayComment = (refetch) => [
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
            refetch();
            toast.success("با موفقیت با کامنت موفقیت شد");
          },
        });
      };

      const handelDontAccept = (id) => {
        NotAcceptComment(id, {
          onSuccess: () => {
            refetch();
            toast.success("با موفقیت با کامنت مخالفت شد");
          },
        });
      };

      const handelDelete = (id) => {
        DeleteComment(id, {
          onSuccess: () => {
            refetch();
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
              <DropdownItem
                tag="a"
                className="w-100"
                onClick={() => {
                  console.log(row.id, "id for test1");
                  handelAccept(row.id);
                  console.log(row.id, "id for test2");
                }}
              >
                <Check color="green" size={16} />
                <span className="align-middle">تایید نظر </span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  handelDontAccept(row.id);
                }}
              >
                <X color="red" size={14} />{" "}
                <span className="align-middle">رد نظر </span>
              </DropdownItem>
              <DropdownItem
                size="sm"
                onClick={() => {
                  handelDelete(row.id);
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف نظر</span>
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
