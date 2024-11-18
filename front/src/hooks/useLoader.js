const useLoader = () => {

    const showLoader = () => {
        document.body.innerHTML += `<div class="hello_loader">
            <p>Vous allez être rediriger sur la page de paiement<br />
                <img src='${REACT_VARS.url_images}assets/hello.png' alt="Helloasso" />
            </p>
        </div>`;
    }

    return[showLoader];
}
export default useLoader;