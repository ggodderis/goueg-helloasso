import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { BrowserRouter } from 'react-router-dom';

import Admin from './Admin';

domReady( () => {
    const root = createRoot(
        document.getElementById( 'admin_hello' )
    );
    root.render(
            <Admin />
    );
} );
