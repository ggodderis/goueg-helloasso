const Select = ({role,setRole}) => {

    // const [valeur,setValeur]= useState(role);

    const liste = [
        { index: '', name:'-- Choisir la liste d\'envoi --' },
        { index: 'administrator', name:'Administrateur' },
        { index: 'editor', name:'Bureau' },
        { index: 'author', name:'Comité de gestion' },
        { index: 'contributor', name:'Organisateurs' },
        { index: 'subscriber', name:'Adhérents' },
        { index: 'gda_inscript_escalade', name:'Adhérents escalade' },
    ];
    

    function handelChange(event){
        setRole( event.target.value );
    }

    return(
        <select value={role} onChange={handelChange} >
            {
                liste.map( (item,index) =>(
                    <option key={index} value={item.index}>{item.name}</option>
                    )
                )
            }
        </select>
    )

}
export default Select;