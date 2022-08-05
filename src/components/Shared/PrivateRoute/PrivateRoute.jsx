import { CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState(null);
    let location = useLocation();
    useEffect(() => {
        setUserInfo(JSON.parse(Cookies.get('user')));
        setIsLoading(false)
    }, [])
    if (isLoading) {
        return <CircularProgress color="success" />
    }
    if (userInfo.useremail) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;