const PopupFamille = (props) => {

    const {famille_adulte,famille_enfant,famille_supp} = props;

    
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
        </>
    )
}
export default PopupFamille;