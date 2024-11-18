import { Mail, Home, Airplay, Circle, Users } from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "UsersPage",
    title: "کاربران",
    icon: <Users size={20} />,
    navLink: "/UsersPage",
  },
  {
    id: "Course",
    title: "دوره ها",
    icon: <Users size={20} />,
    children: [
      {
        id: "CourseListPage",
        title: "همه ی  دوره",
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
        id: "CourseReserved",
        title: " دوره های رزرو شده",
        icon: <Circle size={12} />,
        navLink: "/CourseReserved",
      },
    ],
  },
  {
    id: "Comments",
    title: "نظرات",
    icon: <Airplay size={20} />,
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
    title: "اخبار",
    icon: <Airplay size={20} />,
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
