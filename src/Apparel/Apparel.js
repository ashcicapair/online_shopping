import {useParams} from 'react-router-dom';

function Apparel() {
    const {id} = useParams();
    return (
        <>
            <h2>Apparel {id}</h2>
        </>
    );
}

export default Apparel;