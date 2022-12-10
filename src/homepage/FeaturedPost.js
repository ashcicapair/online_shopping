import React, { useState,  } from 'react';
import { NavLink, } from 'react-router-dom';
import { Box,  Typography, Grid, CardActionArea, Card, CardContent, CardMedia } from '@mui/material';


const FeaturedPost = ({posts}) => {
    

    return (
        <>
            <Grid item xs={12} md={4} >
                <CardActionArea component="a" href="#">
                    <Card square elevation={2}>
                        <CardContent sx={{ flex: 1, width:'auto', height:'120px', bgcolor:'#a89e97', border:'5px double #fff'}}>
                            <Typography component="h5" variant="h5" color="#faf7f7" sx={{lineHeight:'120px'}}>
                                {posts.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardActionArea component="a" href="#">
                    <Card square elevation={0} sx={{ height:'170px',}}>
                        <Box
                            component="img"
                            style={{
                                position:'relative',
                                top:'15px',
                                width: '600px',
                            }}
                            
                            src={posts.image}
                            alt={posts.imageLabel}
                        />
                    </Card>
                </CardActionArea>
            </Grid>
            
        </>
    )
}

export default FeaturedPost;