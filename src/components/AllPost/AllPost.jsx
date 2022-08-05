import React from 'react'
import { Grid } from '@mui/material';
import SinglePost from '../SinglePost/SinglePost';
import {  useSelector } from 'react-redux';
import { allPosts } from '../../features/SocialMediaSlice';

const AllPost = () => {
    const allServerPost = useSelector(allPosts);
    return (
        <>
            <Grid container spacing={2}>
                {
                    allServerPost.map(post => <SinglePost post={post} />)
                }
            </Grid>
        </>
    )
}

export default AllPost