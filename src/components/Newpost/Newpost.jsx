import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField, Button } from '@mui/material';
import { initialPost } from '../../DBModels/SocialMedia';
import { addPost } from '../../APIs/SocialMedia';
import Cookies from 'js-cookie';
import { getServerPosts } from '../../features/SocialMediaSlice';
import { useDispatch } from 'react-redux';

const Newpost = () => {
    const [createNewPost, setCreateNewPost] = useState(initialPost)
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch()
    const clear = () => {
        setCreateNewPost(initialPost)
    }
    const saveNewPost = async () => {
        addPost({ ...createNewPost, userref: userInfo?._id })
            .then(res => {
                if (res[0]) {
                    // openSuccess(res[1])
                    console.log(res[1]);
                    clear()
                    dispatch(getServerPosts());

                } else {
                    // openFailure(res[1])
                    console.log(res[1]);
                }
            })
    }
    useEffect(() => {
        setUserInfo(JSON.parse(Cookies.get('user')));
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <TextField
                            size="small"
                            onChange={(e) => {
                                setCreateNewPost({ ...createNewPost, content: e.target.value })
                            }}
                            value={createNewPost?.content}
                            multiline
                            maxRows={4}
                            label="What's on your mind?"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => saveNewPost()}
                        >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Newpost