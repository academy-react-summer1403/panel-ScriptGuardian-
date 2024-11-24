// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { Book } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useGetAllCourses, useGetAllTeacherCourses } from "../../../core/services/api/Admin/handelUsers";

const CourseTeacherList = () => {
  const { data } = useGetAllTeacherCourses({
    currentPage: null,
    rowsPerPage: null,
  });
  const totalUser = data?.totalCount;

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد دوره ها"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalUser}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default CourseTeacherList;
