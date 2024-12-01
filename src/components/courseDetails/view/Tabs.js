// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  DollarSign,
  BookOpen,
  MessageCircle,
  Layers,
  Grid,
  Info,
} from "react-feather";

// ** User Components
import InvoiceList from "./InvoiceList";
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
// import BillingPlanTab from './BillingTab'
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
// import UserProjectsList from './UserProjectsList'

import { useGetAllCourseDetailsReserves } from "../../../core/services/api/Admin/handelReserveCourse";
import { useCoursesDetail } from "../../../core/services/api/DetailCourses/GetDetailCourses";
import {
  useCoursesComment,
  useCoursesPayMent,
  useCoursesPayMentDetailsWhoPayed,
  useCourseUserList,
  useGetAllListCourseCommentFilterCourseId,
} from "../../../core/services/api/CourseDetils/handelCooment";
import InvoiceList2 from "./InvoiceList2";
import InvoiceList3 from "./InvoiceList3";
import InvoiceList4 from "./InvoiceList4";
import PaymentListInCourse from "./PaymentListInCourse";
import { useGetGroupCourse } from "../../../core/services/api/Admin/handelreserve";
import ListOfGroupCourse from "./ListOfGroupCourse";
import MoreAboutCourse from "./MoreAboutCourse";
const CourseTabs = ({ active, toggleTab, data, id }) => {
  const { data: reserveList } = useGetAllCourseDetailsReserves(id);
  // const { data: CommentList } = useCoursesComment(id);

  const { data: CommentList } = useGetAllListCourseCommentFilterCourseId({
    total: 1012,
    curentPage: 1,
  });

  const { data: PayMentList } = useCoursesPayMent(id);
  const { data: WhoPayed } = useCoursesPayMentDetailsWhoPayed(id);
  const { data: UserList } = useCourseUserList(id);
  const { data: AllGroup } = useGetGroupCourse({
    teacherId: data?.teacherId,
    courseId: data?.courseId,
  });

  const [activeForBuy, setActiveForBuy] = useState("1");
  const toggleTabForBuy = (tab) => {
    if (activeForBuy !== tab) {
      setActiveForBuy(tab);
    }
  };

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دانشجو های دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <BookOpen className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <MessageCircle className="font-medium-3 me-50" />
            <span className="fw-bold"> نظرات دوره</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <DollarSign className="font-medium-3 me-50" />
            <span className="fw-bold">وضعیت پرداختی افراد</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <DollarSign className="font-medium-3 me-50" />
            <span className="fw-bold">لیست پرداختی ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "6"} onClick={() => toggleTab("6")}>
            <Grid className="font-medium-3 me-50" />
            <span className="fw-bold">لیست گروه ها </span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "7"} onClick={() => toggleTab("7")}>
            <Info className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطلاعات دوره</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <InvoiceList4 data={UserList} CourseDetails={data} />
        </TabPane>
        <TabPane tabId="2">
          <InvoiceList data={reserveList} CourseDetails={data} />
        </TabPane>

        <TabPane tabId="3">
          <InvoiceList2 data={CommentList} id={id} />
        </TabPane>

        <TabPane tabId="4">
          <InvoiceList3
            dataDonePay={WhoPayed?.donePays}
            notDonePays={WhoPayed?.notDonePays}
            id={id}
            toggleTab={toggleTabForBuy}
            active={activeForBuy}
          />
        </TabPane>

        <TabPane tabId="5">
          <PaymentListInCourse data={PayMentList} id={id} />
        </TabPane>

        <TabPane tabId="6">
          <ListOfGroupCourse data={AllGroup} />
        </TabPane>

        <TabPane tabId="7">
          <MoreAboutCourse data={data} />
        </TabPane>
      </TabContent>
      <modal2ForAcceptReserve />
    </Fragment>
  );
};
export default CourseTabs;
