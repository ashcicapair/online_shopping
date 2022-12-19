import { Routes, Route, Link, } from 'react-router-dom';
import {Apparel} from './Apparel';
import {WomenApparelLayout, MenApparelLayout, } from './ApparelLayout';

function WomenApparelRoutes() {


    return (
        <>
            <Routes>
                <Route element={<WomenApparelLayout/>}>
                    <Route index element={<Apparel/>}/>
                    <Route path=":id" element={<Apparel/>}/>
                </Route>
            </Routes>
        </>
    )
}

function MenApparelRoutes() {


    return (
        <>
            <Routes>
                <Route element={<MenApparelLayout/>}>   
                    <Route index element={<Apparel/>}/>
                    <Route path=":id" element={<Apparel/>}/>
                </Route>
            </Routes>
        </>
    )
}

export  {WomenApparelRoutes, MenApparelRoutes };