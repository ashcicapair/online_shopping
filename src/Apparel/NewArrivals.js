import React from 'react';
import HeaderNav from '../homepage/HeaderNav';
import  {Apparel} from './Apparel';



const NewArrivals = () => {

    return (
        <>
            <HeaderNav sectionName="homeSections"/>
            <Apparel />
        </>
    );
}

export default NewArrivals;
