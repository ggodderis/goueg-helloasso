import {React, useEffect, useState } from 'react';

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

const Anim = ({ visible, children, duration = 300 }) => {

    const [state,setState] = useState( visible ? VISIBLE : HIDDEN );
    const className = state === VISIBLE ? 'fade' : 'fade out';

    useEffect( () => {
        if( !visible ){
            setState(LEAVING);
        }else{
            setState( (s) => s === HIDDEN ? ENTERING : VISIBLE );
        }
    },[visible]);

    useEffect( () => {
        
        if( state === LEAVING ){
           const timer =  setTimeout( () => {
                setState(HIDDEN);
            }, `${duration}` );
            return () => {
                clearTimeout( timer );
            }
        }else if( state === ENTERING ){
            let height= document.body.offsetHeight;
            setState( VISIBLE );
        }
    },[state]);

    if( state === HIDDEN ){
        return null;
    }

    return <div className={`content_bulle ${className}`}>{children}</div>

}
export default Anim;