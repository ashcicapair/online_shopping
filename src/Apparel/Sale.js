import React from 'react';
import { 
    Box, Typography, 
} from '@mui/material';
import HeaderNav from '../homepage/HeaderNav';
import {StyledContainer} from './Apparel';


function Sale() {
    return (
        <>
            <StyledContainer maxWidth="false" disableGutters>
                <HeaderNav sectionName="homeSections"/>
                <Box pt={10} pb={88}>
                    <Typography component="h1" variant="h5" align='center'>Sale</Typography>
                </Box>
            </StyledContainer>
        </>
    )
}

export default Sale;