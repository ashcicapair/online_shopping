import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase,
    } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo2 from '../images/logo2.jpg';


const Header = () => {

    const StyledInputBase = styled(InputBase, {
        name: "StyledInputBase",
        })({
            opacity: "0.6",
            padding: '0px 8px',
            fontSize: '0.8rem',
            '&:hover': {
                backgroundColor: "#f2f2f2"
            },
            '& .MuiSvgIcon-root': {
                marginLeft: '8px'
            },
    });

 
    return (
        <>
            <Container maxWidth="false" sx={{height: '100%', width: '100%', '& .MuiToolbar-root':{pl:0}}}>
                <Toolbar component="nav"
                        variant="string"
                        sx={{ justifyContent: 'space-between', overflowX: 'auto',  }}
                >
                    <Grid container alignItems='center'>
                        <Grid >
                            <NavLink to="/">
                                <img src={logo2}
                                    style={{height: '100px', margin: '10px 10px 10px 0px', }}/>
                            </NavLink>
                        </Grid>
                        <Grid md/>
                        <Grid>
                            <StyledInputBase sx={{verticalAlign:"text-bottom"}} endAdornment={<SearchIcon fontSize="large" sx={{ color: 'black', cursor: "pointer" }}/>}/>
                            <NavLink to="/">
                                <PermIdentityIcon fontSize="large" sx={{ px: 1, color: 'text.secondary' }}/>
                            </NavLink>
                            <NavLink to="/">
                                <ShoppingCartOutlinedIcon fontSize="large" sx={{ px: 1, color: 'text.secondary' }}/>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </>
    );
}

export default Header;
