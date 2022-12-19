import React from 'react';
import HeaderNav from '../homepage/HeaderNav';
import {StyledContainer} from './Apparel';


function Sale() {
    return (
        <>
            <StyledContainer >
                <HeaderNav sectionName="homeSections"/>
                <h2 >Sale</h2>
            </StyledContainer>
        </>
    )
}

export default Sale;