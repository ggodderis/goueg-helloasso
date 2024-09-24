import hello from '../assets/hello.png';

const Loader = () => {

    return (
        <div className="hello_loader">
            <p>Vous allez être rediriger sur la page de paiement<br />
                <img src={hello} alt="Helloasso" />
            </p>
        </div>
    )
}
export default Loader;