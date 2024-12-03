export const LOGIN_URL = "/sign/login";
export const SIGN_SEND_VERIFY_MESSAGE_URL = "/Sign/SendVerifyMessage";
export const LandingReport = "/Home/LandingReport";
export const ApiRoutes = {
  //Auth
  LOGIN_URL: "/sign/login",
  REGISTER_CODE_URL: "/Sign/SendVerifyMessage",
  REGISTER_CODE_VERIFICATION_URL: "/Sign/VerifyMessage",
  REGISTER_CODE_FINISH: "/Sign/Register",

  //Landing
  LANDING_REPORT_URL: "/Home/LandingReport",
  LANDING_REPORT_DASHBOARD_URL: "/Report/DashboardReport",
  LANDING_REPORT_TECHNOLOGY_URL: "/Report/DashboardTechnologyReport",
  LANDING_COURSES_URL: "/Home/GetCoursesTop",
  LANDING_TEACHERS_URL: "/Home/GetTeachers",

  //News
  LANDING_NEWS_URL: "/News",
  ADD_RATE_NEWS_URL: "/News/NewsRate?",

  //Courses Page
  PANEL_GET_DETAILS_USERS_COMMENT_LIST_URL: "/Course/CommentManagment?",
  COURSES_PAGE_URL: "/Home/GetCoursesWithPagination",
  ADD_LIKE_COURSES_URL: "/Course/AddCourseLike?CourseId=",
  ADD_DISS_LIKE_COURSES_URL: "/Course/AddCourseDissLike?CourseId=",
  DELETE_LIKE_COURSES_URL: "/Course/DeleteCourseLike",
  ADD_COURSES_FAVORITE_URL: "/Course/AddCourseFavorite",
  DELETE_COURSES_FAVORITE_URL: "/Course/DeleteCourseFavorite",
  GET_COURSES_COMMENT_URL: "/Course/GetCourseCommnets/",
  GET_REPLAY_COURSES_COMMENT_URL: "/Course/GetCourseReplyCommnets",
  ADD_LIKE_COURSES_COMMENT_URL: "/Course/AddCourseCommentLike?",
  ADD_DISS_LIKE_COURSES_COMMENT_URL: "/Course/AddCourseCommentDissLike?",
  DELETE_LIKE_COURSES_COMMENT_URL: "/Course/DeleteCourseCommentLike?",
  ADD_COURSES_COMMENT_URL: "/Course/AddCommentCourse",
  ADD_COURSES_REPLAY_COMMENT_URL: "/Course/AddReplyCourseComment",
  //Details Of Courses
  DETAILS_COURSES_PAGE_URL: "/Home/GetCourseDetails?CourseId=",
  DETAILS_COURSES_ADD_TO_RESERVE_URL: "/CourseReserve/ReserveAdd",
  DETAILS_COURSES_COMMENTS_URL: "/Course/GetCourseCommnets/",
  DETAILS_COURSES_PAYMENT_URL: "/CoursePayment?CourseId=",
  DETAILS_COURSES_PAYMENT_WHO_PAYED_URL:
    "/CoursePayment/ListOfWhoIsPay?CourseId=",
  DETAILS_COURSES_USER_LIST_URL: "/CourseUser/GetCourseUserList?CourseId=",
  DETAILS_COURSES_RATE_URL: "/Course/SetCourseRating?",
  NEWS_DETAILS_ADD_COMMENT_URL: "/News/CreateNewsComment",
  NEWS_DETAILS_ADD_REPLAY_COMMENT_URL: "/News/CreateNewsReplyComment",
  //Detail OF News
  DETAILS_NEWS_PAGE_URL: "/News/",
  DETAILS_NEWS_PAGE_REPLAY_COMMENT_URL: "/News/GetRepliesComments?",
  DETAILS_NEWS_PAGE_LIKE_COMMENT_URL: "/News/CommentLike/",
  DETAILS_NEWS_PAGE_DELETE_LIKE_COMMENT_URL: "/News/DeleteCommentLikeNews",
  DETAILS_ADD_LIKE_NEWS_URL: "/News/NewsLike/",
  DETAILS_ADD_DISS_LIKE_NEWS_URL: "/News/NewsDissLike/",
  DETAILS_DELETE_LIKE_NEWS_URL: "/News/DeleteLikeNews",
  DETAILS_ADD_FAVORITE_NEWS_URL: "/News/AddFavoriteNews?",
  DETAILS_DELETE_FAVORITE_NEWS_URL: "/News/DeleteFavoriteNews",

  //StudentPanel DashBoard
  PANEL_PROFILE_URL: "/SharePanel/GetProfileInfo",

  //student panel My Courses
  PANEL_MY_COURSES_URL: "/SharePanel/GetMyCourses",
  PANEL_MY_RESERVED_COURSES_URL: "/SharePanel/GetMyCoursesReserve",
  PANEL_DELETE_MY_RESERVED_COURSES_URL: "/CourseReserve",
  PANEL_MY_FAVORITE_COURSES_URL: "/SharePanel/GetMyFavoriteCourses",
  PANEL_MY_FAVORITE_NEWS_URL: "/SharePanel/GetMyFavoriteNews",

  //student panel Edit Profile
  PANEL_EDIT_PROFILE_URL: "/SharePanel/UpdateProfileInfo",
  PANEL_ADD_PROFILE_IMAGE_URL: "/SharePanel/AddProfileImage",
  PANEL_DELETE_PROFILE_IMAGE_URL: "/SharePanel/DeleteProfileImage",
  PANEL_SELECT_PROFILE_IMAGE_URL: "/SharePanel/SelectProfileImage",

  //Student Panel Change pass
  PANEL_CHANGE_PASSWORD_URL: "/SharePanel/ChangePassword",

  //panel Admin

  PANEL_GET_ALL_USERS_URL: "/User/UserMannage",
  PANEL_GET_DETAILS_USERS_URL: "/User/UserDetails/",
  PANEL_GET_DETAILS_USERS_PAYMENT_LIST_URL: "/CoursePayment/UserPayList?",
  PANEL_GET_DETAILS_USERS_COMMENT_LIST_WITH_FILTER_URL:
    "/Course/CommentManagment",
  PANEL_GET_DETAILS_USERS_PAYMENT_DETAILS_URL: "/CoursePayment/",
  PANEL_ACCEPT_USERS_PAYMENT_DETAILS_URL: "/CoursePayment/Accept",
  PANEL_DELETE_USERS_PAYMENT_DETAILS_URL: "/CoursePayment",
  PANEL_DELETE_COURSE_GROUP_URL: "/CourseGroup",
  PANEL_EDIT_COURSE_GROUP_URL: "/CourseGroup",
  PANEL_GET_DETAILS_COURSE_RESERVE_URL: "/CourseReserve/",
  PANEL_GET_LIST_COURSE_RESERVE_URL: "/CourseReserve",
  PANEL_GET_LIST_COURSE_PAYMENT_URL:
    "/CoursePayment?CourseId=bc94984e-3328-ef11-b6c7-cc06a3e06235",
  PANEL_GET_DETAILS_NEWS_COMMENTS_URL: "/News/GetAdminNewsComments?NewsId=",
  PANEL_ADD_NEW_USER_URL: "/User/CreateUser",
  PANEL_GET_ALL_COURSES_ADMIN_URL: "/Course/CourseList",
  PANEL_GET_ALL_COURSE_GROUPS_ADMIN_URL: "/CourseGroup",
  PANEL_GET_ALL_TEACHERS_COURSES_ADMIN_URL: "/Course/TeacherCourseList",
  PANEL_GET_DETAILS_COURSE_URL: "/Course/",
  PANEL_GET_DETAILS_COURSE_GROUP_URL: "/CourseGroup/Details?",
  PANEL_GET_DETAILS_NEWS_URL: "/News/",
  PANEL_GET_ALL_COMMENTS_ADMIN_URL: "/Course/CommentManagment",
  PANEL_GET_CREATE_COURSE_STEP_ONE_ADMIN_URL: "/Course/GetCreate",
  PANEL_ADD_NEW_COURSE_STEP_TWO_ADMIN_URL: "/Course",
  PANEL_ADD_PAYMENT_STEP_ONE_URL: "/CoursePayment",
  PANEL_ADD_PAYMENT_STEP_TWO_URL: "/CoursePayment/AddPeymentImage",
  PANEL_ADD_NEW_COURSE_STEP_THIRD_ADMIN_URL: "/Course/AddCourseTechnology?",

  PANEL_ACCEPT_COMMENTS_ADMIN_URL: "/Course/AcceptCourseComment?",
  PANEL_NOT_ACCEPT_COMMENTS_ADMIN_URL: "/Course/RejectCourseComment?",
  PANEL_DELETE_COMMENTS_ADMIN_URL: "/Course/DeleteCourseComment?",

  PANEL_GET_ALL_NEWS_ADMIN_URL: "/News/AdminNewsFilterList",
  PANEL_GET_CATEGORY_NEWS_ADMIN_URL: "/News/GetListNewsCategory",
  PANEL_CREATE_NEWS_ADMIN_URL: "/News/CreateNews",
  PANEL_CREATE_NEWS_CATEGORY_ADMIN_URL: "/News/CreateNewsCategory",

  //change profile

  PANEL_UPDATE_USER_ADMIN_URL: "/User/UpdateUser",
  PANEL_UPDATE_COURSE_ADMIN_URL: "/Course",
  PANEL_UPDATE_NEWS_ADMIN_URL: "/News/UpdateNews",
  PANEL_UPDATE_NEWS_COMMENT_URL: "/News/UpdateNewsComment",
  PANEL_ACCEPT_RESERVE_ADMIN_URL: "/CourseReserve/SendReserveToCourse",
  PANEL_CHANGE_ACTIVITY_ADMIN_URL: "/Course/ActiveAndDeactiveCourse",
  PANEL_CHANGE_ACTIVITY_NEWS_ADMIN_URL: "/News/ActiveDeactiveNews",
  PANEL_ADD_NEW_COURSE_GROUP_URL: "/CourseGroup",
  // PANEL_COURSE_GROUP_ADMIN_URL: "/CourseGroup",
  PANEL_COURSE_GROUP_ADMIN_URL: "/CourseGroup/GetCourseGroup?",

  //level3

  PANEL_GET_LIST_ASSISTANCE_WORK_URL: "/AssistanceWork",
  PANEL_GET_DETAILS_ASSISTANCE_WORK_URL: "/AssistanceWork/",
  PANEL_UPDATE_DETAILS_ASSISTANCE_WORK_URL: "/AssistanceWork",
  //Building
  PANEL_GET_LIST_BUILDING_URL: "/Building",
  PANEL_GET_DETAILS_BUILDING_URL: "/Building/",
  PANEL_UPDATE_BUILDING_URL: "/Building",
  PANEL_UPDATE_STATUS_BUILDING_URL: "/Building/Active",
  //ClassRoom
  PANEL_LIST_CLASS_ROOM_URL: "/ClassRoom",
  PANEL_UPDATE_CLASS_ROOM_URL: "/ClassRoom",

  //AssistanceInCourses
  PANEL_ASSISTANCE_COURSE_URL: "/CourseAssistance",
};
