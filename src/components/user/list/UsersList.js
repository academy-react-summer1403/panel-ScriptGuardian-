// ** User List Component
import Table from "./Table";
import { Fragment, useState } from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Clipboard,
  Book,
  Headphones,
} from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useGetAllUsers } from "../../../core/services/api/Admin/handelUsers";

const UsersList = () => {
  //TODO  : namayesh tedad user
  const [currentStatus, setCurrentStatus] = useState({
    value: true,
    label: "فعال",
  });

  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "همه ی نقش ها",
  });

  const { data } = useGetAllUsers({
    currentPage: null,
    rowsPerPage: null,
    IsActiveUser: currentStatus.value,
    roleId: currentRole.value,
  });

  //Handel Totals
  const totalUser = data?.totalCount;
  const roles = data?.roles;
  const { data: Admin } = useGetAllUsers({
    roleId: 1,
  });
  const totalAdminStor = Admin?.totalCount;

  const { data: Teacher } = useGetAllUsers({
    roleId: 2,
  });
  const totalTeacher = Teacher?.totalCount;

  const { data: Support } = useGetAllUsers({
    roleId: 10,
  });
  const totalSupport = Support?.totalCount;

  const statusOptions = () => {
    return [
      {
        value: true,
        label: "فعال",
      },
      {
        value: false,
        label: "غیرفعال",
      },
    ];
  };

  const RolesOptions = () => {
    const staticOption = {
      value: undefined, // ID یا مقدار مشخص
      label: "همه‌ی نقش‌ها", // نام نمایش داده شده برای گزینه‌ی ثابت
    };

    return data?.roles
      ? [
          staticOption,
          ...data.roles.map((role) => ({
            value: role.id, // آیتم‌های مپ‌شده
            label: role.roleName, // نام نقش
          })),
        ]
      : [];
  };

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle=" تعداد کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalUser}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle=" تعداد ادمین"
            icon={<Shield size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalAdminStor}</h3>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle=" تعداد معلم"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalTeacher}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle=" تعداد پشتیبان"
            icon={<Headphones size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{totalSupport}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col> */}
      </Row>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={RolesOptions(data)}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions()}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table currentStatus={currentStatus} currentRole={currentRole} />
    </div>
  );
};

export default UsersList;
