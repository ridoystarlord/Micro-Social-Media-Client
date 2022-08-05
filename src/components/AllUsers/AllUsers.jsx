import { Divider, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { allUsers, getServerUsers } from '../../features/userSlice';

const AllUsers = () => {
    const dispatch = useDispatch();
    const allServerUsers = useSelector(allUsers);

    useEffect(() => {
        dispatch(getServerUsers());
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ p: 2, overflowY: "scroll", height: "82vh" }}>
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    All Users
                </Typography>
                <Divider fullWidth sx={{ mb: 1 }} />
                {
                    allServerUsers?.map((user, index) =>
                        <Typography
                            variant="body1"
                            gutterBottom
                        >
                            {`${index + 1}. ${user.name}`}
                        </Typography>)
                }
            </Paper>
        </>
    )
}

export default AllUsers