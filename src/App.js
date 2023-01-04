import React, { useState, useEffect, }from 'react';
import './App.css'
import { Routes, Route, NavLink, useLocation, Navigate, useNavigate} from 'react-router-dom';
import {Container, Grid, 
    } from '@mui/material';
import {WomenApparelRoutes, MenApparelRoutes, } from './Apparel/ApparelRoutes';
import Home from './homepage/Home';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import NewArrivals from './Apparel/NewArrivals';
import ProductPage from './Apparel/ProductPage';
import Sale from './Apparel/Sale';
import SignInSignUp from './account/SignInSignUp';
import Checkout from './account/Checkout';
import Profile from './account/Profile';
import NotFound from './NotFound';
import ScrollTop from './ScrollTop';
import { useAuth } from './account/useAuth'; 


function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const { user } = useAuth();
    const protectPage = ["account/profile", "account/cart"];
    const navigate = useNavigate();
    // console.log(location);
    
    useEffect (() => {
        if (protectPage.includes(location.pathname.replace("/", "").toLowerCase())) {
            if (!user) {
                navigate("/");
            }
        };
    }, []);

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
                    <Route path="/shop/*" element={<ProductPage/>}/>
                    <Route path="/men-apparel/*" element={<MenApparelRoutes/>}/>
                    <Route path="/sale" element={<Sale/>}/>

                    <Route path="/signin/*" element={<SignInSignUp/>}/>
                    <Route path="/account/profile/*" element={<Profile/>}/>
                    <Route path="/account/cart/*" element={<Checkout/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
             
                <ScrollTop/>
                <Footer/>
            </Container>
        </>
    )
}

export default App;
