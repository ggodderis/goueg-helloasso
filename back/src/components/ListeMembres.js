import { React, useEffect, useState } from 'react';

const ListeMembres = (props) => {

    const {famille_adulte,famille_enfant,famille_supp} = props;
    
    return(
        <div className="cellule_client">
            <h4>Liste des membres</h4>
            <span>{ famille_adulte.firstName } { famille_adulte.lastName }</span>
            <span>{ famille_enfant.firstName } { famille_enfant.lastName }</span>
            {
                famille_supp.map( (item,i) => (
                    <span>{ item.firstName } { item.lastName } </span>
                ))
            }
        </div>
    )
}
export default ListeMembres;