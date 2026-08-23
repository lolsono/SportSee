import "../../public/Styles/navbar.css";
import Logo from "../../public/Images/Logo.svg";
import { useAuth } from "../context/ContextAuth";

function Navbar() {

    const { logOut } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Sportsee" />
            </div>

            <nav className="navbar-menu">
                <a href="/dashboard">Dashboard</a>
                <a href="/homePage">Mon profil</a>

                <span className="navbar-separator"></span>

                <a
                    href="/"
                    className="logout"
                    onClick={logOut}
                >
                    Se déconnecter
                </a>
            </nav>
        </header>
    );
}

export default Navbar;
