import { React, useState, useEffect, useContext } from 'react';
import { ContextDatas } from '../hooks/useContextDatas';
import InfosBulle from './InfosBulles';
import Anim from './Anim';

const LicenceGuide = ( props ) => {


    const {datas,handelDatas,selection,setSelection} = useContext( ContextDatas );
    const {options_ffme} = datas.metadata;
    const {activites,mur} = selection;
    
    const [bulle,setBulle] = useState(false);

    /**
     * @param selectlicence ['SKIR','ALPI','ESCA'] utiliser en local ici dans Licence.js
     * contient la selection faite pour les licences
     * afin de savoir si c'est ffme ou ffr
     */
    
    //console.log( activites );
    
    const [selectlicence,setSelectlicence] = useState([]);

    useEffect( () => {

        let temp = [];
    
        activites.map( (item,i) => {
            if( item.checked ){
                temp.push( item.name )
            }   
            if( item.labelchecked ){
                temp.push( item.labelname );
            }
        });
        setSelectlicence(temp);

    },[activites]);


    /**
     * Mise à jour de selection [] dans useDatas.js
     */
    const handelCheckbox = (event) => {

        let {name} = event.target;
        /**
         * Si le mur d'escalade est selectionné on empêche
         * le click sur escalade
         */
        if( selection.mur.checked && name === 'ESCA') return false;
        
        let newselection = activites.map( (item,index) => {
            if( item.name === name ){
                item.checked = !item.checked;
                if( item.name === 'SKIR' || item.name === 'ALPI'){
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
        
        handelDatas('OPTIONS',new_options);

    }
    /**
     * Choix mur d'escalade
     */
    const handelClickMur = (event) => {

        const {checked} = event.target;
        
        setSelection({...selection, mur: {...selection.mur, checked: checked }  });
        
    }
    /**
     * Infos bulle pour Alpinisme et Ski de randonnée
     */
    const handelBulle = (event) => {

        setBulle( bulle ? false : true );
        //setBulle( bulle )
        
    }
    /**
     *  Question sante
     */
    const handelSante = (event) => {
        handelDatas('SANTE', event.target.checked );
    }

    return(
        <>
        <p className="champs_obligatoire"><span className="red">*</span>Sélection obligatoire</p>
        <div className="content_licences">
            
            <Anim visible={bulle} duration={300}>
                <InfosBulle handelBulle={handelBulle} />
            </Anim>
                <fieldset>
                        <legend>Cochez les activités que vous voulez pratiquer<span className="red">*</span></legend>
                        
                        {
                        activites.map( (item,i) => (
                             
                            <div className="ligne_licence">

                                <label key={i} className="label_radio">
                                <input type="checkbox" name={item.name} id={item.name} checked={ item.checked } onChange={handelCheckbox} />
                                <span className="new_input"></span>
                                {item.descriptif}
                                {/* Cas pour les infos bulles */}
                                { 
                                    item.name === 'ALPI' || item.name === 'SKIR' ? (<button onClick={handelBulle} className="bt_bulle">+ d'infos</button>):('')
                                }
                                </label>

                                {
                                    item.show ? (
                                        <div className="sous_ligne_licence">
                                            {item.label}
                                            <label an className="label_radio">
                                                <input type="checkbox" name={item.labelname} checked={item.labelchecked} onChange={handelNiveau} />
                                                <span className="new_input"></span>oui
                                            </label>
                                        </div>
                                ):('')
                                }

                            </div>
                                )
                            )
                        }
                        
                    </fieldset>
                <fieldset>
                    {/* Si le secteur ffr ou ffme existe */}
                    {
                        datas.metadata.secteur !='' ? (
                            <>
                            <legend>Avez-vous pris connaissance des conditions médicales de la <b>{datas.metadata.secteur}</b> ?<span className="red">*</span></legend>
                            <label className="label_radio">
                                <input type="checkbox" name="questionnaire" onChange={handelSante} defaultChecked={ datas.metadata.payer.question === true } />
                                <span className="new_input"></span>
                                oui&nbsp;&nbsp;<a href={`#sante_${datas.metadata.secteur}`} >Consulter les conditions</a>
                            </label>
                            <br />
                            </>

                        ):('')
                    }

                    {
                            
                        selectlicence.includes('ESCA') ||
                        selectlicence.includes('ALPI_SUP') ||
                        selectlicence.includes('SKIR_SUP') ? (
                        
                        <>
                            <legend>Options supplémentaires (nom obligatoire)</legend>
                            <br />
                            {
                            options_ffme.map( (item,i) => (
                                <div className="ligne_licence">
                                    <label key={item.id} className="label_radio">
                                        <input type="checkbox" name={item.name} id={item.name} checked={item.checked} value={item.titre} onClick={handelOptions} />
                                        <span className="new_input"></span>
                                        {item.titre}&nbsp;<b>{item.plein_tarif/100}€</b>
                                    </label>
                                </div>
                                ) )
                            }

                        </>
                        
                        ):('')

                    }
                </fieldset>
                
            </div>

            <fieldset>
                <legend>{mur.descriptif}</legend>
                <label className="label_radio">
                    <input type="checkbox" name={mur.name} checked={mur.checked} value={mur.plein_tarif} onChange={handelClickMur} />
                    <span className="new_input"></span>
                    oui :&nbsp;<b>{mur.plein_tarif/100}€</b>
                </label>
            </fieldset>
        </>
    )

}
export default LicenceGuide;