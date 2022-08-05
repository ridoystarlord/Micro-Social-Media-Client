import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getServerPosts } from '../../features/SocialMediaSlice';
import MessageAlert from '../../Resources/MessageAlert';
import AllPost from '../AllPost/AllPost';
import AllUsers from '../AllUsers/AllUsers';
import Newpost from '../Newpost/Newpost';
import Profile from '../Profile/Profile';


const Homepage = ({ open, setOpen }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServerPosts());
    }, [])

    return (
        <>
            <MessageAlert open={open} setOpen={setOpen} />

            <Container maxWidth="xl" sx={{ my: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Profile />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box sx={{ height: "84vh", overflowY: "scroll", p: 1 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Newpost />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <AllPost />
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <AllUsers />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Homepage