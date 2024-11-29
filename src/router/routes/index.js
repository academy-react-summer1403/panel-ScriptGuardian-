// ** React Imports
import { Fragment, lazy, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { getItem } from "../../core/services/storage/storage.services.js";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Home = lazy(() => import("../../pages/Home"));
const UsersPage = lazy(() => import("../../pages/UsersPage"));
const UserDetailsPage = lazy(() => import("../../pages/UserDetailsPage"));
const CourseListPage = lazy(() => import("../../pages/CourseListPage"));
const CourseTeacherListPage = lazy(() =>
  import("../../pages/CourseTeacherListPage")
);
const CourseDetailPage = lazy(() => import("../../pages/CourseDetailPage"));
const AddCoursePage = lazy(() => import("../../pages/AddCoursePage"));
const CommentListPage = lazy(() => import("../../pages/CommentListPage"));
const NewsListPage = lazy(() => import("../../pages/NewsListPage.js"));
const AddNewsCateGoryPage = lazy(() =>
  import("../../pages/AddNewsCateGoryPage")
);
const AddNewsPage = lazy(() => import("../../pages/AddNewsPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const NewsDetailsPage = lazy(() => import("../../pages/NewsDetailsPage"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const CourseReservedPage = lazy(() => import("../../pages/CourseReservedPage"));
const PaymentListPage = lazy(() => import("../../pages/PaymentListPage"));
const CourseGroupPage = lazy(() => import("../../pages/CourseGroupPage"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/UsersPage",
    element: <UsersPage />,
  },
  {
    path: "/UsersPage/:id",
    element: <UserDetailsPage />,
  },
  {
    path: "/CourseListPage",
    element: <CourseListPage />,
  },
  {
    path: "/CourseTeacherListPage",
    element: <CourseTeacherListPage />,
  },
  {
    path: "/PaymentListPage",
    element: <PaymentListPage />,
  },
  {
    path: "/CourseGroupPage",
    element: <CourseGroupPage />,
  },
  {
    path: "/CourseListPage/:id",
    element: <CourseDetailPage />,
  },
  {
    path: "/createCourse",
    element: <AddCoursePage />,
  },
  {
    path: "/CourseReserved",
    element: <CourseReservedPage />,
  },
  {
    path: "/CommentsListPage",
    element: <CommentListPage />,
  },
  {
    path: "/AddNewsCateGoryPage",
    element: <AddNewsCateGoryPage />,
  },
  {
    path: "/NewsListPage/:id",
    element: <NewsDetailsPage />,
  },
  {
    path: "/NewsListPage",
    element: <NewsListPage />,
  },
  {
    path: "/AddNewsPage",
    element: <AddNewsPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const token = getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
