import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import Admin from './admin/Admin';

/**
 * Attention bien penser à changer le basename
 * par celui de la page des grimpeurs
 */

if( the_ajax_script.where === 'front') {

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

}
if( the_ajax_script.where === 'back' ){

    domReady( () => {
        const root = createRoot(
            document.getElementById( 'admin_hello' )
        );
        root.render(
                <Admin />
        );
    } );

}