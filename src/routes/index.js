import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, isAuthenticated, redirectUrl }) => {
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to={redirectUrl} />;
};

export default PrivateRoutes;
