// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from "reactstrap";

// ** Demo Components
// import Tabs from "./Tabs";
// import Breadcrumbs from "@components/breadcrumbs";
// import BillingTabContent from "./BillingTabContent";
import AccountTabContent from "./AccountTabContent";
// import SecurityTabContent from "./SecurityTabContent";
// import ConnectionsTabContent from "./ConnectionsTabContent";
// import NotificationsTabContent from "./NotificationsTabContent";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const AddNewsCateGory = () => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <AccountTabContent />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddNewsCateGory;
