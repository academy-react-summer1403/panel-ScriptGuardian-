import Avatar from "@components/avatar";
import default_image from "../../../images/default_image.png";
import NoProfile from "../../../images/profile.png";
import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  Check,
  CheckCircle,
  CheckSquare,
  Database,
  Edit2,
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
import {
  useAcceptCommentCourse,
  useDeleteCommentCourse,
  useDontAcceptCommentCourse,
} from "../../../core/services/api/Admin/handelUsers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  useActiveCourse,
  useActiveNews,
} from "../../../core/services/api/Admin/handelreserve";

export const CustomColumns = (toggleSidebar2) => [
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
              to={`/users/${row.id}`}
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
              color={row.active ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.active ? "فعال" : "غیرفعال"}
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
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem
                tag={Link}
                className="w-100"
                to={`${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات کاربر</span>
              </DropdownItem> */}
              <DropdownItem
                tag="a"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   dispatch(dispatch(toggleEditSidebar));
                //   setData2(row);
                // }}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle" onClick={toggleSidebar2}>
                  ویرایش کاربر
                </span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   // const params = {}
                //   // store.dispatch(deleteUser(row.id));
                //   deleteUserFn.mutate(
                //     row.id
                //     // {
                //     //   onSuccess:()=> {useQueryClient(queryClient)}
                //     // }
                //   );
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف کاربر</span>
              </DropdownItem>
              <DropdownItem size="sm">
                <Archive size={14} className="me-50" />
                <span className="align-middle">دسترسی</span>
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

export const CustomColumnsForListCourse = (toggleSidebar2) => [
  // {
  //   name: " دوره عنوان",
  //   sortable: true,
  //   minWidth: "172px",
  //   sortField: "title",
  //   selector: (row) => row.title,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex justify-content-left align-items-center">
  //         <Avatar
  //           className="me-1"
  //           img={
  //             row.pictureAddress &&
  //             row.pictureAddress != null &&
  //             row.pictureAddress !== "Not-set"
  //               ? row.pictureAddress
  //               : NoProfile
  //           }
  //           width="32"
  //           height="32"
  //         />
  //         <div className="d-flex flex-column">
  //           <Link
  //             to={`/users/${row.id}`}
  //             className="user_name text-truncate text-body"
  //             // onClick={() => store.dispatch(getUser(row.id))}
  //           >
  //             <span className="fw-bolder">
  //               {row.title} {row.lname}
  //             </span>
  //           </Link>
  //           <small className="text-truncate text-muted mb-0">{row.gmail}</small>
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    name: "عنوان دوره",
    minWidth: "250px",
    sortable: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          {row.avatar === "" ? (
            <Avatar color={`light`} content={row.full_name} initials />
          ) : (
            <Avatar
              img={
                row?.tumbImageAddress && row?.tumbImageAddress !== "Not-set"
                  ? row?.tumbImageAddress
                  : default_image
              }
            />
          )}
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام استاد",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.fullName,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.fullName}
          </span>
        </>
      );
    },
  },

  {
    name: "قیمت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.cost,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">{row.cost}</h5>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.isActive ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.isActive ? "فعال" : "غیرفعال"}
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
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem
                tag={Link}
                className="w-100"
                to={`${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات کاربر</span>
              </DropdownItem> */}
              <DropdownItem
                tag="a"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   dispatch(dispatch(toggleEditSidebar));
                //   setData2(row);
                // }}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle" onClick={toggleSidebar2}>
                  ویرایش کاربر
                </span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   // const params = {}
                //   // store.dispatch(deleteUser(row.id));
                //   deleteUserFn.mutate(
                //     row.id
                //     // {
                //     //   onSuccess:()=> {useQueryClient(queryClient)}
                //     // }
                //   );
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف کاربر</span>
              </DropdownItem>
              <DropdownItem size="sm">
                <Archive size={14} className="me-50" />
                <span className="align-middle">دسترسی</span>
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

export const CustomColumnsForListComments = (toggleSidebar2) => [
  {
    name: "عنوان نظر",
    minWidth: "250px",
    sortable: (row) => row.commentTitle,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">
              {row?.commentTitle}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.courseTitle}
          </span>
        </>
      );
    },
  },

  {
    name: "نام نویسنده ",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.userFullName,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">{row.userFullName}</h5>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "172px",
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
              {row.accept ? "پذیرفته شده" : "نپذیرفته"}
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
                    console.log(row.commentId, "id for test1");
                    handelAccept(row.commentId);
                    console.log(row.commentId, "id for test2");
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
                    handelDontAccept(row.commentId);
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
                    handelDelete(row.commentId);
                  }}
                >
                  حذف نظر
                </span>
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

