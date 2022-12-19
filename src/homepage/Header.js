import React, { useState, useEffect } from 'react';
import { NavLink, } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase, Slide, useScrollTrigger, 
    } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo2 from '../images/logo2.jpg';


const Search = styled("div")({
    position: "relative",
    marginLeft: 0,
    width: "100%",
  });

const SearchIconWrapper = styled("div")(({ theme }) => ({
    height: "100%",
    paddingLeft: theme.spacing(1.5),
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // pointerEvents: "none",
}))

const StyledInputBase = styled(InputBase, {
    name: "StyledInputBase",
    })(({ theme, withData }) => ({
        opacity: "0.6",
        fontSize: '1rem',
        "& .MuiInputBase-input": {
            padding: theme.spacing(2, 0.5, 2, 7),
            transition: 'width 0.3s',
            [theme.breakpoints.up("sm")]: {
                width: withData ? "500px" : 0,
                backgroundColor: withData ? "#f2f2f2" :'',
                '&:focus': {
                    width: "500px",
                    backgroundColor: "#f2f2f2",
                }
            }
        }
    })
);

const Header = (props) => {
    const { window, searchQuery, setSearchQuery} = props;
    // const [searchQuery, setSearchQuery] = useState('');
    const [searchContent, setSearchContent] = useState(false);

    const handleQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    const trigger = useScrollTrigger({
        // disableHysteresis: true,
        threshold: 100,
        target: props.window ? window() : undefined
    });
 
    useEffect(() => {
        setSearchQuery('');
    }, [])
    
    useEffect(() => {
        if (searchQuery !== '') {
            setSearchContent(true)
        } else (
            setSearchContent(false)
        );
    }, [searchQuery])


    return (    
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <Container maxWidth="false" sx={{height:'auto', width: '100%', '& .MuiToolbar-root':{pl:0}, bgcolor:'#fff', position:'fixed', top:0, left:0, zIndex:999,}}>
                    <Toolbar component="nav"
                            variant="string"
                            sx={{ justifyContent: 'space-between', overflowX: 'auto', }}
                    >
                        <Grid container alignItems='flex-end' >
                            <Grid item>
                                <NavLink to="/">
                                    <img src={logo2} style={{height: '100px', margin: '10px 10px 10px 24px', }}/>
                                </NavLink>
                            </Grid>
                            <Grid item md/>
                            <Grid item sx={{ display: "flex", alignItems: "center", }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon fontSize="large" sx={{ color: 'text.secondary', cursor: "pointer" }}/>
                                    </SearchIconWrapper>
                                    <StyledInputBase value={searchQuery} onChange={handleQuery} withData={searchContent}/>
                                </Search>

                                <NavLink to="/">
                                    <PermIdentityIcon fontSize="large" sx={{ px: 1.5, color: 'text.secondary' }}/>
                                </NavLink>
                                <NavLink to="/">
                                    <ShoppingCartOutlinedIcon fontSize="large" sx={{ px: 1.5, color: 'text.secondary' }}/>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </Slide>
        </>
    );
}

export default Header;
