import { Routes, Route, Link, } from 'react-router-dom';
import {Apparel} from './Apparel';
import {WomenApparelLayout, MenApparelLayout, } from './ApparelLayout';

function WomenApparelRoutes() {

    return (
        <>
            <Routes>
                <Route element={<WomenApparelLayout/>}>
                    <Route index element={<Apparel identity={"women"}/>}/>
                    <Route path=":id" element={<Apparel identity={"women"}/>}/>
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
                    <Route index element={<Apparel identity={"men"}/>}/>
                    <Route path=":id" element={<Apparel identity={"men"}/>}/>
                </Route>
            </Routes>
        </>
    )
}

export  {WomenApparelRoutes, MenApparelRoutes };