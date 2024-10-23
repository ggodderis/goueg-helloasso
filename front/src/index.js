import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ContextDatasProvider } from './hooks/useContextDatas';

import './css/style_helloasso.css';


/**
 * Attention bien penser à changer le basename
 * par celui de la page des grimpeurs
 */
domReady( () => {
    const root = createRoot(
        document.getElementById( 'rootHelloAsso' )
    );
    root.render(
        
            <BrowserRouter basename="/le-club/adherer-au-club">
                <ContextDatasProvider>
                    <App tab="home" />
                </ContextDatasProvider>
            </BrowserRouter>
    );
} );