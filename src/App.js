import React, { useState, useEffect, }from 'react';
import './App.css'
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {Container } from '@mui/material';
import {WomenApparelRoutes, MenApparelRoutes, } from './apparel/ApparelRoutes';
import Home from './homepage/Home';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import NewArrivals from './apparel/NewArrivals';
import ProductPage from './apparel/ProductPage';
import Sale from './apparel/Sale';
import SignInSignUp from './account/SignInSignUp';
import Checkout from './ShoppingCart/Checkout';
import NotFound from './NotFound';
import ScrollTop from './ScrollTop';
import Alarm from './Alarm';
import { useAuth } from './account/useAuth'; 
import jwt_decode from "jwt-decode";
import moment from "moment";
// import useShoppingCart from './ShoppingCart/useShoppingCart';


function App() {
    // const [cartItem, getCartByUserId] = useShoppingCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const protectPage = ["account/cart"];

    window.scrollTo({top: 0});

    const handleClose = () => {
        setOpen(false);
    };

    useEffect (() => {
        if (protectPage.includes(location.pathname.replace("/", "").toLowerCase())) {
            if (!user) {
                navigate("/");
            }
        };
        
        if (user) {
            // getCartByUserId();
            let timeOfExp = jwt_decode(token);
            let now = moment().format("X"); 
            if (now > timeOfExp.exp) {
                logout();
                setOpen(true);
                navigate(-2);
            } 
        };
    }, []);
    
    return (
        <>
            <Container id="back-to-top-anchor" maxWidth="false" disableGutters >
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <Routes >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/newArrivals" element={<NewArrivals/>}/>
                    <Route path="/women-apparel/*" element={<WomenApparelRoutes/>}/>
                    <Route path="/shop/*" element={<ProductPage/>}/>
                    <Route path="/men-apparel/*" element={<MenApparelRoutes/>}/>
                    <Route path="/sale" element={<Sale/>}/>

                    <Route path="/signin/*" element={<SignInSignUp/>}/>
                    <Route path="/account/cart" element={<Checkout/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
             
                <ScrollTop/>
                <Footer/>
                <Alarm open={open} onClose={handleClose}>
                    系統已自動登出，請重新登入
                </Alarm>
            </Container>
        </>
    )
}

export default App;
