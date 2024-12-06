// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Card,
} from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { Book } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useGetAllCourses } from "../../../core/services/api/Admin/handelUsers";

import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useState } from "react";
const CourseList = () => {
  const roleOptions = [
    { value: undefined, label: "همه ی دوره ها" },
    { value: "TypeName", label: "نوع دوره" },
    { value: "StatusName", label: "وضعیت دوره" },
    { value: "LevelName", label: "سطح دوره" },
    { value: "Cost", label: "قیمت" },
    { value: "LastUpdate", label: "آخرین ویرایش" },
    { value: "InsertDate", label: "تاریخ ایجاد" },
  ];

  const planOptions = [
    { value: "ASC", label: " صعودی" },
    { value: "DESC", label: " نزولی" },
  ];
  const [sortType, setSortType] = useState(undefined);
  const [sortCol, setCol] = useState(planOptions[0].value);

  const { data } = useGetAllCourses({
    currentPage: null,
    rowsPerPage: null,
    SortingCol: sortCol,
    SortType: sortType,
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

      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">بر اساس</Label>
              <Select
                isClearable={false}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setSortType(data.value);
                }}
                value={roleOptions.find((option) => option.value === sortType)}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                onChange={(data) => {
                  setCol(data.value);
                }}
                value={planOptions.find((option) => option.value === sortCol)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table sortCol={sortCol} sortType={sortType} />
    </div>
  );
};

export default CourseList;
