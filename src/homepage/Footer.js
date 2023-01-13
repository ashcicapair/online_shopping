import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Toolbar, Container, Grid, Box, Typography,
    } from '@mui/material';
import About from '../About';



const Footer = () => {

    const sections = [
        { title: "About Us", url: '/#' },
        { title: "Shopping Help", url: '/#' },
        { title: "Returns & Exchanges", url: '/#' },
        { title: "Privacy", url: '/#' },
        { title: "Website Terms of Use", url: '/#' },
        { title: "Contact Us", url: '/#' },
    ];

    return (
        <>
            <Container maxWidth="false" disableGutters>
                <Box component="footer" sx={{color:"#888888", bgcolor: '#1a1a1a',}} align="center">
                    <Typography variant="body2" p={1} >
                        {sections.map((section, index) => (
                            <NavLink 
                                key={index}
                                to={section.url} 
                                style={{color:'#faf7f7', textDecoration: 'none',}}
                            >
                                    {section.title}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </NavLink>
                        ))} 
                    </Typography>
                    <Typography  variant="body2" pb={0.5}>
                        copyright © 2023 Studios Co., Ltd. All Rights Reserved.
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default Footer;
