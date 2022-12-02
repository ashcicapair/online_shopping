import { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate ();

    useEffect ( () => {
        setTimeout ( () => {
            navigate("/", {state: "Page Not Found"});
        }, 1000)
    }, [])

    return (
        <>
            {/* <h3>return to Home...</h3> */}
        </>
    )
}

export default NotFound;