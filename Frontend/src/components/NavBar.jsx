import "../../public/Styles/navbar.css";
import Logo from "../../public/Images/Logo.svg";
import { useAuth } from "../context/ContextAuth";
import { Link } from "react-router";

function Navbar() {

    const { logOut } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Sportsee" />
            </div>

            <nav className="navbar-menu">
                <Link to="/dashboard">Dashboard</Link>

                <Link to="/homePage">Mon profil</Link>

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
