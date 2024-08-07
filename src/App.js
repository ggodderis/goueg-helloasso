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

import './css/style_helloasso.css';

const App = () => {

    return (
        <>
        <Header/>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/cotisation" element={ <Cotisation /> } />
                <Route exact path="/licence" element={ <Licence /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>
        </>
     );
}

export default App;