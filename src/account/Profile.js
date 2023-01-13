import React from 'react';
import { Box, Typography } from '@mui/material';
import HeaderNav from '../homepage/HeaderNav';
import  {StyledContainer} from '../apparel/Apparel';


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