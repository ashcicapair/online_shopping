import React, { useState,  } from 'react';
import { Link, } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Card, Box, Stepper, Paper, Typography, Button, Grid, MobileStepper, styled } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import HP1 from '../images/HP1.jpg';
import HP2 from '../images/HP2.jpg';
import HP3 from '../images/HP3.jpg';
import HP7 from '../images/HP7.jpg';


const StyledButton = styled(Button, {
    name: "styledButton",
})({
    color:'#fff', 
    '& .MuiSvgIcon-root':{
        fontSize:'7rem', 
    }, 
    '&:hover':{
        backgroundColor:'transparent',
    },
})


const images = [
    {
        label: 'UQ1',
        img: HP1,
        imgPath: "/newArrivals"
    },
    {
        label: 'UQ2',
        img: HP2,
        imgPath: "/newArrivals"
    },
    {
        label: 'UQ3',
        img: HP3,
        imgPath: "/newArrivals"
    },
    {
        label: 'UQ7',
        img: HP7,
        imgPath: "/newArrivals"
    },
];  


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function MainFeaturedPost() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [index, setIndex] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    // console.log('activeStep:',activeStep)

    const handleChangeIndex = (step) => {
        setIndex(step);
    };

    return (
        <>
            <Paper elevation={0} sx={{position:'relative', pt:'188px', zIndex:997,}} >
                {/* <Box sx={{ width: 'auto', px: 3, flexGrow: 1}}> */}
                {/* <Grid item xs={12}> */}
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={1} //activeStep
                        // onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((step, index) => (
                            <Link key={index} to={step.imgPath}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Card elevation={0} key={step.label} sx={{width: 'auto', height:'900px', backgroundImage: `url(${step.img})`, backgroundSize: 'cover', }}>
                                        {/* <Box
                                               component="img"
                                            // className='carousel-item'
                                            style={{
                                                display: 'block',
                                                maxHeight: '800px',
                                                overflow: 'hidden',
                                                width: 'auto',
                                                objectFit:'cover',
                                                backgroundImage: `url(${step.img})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                            src={step.img}
                                            alt={step.label}
                                        />  */}
                                    </Card> 
                                ) : null}
                            </Link>
                        ))}
                    </AutoPlaySwipeableViews>
                    {/* <Pagination dots={3} index={index} onChangeIndex={handleChangeIndex} /> */}
                    <MobileStepper
                        variant="dots"
                        steps={maxSteps}
                        activeStep={activeStep}
                        sx={{position:'absolute', top:'25%', bgcolor:'transparent',
                            '& .MuiMobileStepper-dotActive': {
                                backgroundColor:'#fff'
                            },
                            '& .MuiMobileStepper-dots': {
                                position:'relative', top:'48%',
                            },
                        }}
                        nextButton={
                            <StyledButton size="large" disableRipple onClick={handleNext} disabled={activeStep === maxSteps - 1} >
                                {theme.direction === 'rtl' ? 
                                    <KeyboardArrowLeftIcon />
                                    : 
                                    <KeyboardArrowRightIcon />
                                }
                            </StyledButton>
                        }
                        backButton={
                            <StyledButton size="large" disableRipple onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRightIcon />
                                    ) : (
                                        <KeyboardArrowLeftIcon />
                                        )}
                            </StyledButton>
                        }
                    />
                {/* </Grid> */}
                {/* </Box> */}
            </Paper> 
         
        </>
    );
}

export default MainFeaturedPost;