import { React, useEffect, useState } from 'react';
import PopupFamille from './PopupFamille';

const ListeMembres = (props) => {

    const {famille_adulte,famille_enfant,famille_supp} = props;
    const [show,setShow] = useState(false);

    if( Object.keys(famille_adulte).length === 0 ) return false;
    

    const handelShowMembre = (event) => {
        let temp_show = !show;
        setShow(temp_show);
    }
    
    return(
        <div className="cellule_client">
            <h4>Membres de la famille</h4>
            <span>{ famille_adulte?.firstName } { famille_adulte?.lastName }</span>
            <span>{ famille_enfant?.firstName } { famille_enfant?.lastName }</span>
            {
                famille_supp.map( (item,i) => (
                    <span>{ item?.firstName } { item?.lastName } </span>
                ))
            }
            {
                show && <PopupFamille {...props} />
            }
            <button onClick={handelShowMembre}>voir les membres</button>
        </div>
    )
}
export default ListeMembres;