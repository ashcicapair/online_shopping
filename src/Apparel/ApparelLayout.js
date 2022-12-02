import { NavLink, Outlet} from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase,} from '@mui/material';
import Header from '../homepage/Header';
import HeaderNav from '../homepage/HeaderNav';


function WomenApparelLayout() {

    const sections = [
        { title: "Women's", url: '/women-apparel' },
        { title: "Tops", url: '/women-apparel/top' },
        { title: "Bottoms", url: '/women-apparel/bottom' },
        { title: "Outer", url: '/women-apparel/outer' },
        { title: "Dresses & Jumpsuits", url: '/women-apparel/dress' },
        { title: "Accessories", url: '/women-apparel/Accessory' },
    ];

    return (
        <>

            {/* {sections.map((section) => (
                <NavLink 
                    to={section.url} 
                >
                    {section.title}
                    &nbsp;&nbsp;&nbsp;
                </NavLink>
            ))}  */}
            {/* <HeaderNav sections={sections}/> */}

            <Container maxWidth="false" sx={{ width: '100%', '& .MuiToolbar-root':{pl:0}}}>
                <Toolbar component="nav"
                    variant="regular"
                    sx={{overflowX: 'auto', bgcolor: '#1a1a1a',  }}
                >
                    <Grid container> 
                        <Typography variant="subtitle1" pl={3} >
                            {sections.map((section) => (
                                <NavLink
                                    to={section.url}
                                    style={{color:'#faf7f7', textDecoration: 'none',}}
                                // underline= "none"
                                // color="inherit"
                                // noWrap
                                // key={section.title}
                                // variant="body2"
                                // sx={{ p: 1.5, 
                                //     "&:hover": {
                                    //         color: "#e0118a"
                                    //     },}}
                                >
                                        {section.title}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </NavLink>
                            ))} 
                        </Typography>
                    </Grid>
                </Toolbar>
                <Outlet/>
            </Container>
            
        </>
    );
}


function MenApparelLayout() {

    const sections = [
        { title: "Tops", url: '/men-apparel/top' },
        { title: "Bottoms", url: '/men-apparel/bottom' },
        { title: "Outer", url: '/men-apparel/outer' },
    ];

    return (
        <>
            {sections.map((section) => (
                <NavLink
                    to={section.url}
                >
                        {section.title}
                        &nbsp;&nbsp;&nbsp;
                </NavLink>
            ))} 

            <Outlet/>
        </>
    );
}

export  {WomenApparelLayout, MenApparelLayout, };