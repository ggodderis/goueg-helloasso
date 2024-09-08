import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Total from '../components/Total';

const Licence = (props) => {
    
    const navigate = useNavigate();
/**
 * Récupération en provenance de App.js
 * de @param selection []
 */
    const {nav,setNav,liste,datas,handelDatas,selection,setSelection} = props;
    const {activites,famille,options} = props.selection;

/**
 * @param selectlicence ['SKIR','ALPI','ESCA'] utiliser en local ici dans Licence.js
 * contient la selection faite pour les licences
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
        //console.log( 'handelCheckbox',name );
        
        let newselection = activites.map( (item,index) => {
            if( item.name === name ){
                item.checked = !item.checked;
                if( item.name == 'SKIR' || item.name == 'ALPI'){
                    item.show = !item.show;
                    if( ! item.checked ){
                        item.labelchecked = false;
                    }
                }
            }
            return item;
        })

        setSelection({...selection, activites: newselection });
    }
    /**
     * Mise à jour du sous choix > à PD
     */
    const handelNiveau = ( event ) => {

        let {name} = event.target;

        let newselection = activites.map( (item,index) => {
            if( item.labelname === name ){
                item.labelchecked = !item.labelchecked;
            }
            return item;
        })

        setSelection({...selection, activites: newselection });
        
    }
/**
 * 
 */

/**
 * Choix du type de licence famille ou seul
 */
    const handelFamille = (event) => {
        const {value} = event.target;
        setSelection({...selection,famille:value});
    }

    useEffect( () => {
        /**
         * On stock les informations de selection pour 
         * savoir quelle licence proposer...
         */
        let el = [];

        activites.forEach(element => {
            if( element.checked && !element.labelchecked ){
                el.push(element.name);
            }
            if( element.checked && element.labelchecked ){
                el.push(element.labelname);
            }
        });
        setSelectlicence(el);
 
    },[activites]);
/**
 * Choix Options
 */
const handelOptions = (event) => {

    const {name} = event.target;

    console.log('handelOptions',name);

   let new_options = options.map( (item,i) => {
            if (item.name === name){
               item.checked =! item.checked; }
             return item;
            } );
       
    setSelection({...selection,
            options:new_options
        }
    );
}
const handelResetOptions = () => {
    let new_options = options.map( (item,i) => {
           item.checked = false;
         return item;
        } );
   
    setSelection({...selection,
            options:new_options
        }
    );
}
useEffect( () => {
    let options_for_datas = options.filter( item => item.checked );
    handelDatas('options',options_for_datas);
},[options]);

/**
 * Choix de la licence selon les activitées et le niveau choisi
 */
    useEffect( () => {
     
        /**
         * si il n'y a pas de licence on vide le champs type_licence dans useDatas
         * ça évite le bug d'affichage des options
         */
        if(selectlicence.length === 0 ){
            handelDatas('licence','');
        }
        

        if( selectlicence.length !==0 && famille !=="" )

        if( selectlicence.includes('ESCA') ||
            selectlicence.includes('ALPI_SUP') ||
            selectlicence.includes('SKIR_SUP') ){
            
            const {licences} = liste.ffme;

            if( famille == 'famille'){ 
               
                Object.entries(licences).map( ([item,obj]) => {
                    
                        if( obj.titre == 'FFME_FF2' ){
                            handelDatas('licence',obj);
                        }  
                });

            }else{

                Object.entries(licences).map( ([item,obj]) => {
                    
                    if( obj.titre == 'FFME_FJ' ){
                        handelDatas('licence',obj);
                    }else{
                        if( obj.titre == 'FFME_FA' ){
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

                    const {licences} = liste.ffr;

                    Object.entries(licences).map( ([item,obj]) => {
                    
                        if( famille == 'famille'){

                            if( obj.titre == 'FFR_FMPN' ){
                                handelDatas('licence',obj);
                            } 
                        }else{
                            if( obj.titre == 'FFR_IMPN' || obj.titre == 'FFR_IMPNJ'){
                                handelDatas('licence',obj);
                            }
                        }

                    });

                }else{

                    const {licences} = liste.ffr;

                    Object.entries(licences).map( ([item,obj]) => {

                        if( famille == 'famille'){

                            if( obj.titre == 'FFR_FRA'){
                                handelDatas('licence',obj);
                            }
                            
                        }else{
                            if( obj.titre == 'FFR_IRA' || obj.titre == 'FFR_IMPNJ'){
                                handelDatas('licence',obj);
                            }
                        }

                    })

                }

            /**
             * Remise à zéro des options partout !
             */
            handelResetOptions();

        }

    } ,[selectlicence,famille])

function handelClickPrecedente(event){
        //console.log('validation', event.target, club );
        nav.map( (item,i) => {
            
            if( item.label == 'Licence') {
                let index = i-1;
               navigate( nav[index].to );
            }
            
        })
    }

    return(
        <>
        <h2>Licences / Assurances</h2>
        <fieldset>
            <legend>Prenez-vous une licence pour:</legend>
            <div className="ligne_licence"><label>
                <input type="radio" name="licence_type" value="seul" onChange={handelFamille} checked={famille === 'seul'} /> Vous seulement
            </label></div>
            <div className="ligne_licence"><label>
                <input type="radio" name="licence_type" value="famille" onChange={handelFamille} checked={famille === 'famille'}/> Vous et votre famille
            </label></div>
        </fieldset>
        {
            famille !== '' ? (
            
           <fieldset>
                <legend>Cochez les activités que vous voulez pratiquer:</legend>
                
                {activites.map( (item,i) => 
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
                    )}
             </fieldset>   
            ):('')
            
        }
       
        {
            
            datas.metadata.type_licence === 'FFME_FA' || 
            datas.metadata.type_licence === 'FFME_FJ' || 
            datas.metadata.type_licence === 'FFME_FF2' ? (
            
            <fieldset>
                <legend>Options supplémentaires (nom obligatoire)</legend>
                {
                options.map( (item,i) => (
                    <div className="ligne_licence">
                        <label key={item.id}>
                            <input type="radio" name={item.name} id={item.name} checked={item.checked} value={item.titre} onClick={handelOptions} />
                            {item.titre}&nbsp;<b>{item.plein_tarif/100}€</b>
                        </label>
                    </div>
                ))
                }
            </fieldset>
               
             ):('')
        
        }
        
        <Total datas={datas}/>
        <div className="navig_bottom">
            <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}>Étape précédente</button>
            <button type="button" id="valider" className='bt_bleu' >Valider</button>
        </div>
        </>
    )
}
export default Licence;