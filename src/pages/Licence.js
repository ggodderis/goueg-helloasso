import { React, useState, useEffect } from 'react';
import Total from '../components/Total';

const Licence = (props) => {
    
/**
 * Récupération en provenance de App.js
 * de @param selection []
 */
    const {nav,setNav,liste,datas,handelDatas,selection,setSelection} = props;
/**
 * @param selectlicence ['SKIR','ALPI','ESCA'] utiliser en local ici dans Licence.js
 * contient la selection faite pour les licences
 * afin de savoir si c'est ffme ou ffr
 */
    const [selectlicence,setSelectlicence] = useState([]);

/**
 *  @param type = 'famille ou 'seul'
 */
    const [type,setType] = useState('');

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
    /**
     * Mise à jour du sous chois > à PD
     */
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

/**
 * Choix du type de licence famille ou seul
 */
    const handelFamille = (event) => {
        console.log(event.target.value);
        setType(event.target.value);
    }

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
            
            const {licences} = liste.ffme;

            if( type == 'famille'){ 
               
                Object.entries(licences).map( ([item,obj]) => {
                    
                        if( obj.titre == 'FF2' ){
                            handelDatas('licence',obj);
                        }  
                });

            }else{

                Object.entries(licences).map( ([item,obj]) => {
                    
                    if( obj.titre == 'FJ' ){
                        handelDatas('licence',obj);
                    }else{
                        if( obj.titre == 'FA' ){
                        handelDatas('licence',obj);
                        }
                    }
                });
            }

        }else{
            if( selectlicence.includes('ALPI') ||
                selectlicence.includes('SKIR') ||
                selectlicence.includes('VTT') ||
                selectlicence.includes('VF') ||
                selectlicence.includes('CA') ||
                selectlicence.includes('SKIA') ){

                    if( type == 'famille'){ 
                        console.log('FFR FMPN', liste.ffr.licences );
                    }else{ 
                        console.log('FFR IMPN ou IMPNJ ', liste.ffr.licences );
                    }

                }else{

                    if( type == 'famille'){ 
                        console.log('FFR FRA', liste.ffr.licences );
                    }else{ 
                        console.log('FFR IRA ou IMPNJ ', liste.ffr.licences );
                    }

                }
        }

    } ,[selectlicence,type])

    return(
        <>
        <h1>Licences / Assurances</h1>
        <h2>Prenez-vous une licence pour:</h2>
        <label>
            <input type="radio" name="licence_type" value="seul" onChange={handelFamille} /> Moi seulement
        </label>
        <label>
            <input type="radio" name="licence_type" value="famille" onChange={handelFamille} /> Ma famille
        </label>
        {
            type !== '' ? (
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
            ):('')
        }
        <Total />
        </>
    )
}
export default Licence;