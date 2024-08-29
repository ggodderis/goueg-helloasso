import { React, useState, useEffect } from 'react';

const Licence = (props) => {
/**
 * Récupération en provenance de App.js
 * de @param selection []
 */
    const {nav,setNav,selection,setSelection} = props;
/**
 * @param selectlicence [''] contient la selection faite pour les licences
 * afin de savoir si c'est ffme ou ffr
 */
    const [selectlicence,setSelectlicence] = useState([]);
/** 
 * POUR LA NAVIGATION
 * On regarde si le label Formulaire existe dans nav
 * si il n'existe pas on l'ajoute
 */
function trouve( name ){
    return nav.find( (nav) => nav.label === name );
}

useEffect( () => {

    if( trouve('Licence') === undefined ){
        setNav([...nav,
            { to: '/licence', label: 'Licence'}
        ]);
    }
}, []);

/**
 * Mise à jour de selection [] dans App.js
 */
    const handelCheckbox = (event) => {

        let {name} = event.target;

        let newselection = selection.map( (item,index) => {
            if( item.name === name ){
                item.checked = !item.checked;
                if( item.name === 'SKIR' || item.name === 'ALPI'){
                    item.show = !item.show;
                }
            }
            return item;
        })

        setSelection(newselection);
    }

    const handelNiveau = ( event ) => {

        let {name} = event.target;

        let newselection = selection.map( (item,index) => {
            if( item.labelname === name ){
                item.labelchecked = !item.labelchecked;
            }
            return item;
        })

        setSelection(newselection);
        
    }
/**
 * 
 */

    useEffect( () => {
        /**
         * On stock les informations de selection pour 
         * savoir quelle licence proposer...
         */
        let el = [];

        selection.forEach(element => {
            if( element.checked && !element.labelchecked ){
                el.push(element.name);
            }
            if( element.checked && element.labelchecked ){
                el.push(element.labelname);
            }
        });
        setSelectlicence(el);
 
    },[selection]);

/**
 * Choix de la licence selon les activitées et le niveau choisi
 */
    useEffect( () => {

        if( selectlicence.includes('ESCA') ||
            selectlicence.includes('ALPI_SUP') ||
            selectlicence.includes('SKIR_SUP') ){

            console.log('FFME');

        }else{
            if( selectlicence.includes('ALPI') ||
                selectlicence.includes('SKIR') ||
                selectlicence.includes('VTT') ||
                selectlicence.includes('VF') ||
                selectlicence.includes('CA') ||
                selectlicence.includes('SKIA') ){

                    console.log('FFR speciale');

                }else{

                    console.log('FFR normale');
                }
        }

    } ,[selectlicence])

    return(
        <>
        <h1>Licences / Assurances</h1>
        {
            selection.map( (item,i) => 
                (
                <div className="ligne_licence">
                <label key={i} >
                    <input type="checkbox" name={item.name} id={item.name} checked={ item.checked } onChange={handelCheckbox} />
                    {item.descriptif}
                </label>
                {
                        item.show ? (
                            <div className="sous_ligne_licence">
                                {item.label}
                                <span className="label_sous_ligne_licence">
                                    <input type="checkbox" name={item.labelname} checked={item.labelchecked} onChange={handelNiveau} /> oui
                                </span>
                            </div>
                       ):('')
                    }
                </div>
                )
            )
        }
        </>
    )
}
export default Licence;