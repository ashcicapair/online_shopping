import React, {useState, useEffect, } from 'react';
import {useParams, NavLink} from 'react-router-dom';
import { Container, Box, styled, ImageList, ImageListItem, ImageListItemBar, Typography, Grid, imageListItemClasses, } from '@mui/material';
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

const Apparel = ({identity}) => {
    const {id} = useParams();
    let apparelType = id;
    const [ products, setProducts ] = useState([]);


    return (
        <>
            <StyledContainer maxWidth="false" disableGutters>
                <Box
                    gap={5}
                    margin={'80px 50px 40px'}
                    align="center"
                    sx={{
                        overflow: 'hidden',
                        display: "grid",
                        gridTemplateColumns: {
                            sm: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)"
                        },
                        [`& .${imageListItemClasses.root}`]: {
                            display: "flex",
                            flexDirection: "column"
                        }
                    }}
                >
                {/* <ImageList variant="quilted" align="center" cols={4} gap={40} width="inherit" sx={{ height: 'auto', mx: 10, margin: '80px 68px 40px',  overflow: 'hidden', }} > */}
                    {products.map((item, index) => (
                        <div>
                            <ImageListItem  sx={{p: '0 0 30px',}} >
                                <NavLink to={`/shop/?goodsId=${item.id}`}>
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
                                <NavLink to={`/shop/?goodsId=${item.id}`} style={{ textDecoration: 'none',}}>
                                    <Typography variant="body1" mt={1.25} sx={{color:'#1a1a1a', textAlign: 'center', '&:hover':{textDecoration: 'underline'}}}>
                                        {item.title}
                                    </Typography>
                                </NavLink>
                                <Typography variant="subtitle1"sx={{color:'#736f6f', textAlign: 'center', lineHeight:1.5}}>
                                    $ {item.price}
                                </Typography>
                            </ImageListItem>
                        </div>
                    ))}
                {/* </ImageList> */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent:"center", marginBottom: '30px', }}>
                    <ProductPagination setProducts={setProducts} identity={identity} apparelType={apparelType}/>
                </Box>
            </StyledContainer>
        </>
    );
}

export  {Apparel, StyledContainer, };