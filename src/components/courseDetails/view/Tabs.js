// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";

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
} from "../../../core/services/api/CourseDetils/handelCooment";
import InvoiceList2 from "./InvoiceList2";
import InvoiceList3 from "./InvoiceList3";
const CourseTabs = ({ active, toggleTab, data, id }) => {
  const { data: reserveList } = useGetAllCourseDetailsReserves(id);
  const { data: CommentList } = useCoursesComment(id);
  const { data: PayMentList } = useCoursesPayMent(id);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold"> نظرات دوره</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">خرید های دوره</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {/* <UserProjectsList />
          <UserTimeline /> */}
          <InvoiceList data={reserveList} />
        </TabPane>

        <TabPane tabId="2">
          <InvoiceList2 data={CommentList} />
        </TabPane>

        <TabPane tabId="3">
          <InvoiceList3 data={PayMentList} id={id} />
        </TabPane>
        {/* <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='3'>
          <BillingPlanTab />
        </TabPane>
        <TabPane tabId='4'>
          <Notifications />
        </TabPane>
        <TabPane tabId='5'>
          <Connections />
        </TabPane> */}
      </TabContent>
      <modal2ForAcceptReserve />
    </Fragment>
  );
};
export default CourseTabs;
