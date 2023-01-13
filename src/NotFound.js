import { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Typography, Paper,} from '@mui/material';
import HeaderNav from './homepage/HeaderNav';
import {StyledContainer} from './apparel/Apparel';


function NotFound() {
    const navigate = useNavigate ();

    useEffect ( () => {
        setTimeout ( () => {
            navigate("/", {state: "Page Not Found"});
        }, 1000)
    }, [])

    return (
        <> 
            <StyledContainer sx={{ margin: 'auto',}}>
                <HeaderNav sectionName="homeSections"/>
                <Paper elevation={0} sx={{marginY:"350px"}}>
                    <Typography variant="h4" align="center" >Page Not Found, returning Home...</Typography>
                </Paper>
            </StyledContainer>
        </>
    )
}

export default NotFound;