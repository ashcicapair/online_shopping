import React, { useState, useEffect, }from 'react';
import './App.css'
import { Routes, Route, NavLink, useLocation, } from 'react-router-dom';
import {Container, Grid, 
    } from '@mui/material';
import {WomenApparelRoutes, MenApparelRoutes, } from './Apparel/ApparelRoutes';
import Home from './homepage/Home';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import NewArrivals from './Apparel/NewArrivals';
import Sale from './Apparel/Sale';
import NotFound from './NotFound';
import ScrollTop from './ScrollTop';


function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    window.scrollTo({top: 0});

    return (
        <>
            {/* <CssBaseline/> */}
            <Container id="back-to-top-anchor" maxWidth="false" disableGutters >
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                {/* <h2> {location.state} </h2> */}
                <Routes >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/newArrivals" element={<NewArrivals setSearchQuery={setSearchQuery}/>}/>
                    <Route path="/women-apparel/*" element={<WomenApparelRoutes/>}/>
                    <Route path="/men-apparel/*" element={<MenApparelRoutes/>}/>
                    <Route path="/sale" element={<Sale/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
             
                <ScrollTop/>
                <Footer/>
            </Container>
        </>
    )
}

export default App;
