import React from 'react'
import { Grid, Box, Stack, Badge, Avatar, Typography } from '@mui/material';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

const SingleComment = ({ comment }) => {
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
    return (
        <Grid item xs={12}>
            <Box display='flex' alignItems='center'>
                <Stack direction="row" spacing={2}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={comment?.userref?.name ? <Avatar {...stringAvatar(comment?.userref?.name)} /> : ""}
                    >
                        <Avatar />
                    </Badge>
                </Stack>
                <Box marginLeft='15px'>
                    <Typography
                        sx={{ textTransform: 'uppercase', color: '#00acc1', fontWeight: 'bold', fontSize: 12, cursor: 'pointer' }}>
                        {`${comment?.userref?.name} ${comment?.commenttime ? "| " + timeAgo?.format(new Date(comment?.commenttime)) : `${comment?.userref?.name}`}`}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 12, cursor: 'pointer', mr: 1 }}>
                        {comment?.content}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default SingleComment