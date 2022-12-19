import React, {useEffect, } from 'react';
import './App.css'
import {Container, Box, Fade, Fab, useScrollTrigger,  } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const ScrollTop = (props) => {
    const { window } = props;

    const trigger = useScrollTrigger({
            target: window ? window() : undefined,
            disableHysteresis: true,
            threshold: 100,
        });
        
    const handleClick = (e) => {
        const anchor = (e.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        ); 

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <Fade in={trigger} >
            <Box 
                onClick={handleClick} 
                sx={{ position: 'fixed', bottom: '30px', right: '40px', zIndex: 999}}
            >
                <Fab 
                    disableRipple
                    size='large' 
                    aria-label="scroll-back-to-top" 
                    sx={{ 
                        // boxShadow: 0,
                        '&.MuiFab-root':{
                            bgcolor:'#d43f3f', 
                        }
                    }}
                >
                    <KeyboardArrowUpIcon/>
                </Fab>
            </Box>
        </Fade>
    )
}

export default ScrollTop;