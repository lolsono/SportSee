import "../../public/Styles/navbar.css";
import Logo from "../../public/Images/Logo.svg";
import { Link, useFetcher } from "react-router";

function Navbar() {

    const fetcher = useFetcher();

    const handleLogout = () => {
        console.log("envoie de logout");
        fetcher.submit(null, {
            method: "POST",
            action: "/api/logout",
        });
    };

    return (
        <header className="navbar">

            <div className="navbar-logo">
                <img src={Logo} alt="Sportsee" />
            </div>

            <nav className="navbar-menu">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/homePage">
                    Mon profil
                </Link>

                <span className="navbar-separator"></span>

                <button
                    type="button"
                    className="logout"
                    onClick={handleLogout}
                >
                    Se déconnecter
                </button>

            </nav>

        </header>
    );
}

export default Navbar;
