import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField, Button, IconButton, Input } from '@mui/material';
import { initialPost } from '../../DBModels/SocialMedia';
import { addPost } from '../../APIs/SocialMedia';
import Cookies from 'js-cookie';
import { getServerPosts } from '../../features/SocialMediaSlice';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';

const Newpost = () => {
    const [createNewPost, setCreateNewPost] = useState(initialPost)
    const [userInfo, setUserInfo] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
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
    const handleFileChange = (event) => {
        const imageData = new FormData();
        imageData.set("key", "59321fc5aa71ab6ce28cd0f90d68e86a");
        imageData.append("image", event.target.files[0]);
        fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: imageData,
        })
            .then((res) => res.json())
            .then((data) => setCreateNewPost({ ...createNewPost, img: data.data.display_url }));
    };
    useEffect(() => {
        setUserInfo(JSON.parse(Cookies.get('user')));
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            onChange={(e) => {
                                setCreateNewPost({ ...createNewPost, content: e.target.value })
                            }}
                            value={createNewPost?.content}
                            multiline
                            maxRows={4}
                            minRows={2}
                            label="What's on your mind?"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {
                        createNewPost?.img && <Grid item xs={12}>
                            <img src={createNewPost?.img} alt="" height={"250px"} />
                        </Grid>
                    }

                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <label htmlFor="icon-button-file-back">
                            <Input sx={{ display: "none" }} accept="image/*" id="icon-button-file-back" type="file"
                                onClick={(event) => {
                                    event.target.value = ""
                                }}
                                onChange={handleFileChange}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera fontSize='large' />
                            </IconButton>
                        </label>

                        <Button
                            size='small'
                            sx={{ ml: 2 }}
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