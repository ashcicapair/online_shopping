import React, { useState,  } from 'react';
import { Link, } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Stepper, Paper, Typography, Button, Grid, MobileStepper } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';
import HP1 from '../images/HP1.jpg';
import HP2 from '../images/HP2.jpg';
import HP3 from '../images/HP3.jpg';
import HP7 from '../images/HP7.jpg';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'UQ1',
        imgPath:
        HP1,
    },
    {
        label: 'UQ2',
        imgPath:
        HP2,
    },
    {
        label: 'UQ3',
        imgPath:
        HP3,
    },
    {
        label: 'UQ7',
        imgPath:
        HP7,
    },
];  



function MainFeaturedPost() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
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
    console.log('activeStep:',activeStep)

    return (
        <>
            <Paper elevation={0} sx={{ width: 'auto', }} >
                {/* <Box sx={{ width: 'auto', px: 3, flexGrow: 1}}> */}
                {/* <Grid > */}
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        // onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((step, index) => (
                            <Link>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <div  key={step.label} style={{width:'auto', height:'900px', backgroundImage: `url(${step.imgPath})`, backgroundSize: 'cover', }}>
                                        {/* <Box
                                               component="img"
                                            // className='carousel-item'
                                            style={{
                                                display: 'block',
                                                maxHeight: '800px',
                                                overflow: 'hidden',
                                                width: 'auto',
                                                objectFit:'cover',
                                                backgroundImage: `url(${step.imgPath})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                            src={step.imgPath}
                                            alt={step.label}
                                        />  */}
                                    </div> 
                                ) : null}
                            </Link>
                        ))}
                    </AutoPlaySwipeableViews>
                    {/* <MobileStepper
                        variant="dots"
                        steps={maxSteps}
                        position="bottom"
                        activeStep={activeStep}
                        // sx={{ width: '700px', flexGrow: 1 }}
                        nextButton={
                            <Button size="large" onClick={handleNext} disabled={activeStep === maxSteps - 1} >
                                Next
                                {theme.direction === 'rtl' ? 
                                    <KeyboardArrowLeftIcon />
                                    : 
                                    <KeyboardArrowRightIcon />
                                }
                            </Button>
                        }
                        backButton={
                            <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRightIcon />
                                    ) : (
                                        <KeyboardArrowLeftIcon />
                                        )}
                                Back
                            </Button>
                        }
                    /> */}
                {/* </Grid> */}
                {/* </Box> */}
            </Paper> 
         
        </>
    );
}

// const items = [
//     {
//       src: HP1,
//       altText: 'Slide 1',
//       caption: 'Slide 1',
//       key: 1,
//     },
//     {
//       src: HP2,
//       altText: 'Slide 2',
//       caption: 'Slide 2',
//       key: 2,
//     },
//     {
//       src: HP3,
//       altText: 'Slide 3',
//       caption: 'Slide 3',
//       key: 3,
//     },
//   ];

// function MainFeaturedPost(args) {

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [animating, setAnimating] = useState(false);
  
//     const next = () => {
//       if (animating) return;
//       const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//       setActiveIndex(nextIndex);
//     };
  
//     const previous = () => {
//       if (animating) return;
//       const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//       setActiveIndex(nextIndex);
//     };
  
//     const goToIndex = (newIndex) => {
//       if (animating) return;
//       setActiveIndex(newIndex);
//     };
  
//     const slides = items.map((item) => {
//       return (
//         <CarouselItem
//           onExiting={() => setAnimating(true)}
//           onExited={() => setAnimating(false)}
//           key={item.src}
//         >
//           <img src={item.src} alt={item.altText} />
//           <CarouselCaption
//             captionText={item.caption}
//             captionHeader={item.caption}
//           />
//         </CarouselItem>
//       );
//     });

//     return (
//         <Carousel
//             activeIndex={activeIndex}
//             next={next}
//             previous={previous}
//             {...args}
//             >
//             <CarouselIndicators
//                 items={items}
//                 activeIndex={activeIndex}
//                 onClickHandler={goToIndex}
//             />
//             {slides}
//             <CarouselControl
//                 direction="prev"
//                 directionText="Previous"
//                 onClickHandler={previous}
//             />
//             <CarouselControl
//                 direction="next"
//                 directionText="Next"
//                 onClickHandler={next}
//             />
//         </Carousel>
//     )
// }


// function MainFeaturedPost() {
    
//     return (
//         <>
//             <head>
//                 <meta name="viewport" content="width=device-width, initial-scale=1"/>
//                 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
//                 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
//                 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
//             </head>

//             <body>
//                 <div className="container">
//                     <div id="myCarousel" className="carousel slide" data-ride="carousel">
//                         {/* <!-- Indicators --> */}
//                         <ol className="carousel-indicators">
//                             <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
//                             <li data-target="#myCarousel" data-slide-to="1"></li>
//                         </ol>

//                         {/* <!-- Wrapper for slides --> */}
//                         <div className="carousel-inner">
//                             {/* {images.map((step, index) => (
//                                 <Link>
//                                         <div  key={step.label} style={{width:'auto', height:'800px', backgroundImage: `url(${step.imgPath})`, backgroundSize: 'cover', }}/>
//                                 </Link>
//                             ))} */}
//                             <div className="item active">
//                                 <img src={HP1} alt="UQ1" style={{width:'100%'}}/>
//                             </div>

//                             <div className="item">
//                                 <img src={HP2}  alt="UQ2" style={{width:'100%'}}/>
//                             </div>
//                         </div>

//                         {/* <!-- Left and right controls --> */}
//                         <a className="left carousel-control" href="#myCarousel" data-slide="prev">
//                             <span className="glyphicon glyphicon-chevron-left"></span>
//                             <span className="sr-only">Previous</span>
//                         </a>
//                         <a className="right carousel-control" href="#myCarousel" data-slide="next">
//                             <span className="glyphicon glyphicon-chevron-right"></span>
//                             <span className="sr-only">Next</span>
//                         </a>
//                     </div>
//                 </div>
//             </body>
//         </>
//     );
// }

export default MainFeaturedPost;