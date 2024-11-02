import { React } from 'react';

const InfosBulle = ( props ) => {

    const {handelBulle} = props;
    
    return(
        <>
            <div className="content_close">
                <button className="bt_close" onClick={handelBulle}><i className="icon-close"></i></button>
            </div>
            <b>LES LICENCES IMPN, FMPN de la FFRandonnée ASSURENT en Responsabilité Civile, Dommages Corporels et Assistance Rapatriement :</b>
            <br />
            <ul>
            <li>La randonnée glaciaire avec parcours sur glaciers,</li>
            <li>Les passages avec petite escalade</li>
            <li>Et, plus généralement dès que l’itinéraire exige en toute circonstance une technique et/ou un matériel spécifique à la haute montagne sans toutefois dépasser la cotation PD (peu difficile) de l’échelle internationale de cotation de difficulté de l’UIAA en référence au guide le plus diffusé sur un secteur donné</li>
            </ul>
        </>
    )
}
export default InfosBulle;