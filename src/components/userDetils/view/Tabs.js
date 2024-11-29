// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, DollarSign } from "react-feather";

// ** User Components
import InvoiceList from "./InvoiceList";
import InvoiceList2 from "./InvoiceList2";
import { useGetAllListUsersPayment } from "../../../core/services/api/Admin/handelUsers";
import PaymentList from "./PaymentList";
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
// import BillingPlanTab from './BillingTab'
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
// import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, data, id }) => {
  const { data: UserPayMentList } = useGetAllListUsersPayment(id);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <DollarSign className="font-medium-3 me-50" />
            <span className="fw-bold">لیست پرداختی ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <InvoiceList2 data={data?.courses} />
          {/* <UserProjectsList />
          <UserTimeline /> */}
          {/* <InvoiceList /> */}
        </TabPane>

        <TabPane tabId="2">
          {/* <UserProjectsList />
          <UserTimeline /> */}
          <InvoiceList data={data?.coursesReseves} />
        </TabPane>

        <TabPane tabId="3">
          {/* <UserProjectsList />
          <UserTimeline /> */}
          <PaymentList data={UserPayMentList} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
