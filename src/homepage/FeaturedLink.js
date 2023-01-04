import React, { useState,  } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Paper, Typography, Grid, Link, styled} from '@mui/material';


const FeaturedLink = ({posts, index}) => {

    const StyledTypography = styled(Typography, {
        name: "StyledTypography",
        })({
            padding: '80px',
            fontFamily: 'Roboto, sans-serif', 
            fontSize:'48px'
        });

    // console.log(index)
    return (
        <>
            {/* <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&family=Roboto:wght@100;300;700;900&display=swap" rel="stylesheet"/>
            </head> */}
            <Grid item xs={12} md={12} >
                {index === 0 && (
                    <Paper elevation={0} sx={{display:'flex'}}>
                        <Box 
                            component="img"
                            sx={{ ml: '200px', my: '100px', width: 'auto', height:'1000px',}}
                            src={posts.image}
                            alt={posts.imageLabel}
                        />
                        <StyledTypography alignSelf='center' >
                            <NavLink 
                                to={'/newArrivals'} 
                                style={{color:'#1a1a1a', textDecoration: 'none', }}
                            >
                                {posts.description}
                            </NavLink>
                        </StyledTypography>
                    </Paper>
                )}
                {index === 1 && (
                    <Paper elevation={0} sx={{display:'flex'}}>
                        <StyledTypography alignSelf='center'>
                            <NavLink 
                                to={'/newArrivals'} 
                                style={{color:'#1a1a1a', textDecoration: 'none',}}
                            >
                                {posts.description}
                            </NavLink>
                        </StyledTypography>
                        <Box 
                            component="img"
                            sx={{ mr: '100px', mb: '100px', width: 'auto', height:'1000px', }}
                            src={posts.image}
                            alt={posts.imageLabel}
                        />
                    </Paper>
                )}
            </Grid>
        </>
    )
}

export default FeaturedLink;