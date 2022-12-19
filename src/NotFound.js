import { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Typography,} from '@mui/material';
import HeaderNav from './homepage/HeaderNav';
import {StyledContainer} from './Apparel/Apparel';


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
                <Typography variant="h4" align="center" >Page Not Found, returning Home...</Typography>
            </StyledContainer>
        </>
    )
}

export default NotFound;