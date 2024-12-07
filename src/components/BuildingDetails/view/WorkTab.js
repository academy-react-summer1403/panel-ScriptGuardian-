// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  MessageSquare,
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
import { useGetAllNewsComments } from "../../../core/services/api/Admin/handelDetailsNews";
import MoreInFormAboutNew from "./MoreInFormAboutNew";
const WorkTab = ({ active, toggleTab, id, data }) => {
  const { data: commentList } = useGetAllNewsComments(id);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            {/* <Lock className="font-medium-3 me-50" /> */}
            <Info size={20} />
            <span className="fw-bold">اطلاعات خبر</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold"> نظرات</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <InvoiceList data={commentList} />
        </TabPane>

        <TabPane tabId="2">
          <MoreInFormAboutNew data={data} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default WorkTab;
