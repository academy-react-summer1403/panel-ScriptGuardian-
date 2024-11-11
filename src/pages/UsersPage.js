import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { useGetAllUsers } from "../core/services/api/Admin/handelUsers";

const UsersPage = () => {
  const { data } = useGetAllUsers();
  return <></>;
};

export default UsersPage;
