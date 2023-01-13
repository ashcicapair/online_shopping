import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase, Slide, 
    useScrollTrigger, Box, Menu, ButtonBase, Stack, Paper, Divider, 
} from '@mui/material';
import { useAuth } from '../account/useAuth'; 
import jwt_decode from "jwt-decode";
import Alarm from '../Alarm';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo2 from '../images/logo2.jpg';
// import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';




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
    const [searchContent, setSearchContent] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const {user, token, logout} = useAuth();
    const navigate = useNavigate();


    const signOut = async() => {
        logout();
        setOpen(true);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => 
            navigate("/")
        , 500);
    };

    const handleMenuOpen = (e, subMenu) => {
        setAnchorEl({[subMenu]: e.currentTarget});
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    let currentlyHovering = false;
    const handleHover = () => {
        currentlyHovering = true;
    };
   
    const handleCloseHover = () => {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleMenuClose();
            }
          }, 500);
    };

    const handleQuery = (e) => {
        setSearchQuery(e.target.value);
    };

    const trigger = useScrollTrigger({
        threshold: 100,
        target: props.window ? window() : undefined
    });
 
    useEffect(() => {
        setSearchQuery('');
    }, []);
    
    useEffect(() => {
        if (searchQuery !== '') {
            setSearchContent(true)
        } else (
            setSearchContent(false)
        );
    }, [searchQuery]);

    useEffect(() => {
        if (user) {
            let decoded = jwt_decode(token);
            setUserInfo({...decoded});
        };
    }, []);
    

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
                                            <Stack>
                                                <StyledIconButton 
                                                    onClick={(e) => handleMenuOpen(e, "profile")} 
                                                    onMouseEnter={(e) => handleMenuOpen(e, "profile")} 
                                                    onMouseLeave={handleCloseHover}
                                                >
                                                    <PermIdentityIcon fontSize="large"  />
                                                </StyledIconButton>
                                                <Menu
                                                    disableScrollLock 
                                                    variant="menu"
                                                    anchorEl={anchorEl && anchorEl["profile"]}
                                                    open={Boolean(anchorEl && anchorEl["profile"])}
                                                    onClose={handleMenuClose}
                                                    MenuListProps={{ 
                                                        onMouseEnter: handleHover,
                                                        onMouseLeave: handleCloseHover,
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    PaperProps={{
                                                        sx: {
                                                            zIndex: 1,
                                                            overflow: 'hidden',
                                                            boxShadow: 5,
                                                            borderRadius: 0,
                                                            width: '26%',
                                                            ml: 4,
                                                            "& .MuiList-root ": {
                                                                py:0
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Paper elevation={0} sx={{my:1, p:4, bgcolor:"#faf9f7", borderRadius:0}}>
                                                        <Box display='flex' justifyContent="center" alignItems='baseline' color='#474747'>
                                                            <Typography component="h1" variant="h5">Hi,  {userInfo.name} </Typography>
                                                            <Typography component="h5" variant="subtitle1" ml={1}>({userInfo.age})</Typography>
                                                        </Box>
                                                        <Divider color='#b5a08d' sx={{m:2}}/>
                                                        <Box align='center' color='green'>
                                                            <Typography component="h4" variant="body1" >Welcome Back !</Typography>
                                                            <Typography component="h4" variant="body1">Take a look at our new arrivals and shop deals.</Typography>
                                                        </Box>
                                                        <Box align='center' mt={3}>
                                                            <ButtonBase 
                                                                variant="outlined"  
                                                                type="submit"
                                                                disableRipple
                                                                onClick={signOut} 
                                                                sx={{
                                                                    border:'1px solid #1a1a1a', 
                                                                    height: 39, 
                                                                    width: "100%",
                                                                    "&:hover": {
                                                                        border: 'none',
                                                                        bgcolor: ' rgb(156, 143, 131, 0.5)'
                                                                    }
                                                                }}
                                                            >
                                                                LOG OUT
                                                            </ButtonBase>
                                                        </Box>
                                                    </Paper>
                                                </Menu>
                                            </Stack>
                                        : 
                                            <NavLink to="/signin">
                                                <StyledIconButton>
                                                    <PermIdentityIcon fontSize="large" />
                                                </StyledIconButton>
                                            </NavLink>
                                    }
                                    {   
                                        user ?
                                            <NavLink to="/account/cart">
                                                <StyledIconButton>
                                                    <ShoppingCartOutlinedIcon fontSize="large" sx={{ pl: 2,}}/>
                                                </StyledIconButton>
                                            </NavLink>
                                        : ''
                                    }
                                    {/* {   
                                        user ?
                                            <Stack>
                                                <StyledIconButton 
                                                    onClick={(e) => handleMenuOpen(e, "checkout")} 
                                                    onMouseEnter={(e) => handleMenuOpen(e, "checkout")} 
                                                    onMouseLeave={handleCloseHover}
                                                >
                                                    <ShoppingCartOutlinedIcon fontSize="large" sx={{ pl: 2,}}/>
                                                </StyledIconButton>
                                                <Menu
                                                    disableScrollLock 
                                                    variant="menu"
                                                    anchorEl={anchorEl && anchorEl["checkout"]}
                                                    open={anchorEl && anchorEl["checkout"]}
                                                    onClose={handleMenuClose}
                                                    MenuListProps={{ 
                                                        onMouseEnter: handleHover,
                                                        onMouseLeave: handleCloseHover,
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    PaperProps={{
                                                        sx: {
                                                            maxHeight: '50%',
                                                            zIndex: 1,
                                                            overflowY: 'auto',
                                                            boxShadow: 5,
                                                            borderRadius: 0,
                                                            width: '26%',
                                                            ml: 8,
                                                            "& .MuiList-root ": {
                                                                py:0
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {
                                                        cartItem.map((item) => (
                                                            <Paper elevation={0} sx={{px:2, bgcolor:"#faf9f7", borderRadius:0,}} >
                                                                <Box sx={{borderBottom: 1, borderColor: 'divider', p:3, }}>
                                                                    <Card elevation={0} sx={{display:'flex', height:'120px',}}>
                                                                        <Grid item xs={12} md={6} lg={3}>
                                                                            <NavLink to={`/shop/?goodsId=${item.goodsId}`} style={{textDecoration:'none'}}>
                                                                                <CardMedia
                                                                                    component="img"
                                                                                    image={require(`../images/${item.image}.jpg`)}
                                                                                    alt={item.title}
                                                                                    sx={{ display: { xs: 'none', sm: 'block' }}}
                                                                                />
                                                                            </NavLink>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6} lg={5} >
                                                                            <CardContent>
                                                                                <Box display='flex' flexDirection='column'>
                                                                                    <Typography component="h1" variant="subtitle1" sx={{color:'#1a1a1a'}}>{item.title}</Typography>
                                                                                    <Typography component="h1" variant="subtitle1">尺寸: {item.size}</Typography>
                                                                                </Box>
                                                                            </CardContent>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6} lg={3}>
                                                                            <CardContent>
                                                                                <Box display='flex' flexDirection='column'>
                                                                                    <Typography component="h1" variant="subtitle1" sx={{color:'#1a1a1a'}}>數量: {item.count}</Typography>
                                                                                    <Typography component="h1" variant="subtitle1" align='right'>NT$ {item.price}</Typography>
                                                                                </Box>
                                                                            </CardContent>
                                                                        </Grid> 
                                                                    </Card>
                                                                </Box>
                                                            </Paper>
                                                        ))
                                                    }
                                                    <Box align='center' p={3} bgcolor="#faf9f7">
                                                        <NavLink to="/account/cart" style={{color:'inherit', textDecoration:'none'}}>
                                                            <ButtonBase 
                                                                variant="outlined"  
                                                                type="submit"
                                                                disableRipple
                                                                sx={{
                                                                    border:'1px solid #1a1a1a', 
                                                                    height: 44, 
                                                                    width: "100%",
                                                                    "&:hover": {
                                                                        border: 'none',
                                                                        bgcolor: 'rgb(156, 143, 131, 0.5)'
                                                                    }
                                                                }}
                                                            >
                                                                CHECKOUT &nbsp;   
                                                                <Typography component="h1" variant="subtitle1" sx={{color:'#d43f3f'}}>
                                                                    {cartItem.length}  
                                                                </Typography>
                                                                &nbsp; ITEMS
                                                            </ButtonBase>
                                                        </NavLink>
                                                    </Box>
                                                </Menu>
                                            </Stack>
                                        : ''
                                    } */}
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
