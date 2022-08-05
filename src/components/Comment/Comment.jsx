import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button } from '@mui/material';
import { BiCommentAdd } from 'react-icons/bi'
import SingleComment from './SingleComment';
import { addNewComment } from '../../APIs/SocialMedia';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getServerPosts } from '../../features/SocialMediaSlice';

const Comment = ({ post }) => {
    const [currentComment, setCurrentComment] = useState("")
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch()
    const addNewCommentToPost = () => {
        addNewComment(post?._id, { userref: userInfo?._id, content: currentComment })
            .then(res => {
                if (res[0]) {
                    setCurrentComment("")
                    dispatch(getServerPosts());
                } else {
                    console.log(res[1]);
                }
            })
    }
    useEffect(() => {
        setUserInfo(JSON.parse(Cookies.get('user')));
    }, [])
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <TextField
                        size="small"
                        onChange={(e) => setCurrentComment(e.target.value)}
                        value={currentComment}
                        maxRows={4}
                        multiline
                        label="Write a comment..."
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => addNewCommentToPost()}
                    >
                        <BiCommentAdd fontSize="1.5rem" />
                    </Button>
                </Grid>
                {
                    post?.comments?.map(comment => <SingleComment comment={comment} />)
                }

            </Grid>
        </>
    )
}

export default Comment