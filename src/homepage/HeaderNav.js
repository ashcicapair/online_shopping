import React, { useState, useEffect, useRef } from 'react';
import { NavLink, } from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase, Slide, useScrollTrigger, Menu, MenuItem, Button
    } from '@mui/material';
import navBarData from '../navBarData.json';



const HeaderNav = ({sectionName,}) => {
    const navSection = navBarData["sections"][sectionName];

    // console.log("navSection:",navSection)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e, subMenu) => {
        setAnchorEl({ [subMenu]: e.currentTarget });
    };

    let currentlyHovering = false;
    const handleHover = () => {
        currentlyHovering = true;
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
   
    const handleCloseHover = () => {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
              handleClose();
            }
          }, 500);
    }

    const trigger = useScrollTrigger({
        threshold: 100,
      });


    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <Container maxWidth="false" disableGutters sx={{height: '88px', width: '100%', pt:'124px', position:'fixed', top:0, left:0, zIndex:998, boxShadow: 5,}}>
                    <Toolbar component="nav"
                        variant="regular"
                        sx={{overflowX: 'auto', bgcolor: '#1a1a1a', px:0 }}
                    >
                        <Grid container> 
                            {navSection.map((section, index) => (
                                (Object.keys(section).includes("subMenu")) ? (
                                    <div >
                                        <Typography variant="subtitle1" pl={3}
                                            id={[section.subMenu] == "womenMenu" ? "women-link" : "men-link"}
                                            // aria-controls={anchorEl ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            // aria-expanded={anchorEl ? 'true' : undefined}
                                            onClick={(e) => handleClick(e, section.subMenu) }
                                            onMouseOver={(e) => handleClick(e, section.subMenu) }
                                            onMouseLeave={handleCloseHover}
                                            style={{color:'#faf7f7', textDecoration: 'none', marginRight:"20px"}}
                                        >
                                            {section.title}
                                        </Typography>
                                        <Menu
                                            disableScrollLock 
                                            variant="menu"
                                            id={section.subMenu}
                                            anchorEl={ anchorEl && anchorEl[section.subMenu] }
                                            open={ Boolean(anchorEl && anchorEl[section.subMenu]) }
                                            onClose={handleClose}
                                            MenuListProps={{ 
                                                onMouseEnter: handleHover,
                                                onMouseLeave: handleCloseHover,
                                            }}
                                            PaperProps={{
                                                sx: {
                                                    zIndex: 1,
                                                    // left: 100,
                                                    overflow: 'hidden',
                                                    boxShadow: 5,
                                                    borderRadius: 0,
                                                    width: 200,
                                                    mt: 2,
                                                    ml: 1,
                                                    "& .MuiMenuItem-root ": {
                                                        color: "#faf7f7",
                                                        bgcolor:"#1a1a1a",
                                                        "&:hover": {
                                                            bgcolor:"#1a1a1a",
                                                            textDecoration: 'underline',
                                                        }
                                                    },
                                                    "& .MuiList-root ": {
                                                        py:0
                                                    },
                                                },
                                            }}
                                        >
                                            {/* {console.log("subMenu:",section.subMenu)} */}
                                            {/* {console.log("subMenu:",navBarData["subMenu"][section.subMenu])} */}
                                            {navBarData["subMenu"][section.subMenu].map((section) => (
                                                <MenuItem
                                                    component={NavLink}
                                                    to={section.url}
                                                    onClick={handleClose}
                                                >
                                                    {section.title}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                    ) : (
                                        <Typography variant="subtitle1" pl={3} >
                                            <NavLink
                                                id="basic-link"
                                                to={section.url}
                                                style={{color:'#faf7f7', textDecoration: 'none', marginRight:"20px"}}
                                            >
                                                {section.title}
                                            </NavLink>
                                        </Typography>
                                    ) 
                                )
                            )} 
                        </Grid>
                    </Toolbar>
                </Container>
            </Slide>
        </>
    );
}

export default HeaderNav;
