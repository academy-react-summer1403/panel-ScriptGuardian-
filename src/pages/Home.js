import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";
import FirstCompOfHome from "../components/home/FirstCompOfHome";
import SecoundOfHome from "../components/home/SecoundOfHome";
import {
  useDashBoardReport,
  useDashboardTechnologyReport,
} from "../core/services/api/Landing/LandingReport";
import ThirdPageOfHome from "../components/home/ThirdPageOfHome";

const Home = () => {
  const { data: DashBoardReport } = useDashBoardReport();
  const { data: DashboardTechnologyReport } = useDashboardTechnologyReport();
  return (
    <>
      <FirstCompOfHome />
      <Row>
        <Col xs="6">
          <SecoundOfHome DashBoardReport={DashBoardReport} />
        </Col>
        <Col xs="6">
          <ThirdPageOfHome DashBoardReport={DashBoardReport} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
