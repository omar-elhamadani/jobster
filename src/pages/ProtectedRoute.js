import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (user) {
    return children;
  } else {
    return <Navigate to="/landing" />;
  }
};
export default ProtectedRoute;
