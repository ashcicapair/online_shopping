import { NavLink, Outlet} from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase,} from '@mui/material';
import HeaderNav from '../homepage/HeaderNav';



const WomenApparelLayout = () => {

    return (
        <>
            <Container maxWidth="false" sx={{ width: '100%', position:'relative', pt:'188px', zIndex:997,}}>
                <HeaderNav sectionName="womenSections" />
                <Outlet/>
            </Container>
        </>
    );
}


const MenApparelLayout = () => {

    return (
        <>
            <Container maxWidth="false" sx={{ width: '100%', position:'relative', pt:'188px', zIndex:997,}}>
                <HeaderNav sectionName="menSections" />
                <Outlet/>
            </Container>
        </>
    );
}

export  {WomenApparelLayout, MenApparelLayout, };