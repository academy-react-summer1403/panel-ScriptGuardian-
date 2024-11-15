import { useParams } from "react-router-dom";
import UserDetails from "../components/userDetils/view/UserDetails";
const UserDetailsPage = () => {
  // const { id } = useParams();
  return (
    <>
      {" "}
      <UserDetails />{" "}
    </>
  );
};

export default UserDetailsPage;
