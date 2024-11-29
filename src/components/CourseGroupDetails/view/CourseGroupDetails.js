// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import {
  useGetAllCourseDetailsAdmin,
  useGetAllCourseGroupDetails,
  useGetAllUsersDetailsAdmin,
} from "../../../core/services/api/Admin/handelUsers";
import CourseTabs from "./Tabs";

const CourseGroupDetails = () => {
  const { id } = useParams();
  const { data } = useGetAllCourseGroupDetails(id);
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard data={data?.courseGroupDto} />
          {/* <PlanCard /> */}
        </Col>
        {/* <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseTabs
            active={active}
            data={data}
            toggleTab={toggleTab}
            id={id}
          />
        </Col> */}
      </Row>
    </div>
  );
};
export default CourseGroupDetails;