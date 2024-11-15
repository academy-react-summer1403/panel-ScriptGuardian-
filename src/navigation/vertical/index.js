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
    ],
  },
];
