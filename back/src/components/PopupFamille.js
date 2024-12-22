import usePdfFamille from "../hooks/usePdfFamille";

const PopupFamille = (props) => {

    const {famille_adulte,famille_enfant,famille_supp,payer} = props;
    /**
     * Hook pour appeler la rest route PDF
     */
    const [handelPdf] = usePdfFamille();

    const handelToPdf = ( ) => {
        //console.log( payer, famille_adulte,famille_enfant,famille_supp );
        handelPdf( payer, famille_adulte,famille_enfant,famille_supp );
    }
    
    return (
        <>
            <h1>Liste des membres</h1>
            {
                Object.keys(famille_adulte).map( (key,index) => (
                    <li>{key} - {famille_adulte[key]}</li>
                ) )
            }
            {
                Object.keys(famille_enfant).map( (key,index) => (
                    <li>{key} - {famille_enfant[key]}</li>
                ) )
            }
            <button onClick={ (event) => handelToPdf() }>PDF</button>
        </>
    )
}
export default PopupFamille;