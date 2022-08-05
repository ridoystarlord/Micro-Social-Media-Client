import React, { useEffect, useState } from 'react'
import { Grid, Paper, Box, Stack, Badge, Avatar, Typography, Divider } from '@mui/material';
import Comment from '../Comment/Comment';
import { BiLike, BiDislike, BiComment } from 'react-icons/bi'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { addNewDownVote, addNewUpVote } from '../../APIs/SocialMedia';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getServerPosts } from '../../features/SocialMediaSlice';
TimeAgo.addDefaultLocale(en)

const SinglePost = ({ post }) => {
    const [showComment, setShowComment] = useState(false)
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch()
    const timeAgo = new TimeAgo('en-US')
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#00acc1',
                width: 22,
                height: 22,
                fontSize: '100%',
                textTransform: "uppercase"
            },
            children: `${name?.split('')[0]}`,
        };
    }

    const addNewUpVoteToPost = () => {
        addNewUpVote(post?._id, { userref: userInfo?._id })
            .then(res => {
                if (res[0]) {
                    console.log(res[1]);
                    dispatch(getServerPosts());
                } else {
                    console.log(res[1]);
                }
            })
    }
    const addNewDownVoteToPost = () => {
        addNewDownVote(post?._id, { userref: userInfo?._id })
            .then(res => {
                if (res[0]) {
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
        <Grid item xs={12} md={12} lg={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box display='flex' alignItems='center'>
                            <Stack direction="row" spacing={2}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        post?.userref?.name ? <Avatar {...stringAvatar(post?.userref?.name)} /> : ""
                                    }
                                >
                                    <Avatar />
                                </Badge>
                            </Stack>
                            <Box marginLeft='15px'>
                                <Typography
                                    sx={{ textTransform: 'uppercase', color: '#00acc1', fontWeight: 'bold', fontSize: 12, cursor: 'pointer' }}>
                                    {post?.userref?.name}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 12, cursor: 'pointer', mr: 1 }}>
                                    {timeAgo.format(new Date(post?.posttime))}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {
                        post?.content && <Grid item xs={12} md={12} lg={12}>
                            <Typography
                                variant='body1'
                                gutterBottom
                            >
                                {post?.content}
                            </Typography>
                        </Grid>
                    }
                    {
                        post?.img && <Grid item xs={12} md={12} lg={12}>
                            <img src={post?.img} alt="" width={"100%"} />
                        </Grid>
                    }
                    <Grid item xs={12} md={12} lg={12}>
                        <Divider fullWidth />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => addNewUpVoteToPost()}>
                                <Typography sx={{ mr: "0.5rem" }}>{post?.upvote?.length}</Typography><BiLike />
                            </Grid>
                            <Grid item xs={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => addNewDownVoteToPost()}>
                                <Typography sx={{ mr: "0.5rem" }}>{post?.downvote?.length}</Typography><BiDislike />
                            </Grid>
                            <Grid item xs={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => setShowComment(!showComment)}>
                                <Typography sx={{ mr: "0.5rem" }}>{post?.comments?.length}</Typography><BiComment />
                            </Grid>
                            {
                                showComment && <Grid item xs={12}>
                                    <Comment post={post} />
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default SinglePost