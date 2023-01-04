import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase, Slide, useScrollTrigger, IconButton, Box 
    } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo2 from '../images/logo2.jpg';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useAuth } from '../account/useAuth'; 
import Alarm from '../Alarm';


const StyledIconButton = styled("IconButton")(({theme}) => ({
    color: theme.palette.text.secondary, 
    '& :hover':{color:'#9c8f83'}
  }));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginLeft: 0,
    width: "100%",
  }));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    height: "100%",
    paddingLeft: theme.spacing(1.5),
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& :hover':{color:'#9c8f83'}, 
    // pointerEvents: "none",
}))

const StyledInputBase = styled(InputBase, {
    name: "StyledInputBase",
    })(({ theme, key}) => ({
        opacity: "0.6",
        fontSize: '1rem',
        "& .MuiInputBase-input": {
            padding: theme.spacing(2, 0.5, 2, 7),
            transition: 'width 0.3s',
            [theme.breakpoints.up("sm")]: {
                width: key ? "30vw" : 0,
                backgroundColor: key ? "#f2f2f2" :'',
                '&:focus': {
                    width: "30vw",
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
    const [open, setOpen] = useState(false);
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    // console.log('user:',user)
    // console.log('open:',open)
    // console.log('searchContent:',searchContent)


    const signOut = async() => {
        logout();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => 
            navigate("/")
        , 500);
    };

    const handleQuery = (e) => {
        setSearchQuery(e.target.value);
    };

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
                            sx={{ justifyContent: 'space-between', overflowX: 'auto', "&.MuiToolbar-root":{pr:0}}}
                    >
                        <Grid container alignItems='flex-end' >
                            <Grid item>
                                <NavLink to="/">
                                    <img src={logo2} style={{height: '100px', margin: '10px 10px 10px 24px', }}/>
                                </NavLink>
                            </Grid>
                            <Grid item md/>

                            <Grid item>
                                {   
                                    user ?
                                        <Box sx={{position:'absolute', top:25, right:0}}>
                                            <Typography component="h1" variant="h5" color='#565978'>Hi,  {JSON.parse(localStorage.username)} !</Typography>
                                        </Box>
                                    : ''
                                }
                                <Box sx={{display: "flex", alignItems:'center'}}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon fontSize="large" sx={{ color:'text.secondary', cursor: "pointer",}}/>
                                        </SearchIconWrapper>
                                        <StyledInputBase 
                                            value={searchQuery} 
                                            onChange={handleQuery} 
                                            key={searchContent}
                                        />
                                    </Search>
                                    {   
                                        user ?
                                            <NavLink to="/account/profile">
                                                <StyledIconButton>
                                                    <PermIdentityIcon fontSize="large" />
                                                </StyledIconButton>
                                            </NavLink>
                                        : 
                                            <NavLink to="/signin">
                                                <StyledIconButton>
                                                    <PermIdentityIcon fontSize="large" />
                                                </StyledIconButton>
                                            </NavLink>
                                    }
                                    {   
                                        user ?
                                            <NavLink to="account/cart">
                                                <StyledIconButton>
                                                    <ShoppingCartOutlinedIcon fontSize="large" sx={{ px: 2,}}/>
                                                </StyledIconButton>
                                            </NavLink>
                                        : ''
                                    }
                                    {   
                                        user ?
                                            <StyledIconButton>
                                                <LogoutSharpIcon fontSize="large" onClick={signOut} />
                                            </StyledIconButton>
                                        : ''
                                    }
                                </Box>
                            </Grid>

                        </Grid>
                    </Toolbar>
                    <Alarm open={open} onClose={handleClose}>
                        已登出會員
                    </Alarm>
                </Container>
            </Slide>
        </>
    );
}

export default Header;
