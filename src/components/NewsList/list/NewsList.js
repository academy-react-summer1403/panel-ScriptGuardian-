// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Label,
  CardBody,
} from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { Book } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useGetAllNewsList } from "../../../core/services/api/Admin/handelUsers";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useState } from "react";

const CommentList = () => {
  const roleOptions = [
    { value: undefined, label: "همه ی خبر ها" },

    { value: "InsertDate", label: "تاریخ ایجاد" },
    { value: "updateDate", label: "تاریخ آپدیت" },
    { value: "currentView", label: "بر اساس بازدید" },
  ];

  const planOptions = [
    { value: "ASC", label: " صعودی" },
    { value: "DESC", label: " نزولی" },
  ];

  const activeOption = [
    { value: "true", label: " فعال" },
    { value: "false", label: " غیرفعال" },
  ];

  // const [sortType, setSortType] = useState();
  // const [sortCol, setCol] = useState();
  const [sortType, setSortType] = useState(planOptions[0]?.value);
  const [sortCol, setCol] = useState(undefined);
  const [active, setActive] = useState("true");

  const { data } = useGetAllNewsList({
    currentPage: null,
    rowsPerPage: null,
    SortingCol: sortCol,
    SortType: sortType,
    active: active,
  });
  const totalUser = data?.totalCount;

  return (
    <div className="app-user-list">
      {/* <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد خبر ها"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalUser}</h3>}
          />
        </Col>
      </Row> */}

      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">بر اساس</Label>
              <Select
                // isClearable={false}
                // isClearable={true}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                value={roleOptions.find((option) => option.value === sortCol)}
                // value={
                //   roleOptions.find((option) => option.value === sortCol) || null
                // }
                onChange={(data) => {
                  setCol(data.value || "");
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">صعودی /نزولی</Label>
              <Select
                theme={selectThemeColors}
                // isClearable={false}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={planOptions.find((option) => option.value === sortType)}
                // value={planOptions ?? planOptions[1]}
                onChange={(data) => {
                  setSortType(data.value);
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                // isClearable={false}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={activeOption}
                value={activeOption.find((option) => option.value === active)}
                // value={planOptions ?? planOptions[1]}
                onChange={(data) => {
                  setActive(data.value);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table sortType={sortType} sortCol={sortCol} active={active} />
    </div>
  );
};

export default CommentList;
