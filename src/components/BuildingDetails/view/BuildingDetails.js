// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Alert, Card } from "reactstrap";

// ** User View Components
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import {
  useGetAllCourseDetailsAdmin,
  useGetAllNewsDetailsAdmin,
  useGetAllUsersDetailsAdmin,
} from "../../../core/services/api/Admin/handelUsers";

import { useGetAssistanceWorkDetails } from "../../../core/services/api/Admin/HandelAssistanceWork";
import WorkTab from "./WorkTab";
import { useGetBuildingDetails } from "../../../core/services/api/Admin/handelBulding";
import MyMap from "../../common/MyMap";

const BuildingDetails = () => {
  const { id } = useParams();
  const { data } = useGetBuildingDetails(id);

  const [active, setActive] = useState("2");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //
  const [markerPosition, setMarkerPosition] = useState({
    initialLongitude: data?.longitude ? parseFloat(data.longitude) : 53.06,
    initialLatitude: data?.latitude ? parseFloat(data.latitude) : 36.59,
  });

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setMarkerPosition({
        initialLongitude: parseFloat(data.longitude),
        initialLatitude: parseFloat(data.latitude),
      });
    }
  }, [data]);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard data={data} ID={id} />
          {/* <PlanCard /> */}
        </Col>
        {/* <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <WorkTab
            active={active}
            data={data?.detailsNewsDto}
            toggleTab={toggleTab}
            id={id}
          />
        </Col> */}

        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <div className="">
            <Card className="" style={{width:"600px" , height:"500px"}}>
              <MyMap
                setMarkerPosition={setMarkerPosition}
                markerPosition={markerPosition}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BuildingDetails;
