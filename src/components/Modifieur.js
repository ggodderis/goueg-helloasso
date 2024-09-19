const Modifieur = (props) => {

const {infos,setModifier} = props;

const handelClick = (event) => {
    setModifier(false);
}

    return (
        <div className="close">
                <h3>{infos.firstName} {infos.lastName}</h3>
                <div className="rond_valider"><i className="icon-valider"></i></div>
                <button type="button" className="bt_modifier" onClick={ handelClick }>modifier les informations</button>
        </div>
    )
}
export default Modifieur;