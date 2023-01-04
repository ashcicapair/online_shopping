import React, {useState, useEffect, } from 'react';
import {useParams, NavLink, useNavigate} from 'react-router-dom';
import { 
    Container, Box, TextField,Typography, ButtonBase, Grid, styled, 
    FormControl, FormLabel, FormGroup, FormControlLabel, InputBase, 
    IconButton, Divider, Tabs, Tab, InputAdornment, Dialog, DialogTitle, 
    DialogContent, DialogActions, 
} from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import HeaderNav from '../homepage/HeaderNav';
import  {StyledContainer} from '../Apparel/Apparel';


const Profile = () => {

    return (
        <>
            <HeaderNav sectionName="homeSections"/>
            <StyledContainer maxWidth="false" disableGutters>
                <Box pt={10} pb={88}>
                    <Typography component="h1" variant="h5" align="center">Hi,  {JSON.parse(localStorage.username)} !</Typography>
                </Box>
            </StyledContainer>
        </>
    )
}

export default Profile;