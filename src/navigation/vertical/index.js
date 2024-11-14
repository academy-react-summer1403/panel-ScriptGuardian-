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
    id: "CourseListPage",
    title: "دوره ها",
    icon: <Users size={20} />,
    navLink: "/CourseListPage",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
