import { NavLink, Outlet} from 'react-router-dom';
import { Toolbar, Container, Grid, styled, Typography, InputBase,} from '@mui/material';
import HeaderNav from '../homepage/HeaderNav';

const WomenApparelLayout = () => {

    return (
        <>
            <HeaderNav sectionName="womenSections" />
            <Outlet/>
        </>
    );
}


const MenApparelLayout = () => {

    return (
        <>
            <HeaderNav sectionName="menSections" />
            <Outlet/>
        </>
    );
}

export  {WomenApparelLayout, MenApparelLayout, };