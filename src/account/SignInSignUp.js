import React, {useState, useEffect, useContext, useMemo} from 'react';
import {useParams, NavLink, useNavigate} from 'react-router-dom';
import { 
    Container, Box, TextField,Typography, ButtonBase, Grid, styled, 
    FormControl, FormLabel, FormGroup, FormControlLabel, InputBase, 
    IconButton, Divider, Tabs, Tab, InputAdornment, Dialog, DialogTitle, 
    DialogContent, DialogActions, 
} from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import  {StyledContainer} from '../Apparel/Apparel';
import { useAuth } from './useAuth'; 
import Alarm from '../Alarm';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const StyledTextField = styled(TextField, {
    name: "StyledTextField",
    })({
        '& .MuiInput-root:after': {
            borderBottom:'1px solid #1a1a1a'
        },
});

const initialValues = {
    name: '',
    age: '',
    accountID: '',
    password: '', 
    matchPassword: '',
    accountExisted: ''
};

const TabPanel = ({children, value, index}) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box mt={4} >
                    {children}
                </Box>
            )}
        </div>
    );
}

const SignInSignUp = () => {
    const [tabValue, setTabValue] = useState(1);
    const [inputValues, setInputValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const [inputError, setInputError] = useState({});
    const [instantErrors, setInstantErrors] = useState({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        resetForm();
        setShowPassword(false);
        setInstantErrors({});
    }

    const handleInputChange = (e) => {
        const {name, value,} = e.target;

        setInputValues({
            ...inputValues,
            [name]: value,
        })
    };

    const resetForm = () => {
        setInputValues(initialValues);
    };

    const handleClose = () => setOpen((open) => !open);
    // console.log("inputValues:",inputValues);

    const validation = () => {
        let temp = {};
        temp.name = inputValues.name ? "" : "此為必填欄位";
        temp.emptyAge = inputValues.age ? "" : "此為必填欄位";
        temp.age = (/^\d{1,2}$/).test(inputValues.age) ? "" : inputValues.age !== '' && "請輸入歲數";
        // temp.email = (/^\w+@{1}[A-Za-z0-9]+\.com$/).test(inputValues.email) ? "" : inputValues.email !== '' && "格式錯誤!";
        temp.accountID = inputValues.accountID ? "" : "此為必填欄位";
        temp.accountExisted = inputValues.accountExisted === 204 ? "" : (inputValues.accountExisted !== '' && inputValues.accountExisted !== undefined) && "此帳號已存在";
        temp.emptyPassword = inputValues.password ? "" : "此為必填欄位";
        // temp.password = (/[A-Za-z0-9]{6,15}/).test(inputValues.password) ? "" : inputValues.password !== '' && "格式錯誤!";
        temp.emptyMatchPW = inputValues.matchPassword ? "" : "此為必填欄位";
        temp.matchPassword = inputValues.matchPassword === inputValues.password ? "" : "兩次密碼未一致，請重新輸入!";
        
        setInputError({
            ...temp
        });

        setInstantErrors({
            ...temp
        });
        console.log("temp:",temp);
        return Object.values(temp).every(x => x === "");
    };
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };

    const handleSignInSubmit = async(e) => {
        e.preventDefault();
        const loggingin = await axios.post(`http://127.0.0.1:3001/dev/api/v1/systems/login`,
            {
                "account": inputValues.accountID,
                "password": inputValues.password
            }
        )
        .then(response => response.data)
        .catch(error => setOpen({
            signIn: true
        }) )

        let decoded = jwt_decode(loggingin.token);
        login(decoded.name, loggingin.token);
        // console.log('decoded:', loggingin.token);
    };

    const handleSignUpSubmit = async(e) => {
        e.preventDefault();
        if (validation()) {
            // gettingAccountID();
            const signUpInfo = await axios.post(`http://127.0.0.1:3001/dev/api/v1/users`,
                {
                    "account": inputValues.accountID,
                    "password": inputValues.password,
                    "name": inputValues.name,
                    "age": inputValues.age
                }
            )
            .then(response =>  setOpen({signUp: true}))
            .catch(error => console.log('createAccount:',error.response.data.message))
            setTimeout(() => 
                navigate("/account/profile")
            , 1500);
        };
    };

    const gettingAccountID = async() => {
        const accountID = await axios.get(`http://127.0.0.1:3001/dev/api/v1/users/account/${inputValues.accountID}`)
        .then(response => response.status)
        .catch(error => console.log('gettingAccountID:',error))

        setInputValues({
            ...inputValues,
            accountExisted: accountID
        })
    };

    useEffect (() => {
        if (tabValue === 2) {
            validation();
            setInputError({});
        };
    }, [inputValues]);

    return (
        <>
            <StyledContainer maxWidth="false" disableGutters sx={{pt:"124px"}}>
                <Divider/>
                <Container component="main" maxWidth="xs">
                    <Box mt={18} mb={39} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Tabs 
                            value={tabValue} 
                            textColor='inherit'
                            aria-label="tabs_datail" 
                            onChange={handleTabChange}
                            sx={{
                                borderBottom: 1, 
                                borderColor: 'divider',
                                "& .MuiTabs-indicator": {
                                    bgcolor: '#d43f3f'
                                },
                            }}
                        >
                            <Tab value={1} label="SIGN IN" sx={{fontWeight:'bold'}} disableRipple disableFocusRipple/>
                            <Tab value={2} label="SIGN UP" sx={{fontWeight:'bold'}} disableRipple disableFocusRipple/>
                        </Tabs>
                       
                        <Box component="form" onSubmit={handleSignInSubmit}>
                            <TabPanel value={tabValue} index={1} >
                                <Grid container spacing={4} mb={22}>
                                    <Grid item xs={12}>
                                        <StyledTextField
                                            variant="standard"
                                            name="accountID"
                                            value={inputValues.accountID}
                                            fullWidth
                                            // autoFocus
                                            placeholder='Account ID 會員帳號'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledTextField
                                            variant="standard"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={inputValues.password}
                                            fullWidth
                                            placeholder='Password 會員密碼 (6-15位英數字)'
                                            inputProps={{maxLength: 15}}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                "endAdornment":
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            size="small"
                                                            disableRipple
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonBase 
                                            variant="outlined"  
                                            type="submit"
                                            disableRipple
                                            sx={{
                                                border:'1px solid #1a1a1a', 
                                                height: 39, 
                                                width: "100%",
                                                "&:hover": {
                                                    border: 'none',
                                                    bgcolor: ' rgb(156, 143, 131, 0.5)'
                                                }
                                            }}
                                        >
                                            SIGN IN
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Box>

                        <Box component="form" onSubmit={handleSignUpSubmit}>
                            <TabPanel value={tabValue} index={2}>
                                <Typography component="h1" variant="h6" align="center" mb={2}>
                                    Welcome !
                                </Typography>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <StyledTextField 
                                            variant="standard"
                                            name="name"
                                            value={inputValues.name}
                                            fullWidth
                                            // autoFocus
                                            placeholder='Name 姓名'
                                            onChange={handleInputChange}
                                            {...(inputError.name && {error:true, helperText: inputError.name})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <StyledTextField
                                            variant="standard"
                                            name="age"
                                            value={inputValues.age}
                                            fullWidth
                                            placeholder='Age 年齡'
                                            onChange={handleInputChange}
                                            {...(inputError.emptyAge && {error:true, helperText: inputError.emptyAge})}
                                            {...(instantErrors.age && {error:true, helperText: instantErrors.age})}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledTextField
                                            variant="standard"
                                            name="accountID"
                                            value={inputValues.accountID}
                                            fullWidth
                                            placeholder='Account ID 會員帳號'
                                            onChange={handleInputChange}
                                            {...(inputError.accountID && {error:true, helperText: inputError.accountID})}
                                            {...(instantErrors.accountExisted && {error:true, helperText: instantErrors.accountExisted})}
                                            onBlur={gettingAccountID}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledTextField
                                            variant="standard"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={inputValues.password}
                                            fullWidth
                                            placeholder='Password 會員密碼 (6-15位英數字)'
                                            onChange={handleInputChange}
                                            inputProps={{maxLength: 15}}
                                            InputProps={{
                                                "endAdornment":
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            size="small"
                                                            disableRipple
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ,
                                            }}
                                            {...(inputError.emptyPassword && {error:true, helperText: inputError.emptyPassword})}
                                            {...(inputError.password && {error:true, helperText: inputError.password})}
                                            {...(instantErrors.password && {error:true, helperText: instantErrors.password})}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledTextField
                                            variant="standard"
                                            type={showPassword ? 'text' : 'password'}
                                            name="matchPassword"
                                            value={inputValues.matchPassword}
                                            fullWidth
                                            placeholder='Confirm password 密碼確認'
                                            onChange={handleInputChange}
                                            inputProps={{maxLength: 15}}
                                            {...(inputError.emptyMatchPW && {error:true, helperText: inputError.emptyMatchPW})}
                                            {...(inputError.matchPassword && {error:true, helperText: inputError.matchPassword})}
                                            {...(instantErrors.matchPassword && {error:true, helperText: instantErrors.matchPassword})}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonBase 
                                            variant="outlined"  
                                            type="submit"
                                            disableRipple
                                            sx={{
                                                border:'1px solid #1a1a1a', 
                                                height: 39, 
                                                width: "100%",
                                                "&:hover": {
                                                    border: 'none',
                                                    bgcolor: ' rgb(156, 143, 131, 0.5)'
                                                }
                                            }}
                                        >
                                            CREATE ACCOUNT
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Box>
                    </Box>
                </Container>
                <Alarm open={open.signIn || open.signUp} onClose={handleClose}>
                    {open.signIn ? 
                        (!inputValues.accountID && !inputValues.password ? "請輸入會員帳號及密碼" 
                        : (
                            !inputValues.accountID ? "請輸入會員帳號" 
                            : (
                                !inputValues.password ? "請輸入會員密碼"
                                : "帳號密碼錯誤 !" 
                            )
                        ))
                    : (open.signUp && "成功加入會員，請重新登入")
                    }
                </Alarm>
            </StyledContainer>
        </>
    )
}

export default SignInSignUp;