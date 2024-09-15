import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Total from '../components/Total';
import useHello from '../hooks/useHello';

const Licence = (props) => {
    
    const navigate = useNavigate();

    const [token,startPaye] = useHello();
/**
 * Récupération en provenance de App.js
 * de @param selection []
 */
    const {nav,setNav,liste,datas,handelDatas,selection,setSelection} = props;
    const {metadata} = datas;
    const {options_ffme} = datas.metadata;
    const {activites,famille,} = props.selection;

/**
 * @param selectlicence ['SKIR','ALPI','ESCA'] utiliser en local ici dans Licence.js
 * contient la selection faite pour les licences
 * afin de savoir si c'est ffme ou ffr
 */
    
const [selectlicence,setSelectlicence] = useState([]);


useEffect( () => {

    let toto = [];

    activites.map( (item,i) => {
        if( item.checked ){
            toto.push( item.name )
        }
        if( item.labelchecked ){
            toto.push( item.labelname );
        }
    });
    setSelectlicence(toto);

    console.log('toto',toto);
    

},[]);
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
 * Mise à jour de selection [] dans useDatas.js
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
    // const handelFamille = (event) => {
    //     const {value} = event.target;
    //     setSelection({...selection,famille:value});
    // }

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

    const {name,checked} = event.target;

   let new_options = options_ffme.map( (item,i) => {
    
            if (item.name === name){

               item.checked = checked;

            }
             return item;

            } 
        );
    
    // setSelection({...selection,
    //         options:new_options
    //     }
    // );
    handelDatas('options',new_options);

}

const handelClickMurSoutien = (event) => {

    const {name,value,checked} = event.target;

    switch (name) {
        case 'mur':
            if( checked ){
                handelDatas('mur',value);
            }else{
                handelDatas('mur',0);
            }   
            break;
        case 'soutien':
            if( checked ){
                handelDatas('soutien',value);
            }else{
                handelDatas('soutien',0);
            }  
            break;
    }
    
}

/**
 * On paye !
 */
const handelPaye = (event) => {
    startPaye(datas);
}
    useEffect( () => {
        console.log(token);
    },[token])


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
        {/* <fieldset>
            <legend>Prenez-vous une licence pour:</legend>
            <div className="ligne_licence">
                <label className="label_radio">
                <input type="radio" name="licence_type" value="seul" onChange={handelFamille} checked={famille === 'seul'} /> Vous seulement
                </label>
            </div>
            <div className="ligne_licence">
                <label className="label_radio">
                <input type="radio" name="licence_type" value="famille" onChange={handelFamille} checked={famille === 'famille'}/> Vous et votre famille
                </label>
            </div>
        </fieldset> */}

            <div className="content_membre">
                <fieldset>
                        <legend>Cochez les activités que vous voulez pratiquer:</legend>
                        
                        {
                        activites.map( (item,i) => 
                            (
                            <div className="ligne_licence">
                            <label key={i} className="label_radio">
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
                        
                    </fieldset>

                {
                            
                    selectlicence.includes('ESCA') ||
                    selectlicence.includes('ALPI_SUP') ||
                    selectlicence.includes('SKIR_SUP') ? (
                    
                    <fieldset>
                        <legend>Options supplémentaires (nom obligatoire)</legend>
                        {
                        options_ffme.map( (item,i) => (
                            <div className="ligne_licence">
                                <label key={item.id} className="label_radio">
                                    <input type="checkbox" name={item.name} id={item.name} checked={item.checked} value={item.titre} onClick={handelOptions} />
                                    {item.titre}&nbsp;<b>{item.plein_tarif/100}€</b>
                                </label>
                            </div>
                        ))
                        }
                    </fieldset>
                    
                    ):('')

                }

            </div>
            <fieldset>
                <legend>Voulez-vous utiliser le mur d'escalade au gymnase Berthe de Boissieux ?</legend>
                <label className="label_radio">
                    <input type="checkbox" name="mur" checked={ metadata.mur } value="3000" onChange={handelClickMurSoutien} />oui :&nbsp;<b>30€</b>
                </label>
            </fieldset>
        
        <Total datas={datas}/>
        <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}>
                    <i className="icon-chevron-gauche"></i>&nbsp;Étape précédente
                </button>
            {
                datas.metadata.type_licence &&
                <button type="button" id="valider" className='bt_vert' onClick={handelPaye}>
                    <i className="icon-valider"></i>&nbsp;Payer mon adhésion
                </button>
            }
        </div>
        </>
    )
}
export default Licence;