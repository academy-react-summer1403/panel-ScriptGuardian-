import {
  Mail,
  Home,
  Airplay,
  Circle,
  Users,
  Book,
  MessageCircle,
  FileText,
  Briefcase,
  Award,
  UserCheck,
  HelpCircle,
  BookOpen,
  Map,
  MapPin,
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
        id: "CourseFeature",
        title: "ویژگی های دوره",
        icon: <BookOpen size={12} />,
        children: [
          {
            id: "CourseGroupPage",
            title: "گروه دوره ها",
            icon: <Circle size={12} />,
            navLink: "/CourseGroupPage",
          },
          {
            id: "CourseLevelPage",
            title: "سطح دوره",
            icon: <Circle size={12} />,
            navLink: "/CourseLevelPage",
          },

          {
            id: "StatusListPage",
            title: "لیست وضعیت دوره",
            icon: <Circle size={12} />,
            navLink: "/StatusListPage",
          },

          {
            id: "TechnologyListPage",
            title: "لیست تکنولوژی دوره",
            icon: <Circle size={12} />,
            navLink: "/TechnologyListPage",
          },
          {
            id: "TermPage",
            title: "لیست ترم های دوره",
            icon: <Circle size={12} />,
            navLink: "/TermPage",
          },
        ],
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
    ],
  },

  {
    id: "Mentors",
    title: "مدیریت منتور",
    icon: <UserCheck size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "CourseAssistancePage",
        title: "لیست منتور ها  در دوره ها",
        icon: <Circle size={12} />,
        navLink: "/CourseAssistancePage",
      },

      {
        id: "AssistanceWorkPage",
        title: "لیست کار های منتور",
        icon: <Circle size={12} />,
        navLink: "/AssistanceWorkPage",
      },
    ],
  },

  {
    id: "location",
    title: "مدیریت محل  برگزاری",
    icon: <MapPin size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "BuildingPage",
        title: " لیست ساختمان ها",
        icon: <Circle size={12} />,
        navLink: "/BuildingPage",
      },

      {
        id: "DepartmentPage",
        title: " لیست دپارتمان ها ",
        icon: <Circle size={12} />,
        navLink: "/DepartmentPage",
      },

      {
        id: "ClassRoomPage",
        title: "لیست کلاس ها",
        icon: <Circle size={12} />,
        navLink: "/ClassRoomPage",
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

  {
    id: "JobHistoryPage",
    title: "سابقه کاری",
    icon: <Briefcase size={12} />,
    navLink: "/JobHistoryPage",
  },
];
