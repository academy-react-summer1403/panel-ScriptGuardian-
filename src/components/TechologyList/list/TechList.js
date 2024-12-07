// ** Styles
import "@styles/react/apps/app-users.scss";
import { useGetAllCourses } from "../../../core/services/api/Admin/handelUsers";
import TechTable from "./TechTable";

const TechList = () => {
  const { data } = useGetAllCourses({ currentPage: null, rowsPerPage: null });
  const totalUser = data?.totalCount;

  return (
    <div className="app-user-list">
      {/* <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد دوره ها"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalUser}</h3>}
          />
        </Col>
      </Row> */}
      <TechTable />
    </div>
  );
};

export default TechList;
