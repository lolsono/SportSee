import "../../public/Styles/homePage.css";
import { useAuth } from "../context/ContextAuth.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";

function HomePage() {

    const { userDetails } = useAuth();
    const profile = userDetails?.profile;
    const statistics = userDetails?.statistics;

    return (
        <div className="home-page">

            <NavBar />

            <div className="home-content">

                {/* Partie gauche */}
                <section className="home-left">

                    <div className="user-card">

                        <img
                            className="user-picture"
                            src={profile?.profilePicture}
                            alt={profile?.firstName}
                        />

                        <div className="user-info">
                            <h2>
                                {profile?.firstName} {profile?.lastName}
                            </h2>

                            <p>
                            Membre depuis le{" "}
                            {new Date(profile?.createdAt).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                            </p>
                        </div>

                    </div>

                    <div className="profile-card">

                        <h2>Votre profil</h2>

                        <div className="profile-separator"></div>

                        <div className="profile-information">

                            <p>Âge : {profile?.age}</p>
                            <p>Genre : {profile?.gender === "female" ? "Femme" : "Homme"}</p>
                            <p>Taille : {profile?.height}</p>
                            <p>Poids : {profile?.weight}</p>

                        </div>

                    </div>

                </section>

                {/* Partie droite */}
                <section className="statistics-section">

                    <div className="statistics-title">
                        <h1>Vos statistiques</h1>

                        <p>
                            depuis le 14 juin 2023
                        </p>
                    </div>

                    <div className="statistics-grid">

                        <div className="stat-card">
                            <p>Temps total couru</p>
                            <strong>
                                {statistics?.totalDuration} <span>h</span>
                            </strong>
                        </div>

                        <div className="stat-card">
                            <p>Calories brûlées</p>
                            <strong>
                                ?? <small>cal</small>
                            </strong>
                        </div>

                        <div className="stat-card">
                            <p>Distance totale parcourue</p>
                            <strong>
                                {statistics?.totalDistance} <small>km</small>
                            </strong>
                        </div>

                        <div className="stat-card">
                            <p>Nombre de jours de repos</p>
                            <strong>
                                ?? <small>jours</small>
                            </strong>
                        </div>

                        <div className="stat-card">
                            <p>Nombre de sessions</p>
                            <strong>
                                 {statistics?.totalSessions} <small>sessions</small>
                            </strong>
                        </div>

                    </div>

                </section>

            </div>

            <Footer />

        </div>
    );
}

export default HomePage;
