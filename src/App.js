import React from 'react';
import { Routes, Route } from 'react-router-dom';

/**
 * Pages
 */
import Home from './pages/Home';
import Licence from './pages/Licence';
import Form from './pages/Form';
import Errors from './pages/Errors';
import Cotisation from './pages/Cotisation';
import Header from './components/Header';

import useFetch from './hooks/useFetch';

import './css/style_helloasso.css';

const App = () => {

    const [user,liste,handelFetch] = useFetch();

    return (
        <>
        <Header/>
            <Routes>
                <Route exact path="/" element={ <Home user={user} handelFetch={handelFetch} /> } />
                <Route exact path="/cotisation" element={ <Cotisation liste={liste} /> } />
                <Route exact path="/licence" element={ <Licence /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>
        </>
     );
}

export default App;