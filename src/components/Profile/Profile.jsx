import { Avatar, Grid, IconButton, Paper, Typography } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
// import { GetAllPosts } from '../../APIs/SocialMedia';
import { useSelector } from "react-redux";
import { selectUserBirthday, selectUserEmail, selectUserGender, selectUserId, selectUserName } from '../../features/userSlice';
const Profile = () => {
    const userEmail = useSelector(selectUserEmail);
    const userName = useSelector(selectUserName);
    const userID = useSelector(selectUserId);
    const userGender = useSelector(selectUserGender);
    const userBirthday = useSelector(selectUserBirthday);
    const [userInfo, setUserInfo] = useState(null);
    // const [totalPost, setTotalPost] = useState([])


    // const getSingleUserDetails = () => {
    //     const filter = {
    //         userref: userInfo?._id,
    //         userrefisused: true
    //     }
    //     GetAllPosts(filter)
    //         .then(res => {
    //             if (res[0]) {
    //                 console.log(res[1]);
    //                 res[1] ? setTotalPost(res[1]) : setTotalPost([])
    //             } else {
    //                 console.log(res[1]);
    //             }
    //         })
    // }

    // useEffect(() => {
    //     getSingleUserDetails()
    // }, [userInfo])
    useEffect(() => {
        setUserInfo(Cookies?.get('user') ? JSON?.parse(Cookies?.get('user')) : null);
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
                <IconButton sx={{ mb: "0.5rem" }}>
                    <Avatar alt={userName ? userName : userInfo?.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    {userName ? userName : userInfo?.name}
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                >
                    {userEmail ? userEmail : userInfo?.useremail}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <span>{new Date(userBirthday ? userBirthday : userInfo?.birthday).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <span>{userGender ? userGender : userInfo?.gender ? "Male" : "Female"}</span>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Profile