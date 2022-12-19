import React, {useState, useEffect, useCallback} from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import HeaderNav from '../homepage/HeaderNav';
import {StyledContainer} from './Apparel';
import { Box, styled, ImageList, ImageListItem, ImageListItemBar, Typography, Pagination, PaginationItem, } from '@mui/material';
import axios from 'axios';
import ProductPagination from './ProductPagination';


const productItemData = [
    {
        image: "w2",
        title: 'product1',
        url: "/" 
    },
    {
        image: "w2",
        title: 'product1',
        url: "/" 
    },
    {
        image: "w2",
        title: 'product1',
        url: "/" 
    },
    // {
    //     image: 'http://fakeimg.pl/438x558/282828/EAE0D0/',
    //     title: 'product4',
    //     url: "/" 
    // },
    // {
    //     image: 'http://fakeimg.pl/438x558/282828/EAE0D0/',
    //     title: 'product5',
    //     url: "/" 
    // },
    // {
    //     image: 'http://fakeimg.pl/438x558/282828/EAE0D0/',
    //     title: 'product6',
    //     url: "/" 
    // },
    // {
    //     image: 'http://fakeimg.pl/438x558/282828/EAE0D0/',
    //     title: 'product7',
    //     url: "/" 
    // },
    // {
    //     image: 'http://fakeimg.pl/438x558/282828/EAE0D0/',
    //     title: 'product8',
    //     url: "/" 
    // },
]


const NewArrivals = ({setSearchQuery,}) => {

    const [ products, setProducts ] = useState([]);
    console.log("products:",products)

    useEffect (() => {
        setSearchQuery('');
    },[])
    
 

    // const [ searchParams, setSearchParams ] = useSearchParams({page:1});
    // const page = searchParams.get("page") || '1';
    // console.log('page: ', page)



    return (
        <>
            <StyledContainer maxWidth="false" disableGutters>
                <HeaderNav sectionName="homeSections"/>

                <ImageList variant="quilted" align="center" cols={3} gap={40} width="inherit" sx={{ height: 'auto', mx: 10, margin: '80px 68px 40px',  overflow: 'hidden', }} >
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
                                            height:'614/px',
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
                    <ProductPagination setProducts={(p)=>setProducts(products)}/>
{/* 
                    <Pagination
                        showFirstButton 
                        showLastButton 
                        size="large"
                        // page={page}
                        count={Math.ceil(pagination.count / pageSize)}
                        renderItem={(item) => (
                            <PaginationItem
                                disableRipple
                                component={NavLink}
                                to={`/newArrivals${item.page === 1 ? '' : `?page=${item.page}`}`}
                                // onClick={e=> setSearchParams({page: e.target.value})}
                                onChange={handlePageChange}

                                {...item}
                            />
                        )}
                    /> */}
                </Box>
            </StyledContainer>
        </>
    );
}

export default NewArrivals;
