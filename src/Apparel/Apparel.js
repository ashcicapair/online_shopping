import {useParams, NavLink} from 'react-router-dom';
import { Container, styled, } from '@mui/material';

const StyledContainer = styled(Container, {
    name: "StyledContainer",
})({
    width: '100%', 
    position:'relative', 
    paddingTop:'188px', 
    marginLeft: 0,
    zIndex:997,
})

const Apparel = () => {
    const {id} = useParams();
    return (
        <>
            <StyledContainer>
                <h2>Apparel {id}</h2>
            </StyledContainer>
        </>
    );
}

export  {Apparel, StyledContainer, };