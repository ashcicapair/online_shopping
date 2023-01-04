import React, {useState, useEffect, useCallback} from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import HeaderNav from '../homepage/HeaderNav';
import  {Apparel, StyledContainer} from './Apparel';
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
    // console.log("products:",products)

    // useEffect (() => {
    //     setSearchQuery('');
    // },[])

    return (
        <>
            {/* <StyledContainer maxWidth="false" disableGutters> */}
                <HeaderNav sectionName="homeSections"/>
                <Apparel />
        
            {/* </StyledContainer> */}
        </>
    );
}

export default NewArrivals;
