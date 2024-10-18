import { React, useState, useEffect } from 'react';

const LicenceGuide = ( props ) => {


    const {datas,handelDatas,selection,setSelection} = props;
    const {options_ffme} = datas.metadata;
    const {activites,mur} = props.selection;
    
    /**
     * @param selectlicence ['SKIR','ALPI','ESCA'] utiliser en local ici dans Licence.js
     * contient la selection faite pour les licences
     * afin de savoir si c'est ffme ou ffr
     */
    
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
    },[]);

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
        
        handelDatas('options',new_options);

    }
    /**
     * Choix mur d'escalade
     */
    const handelClickMur = (event) => {

        const {checked} = event.target;
        
        setSelection({...selection, mur: {...selection.mur, checked: checked }  });
        
    }

    return(

        <div className="content_licences">
                <fieldset>
                        <legend>Cochez les activités que vous voulez pratiquer:</legend>
                        
                        {
                        activites.map( (item,i) => (
                             
                            <div className="ligne_licence">

                            <label key={i} className="label_radio">
                                <input type="checkbox" name={item.name} id={item.name} checked={ item.checked } onChange={handelCheckbox} />
                                <span className="new_input"></span>
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
                                    <span className="new_input"></span>
                                    {item.titre}&nbsp;<b>{item.plein_tarif/100}€</b>
                                </label>
                            </div>
                            ) )
                        }

                    </fieldset>
                    
                    ):('')

                }
            <fieldset>
                <legend>{mur.descriptif}</legend>
                <label className="label_radio">
                    <input type="checkbox" name={mur.name} checked={mur.checked} value={mur.plein_tarif} onChange={handelClickMur} />
                    <span className="new_input"></span>
                    oui :&nbsp;<b>30€</b>
                </label>
            </fieldset>

            </div>
    )

}
export default LicenceGuide;