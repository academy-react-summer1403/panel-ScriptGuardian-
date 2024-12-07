import { Col, Row } from "reactstrap";
import {
  useDashBoardReport,
  useDashboardTechnologyReport,
  useLandingReport,
} from "../../core/services/api/Landing/LandingReport";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Book, Briefcase, FileText, Users } from "react-feather";

const FirstCompOfHome = () => {
  const { data } = useLandingReport();

  return (
    <>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد دوره ها"
            icon={<Book size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data && data.courseCount}</h3>
            }
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            color="secondary"
            statTitle=" تعداد خبر ها"
            icon={<FileText size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data && data.newsCount}</h3>
            }
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle=" تعداد اساتید"
            icon={<Briefcase size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data && data.teacherCount}</h3>
            }
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            color="info"
            statTitle=" تعداد دانشجو"
            icon={<Users size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data && data.studentCount}</h3>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default FirstCompOfHome;
