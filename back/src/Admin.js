import { React, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
/**
 * Components
 */
import Header from './components/Header';
/**
 * Pages
 */
import Home from './pages/Home';
import Errors from './pages/Errors';
import Tarifs from './pages/Tarifs';
import Adhesions from './pages/Adhesions';
/**
 * CSS
 */
import './css/style_back_helloasso.css';



const Admin = () => {

    return(
        <>
        <Header />
        <Routes >
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/tarifs" element={ <Tarifs /> } />
                <Route exact path="/adhesions" element={ <Adhesions /> } />
                <Route exact path="*" element={ <Home /> } />
        </Routes>
        </>
    );
}
export default Admin;