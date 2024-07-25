
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, roles }) => {
  const { user } = useContext(AuthContext);
  // In PrivateRoute component
  console.log('User:', user);
  console.log('Required Roles:', roles);


  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;


// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const PrivateRoute = ({ component: Component, roles }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return <Component />;
// };

// export default PrivateRoute;
