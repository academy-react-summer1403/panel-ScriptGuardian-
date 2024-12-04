import {
  Mail,
  Home,
  Airplay,
  Circle,
  Users,
  Book,
  MessageCircle,
  FileText,
} from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "UsersPage",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    navLink: "/UsersPage",
  },
  {
    id: "Course",
    title: " مدیریت دوره ها",
    icon: <Book size={20} />,
    children: [
      {
        id: "CourseListPage",
        title: "همه ی  دورها",
        icon: <Circle size={12} />,
        navLink: "/CourseListPage",
      },
      {
        id: "createCourse",
        title: "ایجاد دوره",
        icon: <Circle size={12} />,
        navLink: "/createCourse",
      },
      {
        id: "CourseTeacherListPage",
        title: "دوره های من (استاد)",
        icon: <Circle size={12} />,
        navLink: "/CourseTeacherListPage",
      },
      {
        id: "CourseReserved",
        title: " دوره های رزرو شده",
        icon: <Circle size={12} />,
        navLink: "/CourseReserved",
      },
      {
        id: "PaymentListPage",
        title: "لیست پرداخت ها",
        icon: <Circle size={12} />,
        navLink: "/PaymentListPage",
      },

      {
        id: "CourseGroupPage",
        title: "گروه دوره ها",
        icon: <Circle size={12} />,
        navLink: "/CourseGroupPage",
      },

      {
        id: "AssistanceWorkPage",
        title: "AssistanceWorkPage",
        icon: <Circle size={12} />,
        navLink: "/AssistanceWorkPage",
      },

      {
        id: "BuildingPage",
        title: "BuildingPage",
        icon: <Circle size={12} />,
        navLink: "/BuildingPage",
      },

      {
        id: "ClassRoomPage",
        title: "ClassRoomPage",
        icon: <Circle size={12} />,
        navLink: "/ClassRoomPage",
      },

      {
        id: "CourseAssistancePage",
        title: "CourseAssistancePage",
        icon: <Circle size={12} />,
        navLink: "/CourseAssistancePage",
      },

      {
        id: "CourseLevelPage",
        title: "CourseLevelPage",
        icon: <Circle size={12} />,
        navLink: "/CourseLevelPage",
      },

      {
        id: "DepartmentPage",
        title: "DepartmentPage",
        icon: <Circle size={12} />,
        navLink: "/DepartmentPage",
      },

      {
        id: "JobHistoryPage",
        title: "JobHistoryPage",
        icon: <Circle size={12} />,
        navLink: "/JobHistoryPage",
      },
      {
        id: "StatusListPage",
        title: "StatusListPage",
        icon: <Circle size={12} />,
        navLink: "/StatusListPage",
      },
    ],
  },
  {
    id: "Comments",
    title: "مدیریت نظرات",
    icon: <MessageCircle size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "AllComments",
        title: "همه ی نظرها",
        icon: <Circle size={12} />,
        navLink: "/CommentsListPage",
      },
    ],
  },

  {
    id: "NewsListPage",
    title: "مدیریت اخبار",
    icon: <FileText size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "AllNewsListPage",
        title: "همه ی خبر ها",
        icon: <Circle size={12} />,
        navLink: "/NewsListPage",
      },

      {
        id: "AddNewsPage",
        title: "اضافه کردن خبر جدید",
        icon: <Circle size={12} />,
        navLink: "/AddNewsPage",
      },
      {
        id: "AddNewsCateGoryPage",
        title: "اضافه کردن دسته بندی جدید",
        icon: <Circle size={12} />,
        navLink: "/AddNewsCateGoryPage",
      },
    ],
  },
];
