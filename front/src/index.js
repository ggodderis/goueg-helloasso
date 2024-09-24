import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { BrowserRouter } from 'react-router-dom';

import App from './App';


/**
 * Attention bien penser à changer le basename
 * par celui de la page des grimpeurs
 */

domReady( () => {
    const root = createRoot(
        document.getElementById( 'rootHelloAsso' )
    );
    root.render(
        <BrowserRouter basename="/page-d-exemple">
            <App tab="home" />
        </BrowserRouter>
    );
} );