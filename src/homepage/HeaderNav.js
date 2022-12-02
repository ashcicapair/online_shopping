import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase,
    } from '@mui/material';


const HeaderNav = ({sections}) => {

    // const sections = [
    //     { title: "New Arrivals", url: '/newArrivals' },
    //     { title: "Women's", url: '/women-apparel' },
    //     { title: "Men's", url: '/men-apparel' },
    //     { title: "Sale", url: '/sale' },
    // ];

    return (
        <>
            <Container maxWidth="false" disableGutters sx={{height: '100%', width: '100%',}}>
                <Toolbar component="nav"
                    variant="regular"
                    sx={{overflowX: 'auto', bgcolor: '#1a1a1a',  }}
                >
                    <Grid container> 
                        <Typography variant="subtitle1" pl={3} >
                            {sections.map((section) => (
                                <NavLink
                                    to={section.url}
                                    style={{color:'#faf7f7', textDecoration: 'none',}}
                                // underline= "none"
                                // color="inherit"
                                // noWrap
                                // key={section.title}
                                // variant="body2"
                                // sx={{ p: 1.5, 
                                //     "&:hover": {
                                    //         color: "#e0118a"
                                    //     },}}
                                >
                                        {section.title}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </NavLink>
                            ))} 
                        </Typography>
                    </Grid>
                </Toolbar>
            </Container>
        </>
    );
}

export default HeaderNav;
