const Navigdate = (props) => {

    const {dates,handelClients} = props;

    const handelSelect = (event) => {
        const {value} = event.target;
        const dates = value.split('-');
        handelClients( dates[0], dates[1] );
        
    }
    
    return(
        <div className="navig_dates">
            <select onChange={handelSelect}>
                {
                dates ? (
                    dates.map( (item,i) => (
                        <option key={i} selected={item.checked} value={item.value}>{item.option}</option>
                    ))
                ):('')
                }
            </select>
        </div>
    )

}
export default Navigdate;