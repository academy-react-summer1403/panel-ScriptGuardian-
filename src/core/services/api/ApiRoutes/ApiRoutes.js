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
  LANDING_COURSES_URL: "/Home/GetCoursesTop",
  LANDING_TEACHERS_URL: "/Home/GetTeachers",

  //News
  LANDING_NEWS_URL: "/News",
  ADD_RATE_NEWS_URL: "/News/NewsRate?",

  //Courses Page
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
};
