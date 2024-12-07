// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, DollarSign } from "react-feather";

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
} from "../../../core/services/api/CourseDetils/handelCooment";
import InvoiceList2 from "./InvoiceList2";
import InvoiceList3 from "./InvoiceList3";
import InvoiceList4 from "./InvoiceList4";
import PaymentListInCourse from "./PaymentListInCourse";
import CourseUserListDto from "./CourseUserListDto";
const CourseTabs = ({ active, toggleTab, data, id }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دانشجو های دوره</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseUserListDto data={data} />
        </TabPane>
      </TabContent>
      <modal2ForAcceptReserve />
    </Fragment>
  );
};
export default CourseTabs;
