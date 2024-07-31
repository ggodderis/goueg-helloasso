import { Link } from "react-router-dom"

const Header = () => {
    return(
        <>
        <nav>
            <Link key="1" to="/">Home</Link>
            <Link key="2" to="/cotisation">Cotisation</Link>
            <Link key="3" to="/licence">Licence</Link>
        </nav>
        </>
    )
}
export default Header;
