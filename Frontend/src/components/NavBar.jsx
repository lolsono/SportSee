import "../../public/Styles/navbar.css";
import Logo from "../../public/Images/Logo.svg";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Sportsee" />
            </div>

            <nav className="navbar-menu">
                <a href="/dashboard">Dashboard</a>
                <a href="/homePage">Mon profil</a>

                <span className="navbar-separator"></span>

                <a href="/logout" className="logout">
                    Se déconnecter
                </a>
            </nav>
        </header>
    );
}

export default Navbar;
