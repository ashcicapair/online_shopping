import React, {useState, useEffect, } from 'react';
import {useParams, NavLink} from 'react-router-dom';
import { Container, Box, styled, ImageList, ImageListItem, ImageListItemBar, Typography, } from '@mui/material';
import ProductPagination from './ProductPagination';

const StyledContainer = styled(Container, {
    name: "StyledContainer",
})({
    width: '100%', 
    position:'relative', 
    paddingTop:'188px', 
    marginLeft: 0,
    zIndex:997,
})

const Apparel = () => {
    const {id} = useParams();
    const [ products, setProducts ] = useState([]);
    // console.log("products:",products)

    return (
        <>
            <StyledContainer maxWidth="false" disableGutters>
                <h2>Apparel {id}</h2>
                <ImageList variant="quilted" align="center" cols={4} gap={40} width="inherit" sx={{ height: 'auto', mx: 10, margin: '80px 68px 40px',  overflow: 'hidden', }} >
                    {products.map((item, index) => (
                        (index < 40) && (
                        <div>
                            <ImageListItem  sx={{p: '0 0 30px',}} >
                                <NavLink to="/">
                                    <img
                                        src={require(`../images/${item.image}.jpg`)}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{
                                            width: 'auto', 
                                            height:'614px',
                                        }}
                                    />
                                </NavLink>
                                <NavLink to="/" style={{ textDecoration: 'none',}}>
                                    <Typography variant="body1" mt={1.25} sx={{color:'#1a1a1a', textAlign: 'center', '&:hover':{textDecoration: 'underline'}}}>
                                        {item.title}
                                        {/* <ImageListItemBar
                                            title={item.title}
                                            subtitle={item.title}
                                            position="below"
                                            align="center"
                                            sx={{
                                                '& .MuiImageListItemBar-title':{
                                                    fontSize: '16px',
                                                },
                                                '& .MuiImageListItemBar-subtitle':{
                                                    fontSize: '16px',
                                                    color:'red',
                                                }
                                            }}
                                        /> */}
                                    </Typography>
                                </NavLink>
                                <Typography variant="subtitle1"sx={{color:'#736f6f', textAlign: 'center', lineHeight:1.5}}>
                                    $ {item.price}
                                </Typography>
                            </ImageListItem>

                        </div>
                        )
                    ))}
                </ImageList>
                <Box sx={{ display: 'flex', justifyContent:"center", marginBottom: '30px', }}>
                    <ProductPagination setProducts={setProducts}/>
                </Box>
            </StyledContainer>
        </>
    );
}

export  {Apparel, StyledContainer, };