import "../../public/Styles/footer.css";
import Logo from "../../public/Images/Mini_logo.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <p className="footer-copyright">© Sportsee&nbsp;&nbsp; Tous droits réservés</p>

                <div className="footer-links">
                    <a href="/conditions">Conditions générales</a>
                    <a href="/contact">Contact</a>
                    <img src={Logo} alt="Sportsee" className="footer-logo"/>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
