import { Button, Container, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { loginUser } from '../../../APIs/SocialMedia'
import { initailLogin } from '../../../DBModels/SocialMedia'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserLoginDetails } from '../../../features/userSlice'
import MessageAlert from '../../../Resources/MessageAlert'


const Login = ({ open, setOpen }) => {
    const [currentUser, setCurrentUser] = useState(initailLogin);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(currentUser)
            .then(res => {
                if (res[0]) {
                    Cookies.set('user', JSON.stringify(res[1].user), { expires: 7 })
                    setCurrentUser(initailLogin)
                    setOpen({ show: true, type: "success", message: "Login Successfully" });
                    navigate("/", { replace: true })
                    dispatch(setUserLoginDetails({
                        name: res[1]?.user?.name,
                        email: res[1]?.user?.useremail,
                        _id: res[1]?.user?._id,
                        gender: res[1]?.user?.gender,
                        birthday: res[1]?.user?.birthday
                    }))
                } else {
                    setOpen({ show: true, type: "error", message: res[1] });
                }
            })
    }
    return (<>
        <MessageAlert open={open} setOpen={setOpen} />
        <Container sx={{ my: 2 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                onChange={(e) => {
                                    setCurrentUser({ ...currentUser, email: e.target.value })
                                }}
                                value={currentUser?.email}
                                required
                                type="email"
                                label="Enter Your Email"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                onChange={(e) => {
                                    setCurrentUser({ ...currentUser, password: e.target.value })
                                }}
                                value={currentUser?.password}
                                required
                                label="Enter Your Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                                onClick={() => Login()}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <span>Create An Accout? </span><Link to="/register" style={{ textDecoration: "none" }}>Click here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </>
    )
}

export default Login