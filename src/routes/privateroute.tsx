import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    if (!auth.isAuthenticated) {
            return <Navigate to="/"/>;
    }
    return children;

};
export default PrivateRoute;