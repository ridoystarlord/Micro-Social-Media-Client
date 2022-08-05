import { Button, Container, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { registerNewUser } from '../../../APIs/SocialMedia';
import { initailRegister } from '../../../DBModels/SocialMedia'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import MessageAlert from '../../../Resources/MessageAlert';
import { useDispatch } from 'react-redux';
import { setUserLoginDetails } from '../../../features/userSlice';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Register = ({ open, setOpen }) => {
    const [currentUser, setCurrentUser] = useState(initailRegister);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const ValidateCustomer = () => {
        if (!currentUser.name) return "Please Enter Your Name"
        if (!currentUser.email) return "Please Enter Your Email"
        if (!currentUser.password) return "Please Enter a Password"
        if (!currentUser.dateofbirth) return "Select Date of Birth"
        return ""
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = ValidateCustomer()
        if (err !== "") {
            setOpen({ show: true, type: "error", message: err });
            return
        }
        registerNewUser(currentUser)
            .then(res => {
                if (res[0]) {
                    Cookies.set('user', JSON.stringify(res[1].user), { expires: 7 })
                    setCurrentUser(initailRegister)
                    setOpen({ show: true, type: "success", message: "Registered Successfully" });
                    dispatch(setUserLoginDetails({
                        name: res[1]?.user?.name,
                        email: res[1]?.user?.useremail,
                        _id: res[1]?.user?._id,
                        gender: res[1]?.user?.gender,
                        birthday: res[1]?.user?.birthday
                    }))
                    navigate("/", { replace: true })

                } else {
                    console.log(res[1]);
                    setOpen({ show: true, type: "error", message: res[1] });
                }
            })
    }

    return (
        <>
            <MessageAlert open={open} setOpen={setOpen} />

            <Container sx={{ my: 2 }}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    onChange={(e) => {
                                        setCurrentUser({ ...currentUser, name: e.target.value })
                                    }}
                                    value={currentUser?.name}
                                    required
                                    label="Enter Your Name"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
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
                            <Grid item xs={3}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        value={currentUser?.gender ? "male" : "female"}
                                        onChange={(e) => {
                                            setCurrentUser({ ...currentUser, gender: e.target.value === "male" ? true : false })
                                        }}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={currentUser.dateofbirth}
                                        onChange={(date) => {
                                            setCurrentUser({ ...currentUser, dateofbirth: date })
                                        }}
                                        renderInput={(params) => <TextField size='small' {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    onClick={() => Register()}
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <span>Already have Account? </span><Link to="/" style={{ textDecoration: "none" }}>Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Register