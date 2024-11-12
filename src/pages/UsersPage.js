import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { useGetAllUsers } from "../core/services/api/Admin/handelUsers";
import UsersList from "../components/user/list/UsersList";
const UsersPage = () => {
  return <>
    <UsersList/>
  </>;
};

export default UsersPage;
