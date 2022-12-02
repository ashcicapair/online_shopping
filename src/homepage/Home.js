import React from 'react';
import { Routes, Route, NavLink, useLocation, } from 'react-router-dom';
import { Container, Grid, } from '@mui/material';
import Header from './Header';
import HeaderNav from './HeaderNav';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedLink from './FeaturedLink';
import FeaturedPost from './FeaturedPost';
import newarr3 from '../images/newarr3.png';
import m4 from '../images/m4.jpg';
import w5 from '../images/w5.jpg';

export function Home () {

    const featuredPosts = [
        {
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: newarr3,
            imageLabel: 'newarr2',
        },
        {
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: newarr3,
            imageLabel: 'newarr2',
        },
        {
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: newarr3,
            imageLabel: 'newarr2',
        },
    ];
    
    const featuredLinks = [
        {
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: m4,
            imageLabel: 'm4',
        },
        {
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: w5,
            imageLabel: 'w5',
        },
    ];
    
    const sections = [
        { title: "New Arrivals", url: '/newArrivals' },
        { title: "Women's", url: '/women-apparel' },
        { title: "Men's", url: '/men-apparel' },
        { title: "Sale", url: '/sale' },
    ];

    return (
        <>
            <HeaderNav sections={sections}/>
            <main>
                <MainFeaturedPost />
                <Grid container spacing={1} px={3}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost posts={post}/>
                    ))}
                </Grid>
                <Grid container spacing={1} px={3} lg={12}>
                    {featuredLinks.map((post, index) => (
                        <FeaturedLink posts={post} index={index}/>
                    ))} 
                </Grid>
            </main>
            {/* <Footer/> */}
        </>
    );
}

export default Home;