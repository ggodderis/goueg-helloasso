const Modifieur = (props) => {

const {infos,setModifier} = props;

const handelClick = (event) => {
    setModifier(false);
}

    return (
        <div className="close">
            <fieldset>
                <legend>{infos.firstName} {infos.lastName}</legend>
                <button type="button" className="bt_modifier" onClick={ handelClick }>modifier les informations</button>
            </fieldset>
        </div>
    )
}
export default Modifieur;