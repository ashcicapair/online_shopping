import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Grid, styled} from '@mui/material';


const FeaturedLink = ({posts, index}) => {

    const StyledTypography = styled(Typography, {
        name: "StyledTypography",
        })({
            padding: '80px',
            fontFamily: 'Roboto, sans-serif', 
            fontSize:'48px'
        });

    return (
        <>
            <Box overflow='hidden'>
                {index === 0 && (
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Box 
                                component="img"
                                sx={{ ml: '200px', my: '100px', width: 'auto', height:'1000px',}}
                                src={posts.image}
                                alt={posts.imageLabel}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6} alignSelf='center'>
                            <StyledTypography>
                                <NavLink 
                                    to={'/newArrivals'} 
                                    style={{color:'#1a1a1a', textDecoration: 'none', }}
                                >
                                    {posts.description}
                                </NavLink>
                            </StyledTypography>
                        </Grid>
                    </Grid>
                )}
                {index === 1 && (
                    <Grid container>
                        <Grid item xs={12} lg={6} alignSelf='center'>
                            <StyledTypography>
                                <NavLink 
                                    to={'/newArrivals'} 
                                    style={{color:'#1a1a1a', textDecoration: 'none',}}
                                >
                                    {posts.description}
                                </NavLink>
                            </StyledTypography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box 
                                component="img"
                                sx={{ mr: '100px', mb: '100px', width: 'auto', height:'1000px', }}
                                src={posts.image}
                                alt={posts.imageLabel}
                            />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </>
    )
}

export default FeaturedLink;