export const CustomColumnsForListNews = (toggleSidebar2) => [
  {
    name: "عنوان خبر",
    minWidth: "350px",
    sortable: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex align-items-center">
          {row.avatar === "" ? (
            <Avatar color={`light`} content={row.full_name} initials />
          ) : (
            <Avatar
              img={
                row?.currentImageAddressTumb &&
                row?.currentImageAddressTumb !== "Not-set"
                  ? row?.currentImageAddressTumb
                  : default_image
              }
            />
          )}
          <div className="user-info text-truncate ms-1">
            <NavLink
              to={`/NewsListPage/${row?.id}`}
              className="d-block  fw-bold text-truncate"
            >
              {row.title.length > 20
                ? row.title.substring(0, 20) + "..."
                : row.title}
            </NavLink>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام نویسنده خبر",
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.addUserFullName,
    cell: (row) => {
      return (
        <>
          <span className="text-truncate text-capitalize align-middle">
            {row.addUserFullName}
          </span>
        </>
      );
    },
  },

  {
    name: "دسته بندی خبر ",
    sortable: true,
    minWidth: "200px",
    sortField: "userRoles",
    selector: (row) => row.cost,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            {row.newsCatregoryName}
          </h5>
        </>
      );
    },
  },
  {
    name: "وضعیت ",
    sortable: true,
    minWidth: "52px",
    sortField: "userRoles",
    selector: (row) => row.isActive,
    cell: (row) => {
      return (
        <>
          {" "}
          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.isActive ? "light-primary" : "light-danger"}
              className="me-1"
            >
              {row.isActive ? "فعال" : "غیرفعال"}
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

      const { mutate: ChangeActivity } = useActiveNews();

      const ActiveCourse = (id) => {
        const formData = new FormData();
        formData.append("Id", id);
        formData.append("Active", true);
        ChangeActivity(
          formData,

          {
            onSuccess: (data) => {
              if (data.success === true) {
                queryClient.invalidateQueries("GetAllNewsList");
                toast.success("خبر با موفقیت فعال شد");
              }
            },
          }
        );
      };

      const DeActiveCourse = (id) => {
        const formData = new FormData();
        formData.append("Id", id);
        formData.append("Active", false);
        ChangeActivity(
          formData,

          {
            onSuccess: (data) => {
              if (data.success === true) {
                queryClient.invalidateQueries("GetAllNewsList");
                toast.success("خبر با موفقیت غیر فعال شد");
              }
            },
          }
        );
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" className="w-100">
                <Archive size={14} className="me-50" />
                <span className="align-middle" onClick={toggleSidebar2}>
                  ویرایش کاربر
                </span>
              </DropdownItem>

              {row?.isActive ? (
                <>
                  <DropdownItem
                    onClick={() => {
                      DeActiveCourse(row?.id);
                    }}
                    lassName="w-100"
                  >
                    <X size={14} className="me-50" />
                    <span className="align-middle"> غیر فعال کردن خبر </span>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    className="w-100"
                    onClick={() => {
                      ActiveCourse(row?.id);
                    }}
                  >
                    <Trash2 size={14} className="me-50" />
                    <span className="align-middle">فعال کردن خبر</span>
                  </DropdownItem>
                </>
              )}

              <DropdownItem size="sm">
                <Archive size={14} className="me-50" />
                <span className="align-middle">دسترسی</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
