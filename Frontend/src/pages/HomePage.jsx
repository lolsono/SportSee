import { useState, useEffect } from 'react';
import "../../public/Styles/homePage.css";
import { useAuth } from "../context/ContextAuth.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import ChartServices from '../services/ChartServices.js';

function HomePage() {

    const { userDetails } = useAuth();
    const profile = userDetails?.profile;
    const statistics = userDetails?.statistics;

    const [stats, setStats] = useState(0);

    //gestion des dates 
    const currentDate = new Date();
    const startWeek = new Date(currentDate.getFullYear(), 0, 1);
    const endWeek = currentDate;

    // Fonction de calcul du total des calories
    function calculateSomeCalories(runData) {
        const totalCalories = runData.reduce(
            (total, item) => total + (item.caloriesBurned ?? 0),
            0
        );

        return totalCalories;
    }

    // Gestion des informations utilisateur
    useEffect(() => {

        async function fetchStats() {
            try {
                const data = await ChartServices(startWeek, endWeek);

                const runData = data.map(item => ({
                    caloriesBurned: item.caloriesBurned ?? 0,
                }));

                const someCal = calculateSomeCalories(runData);
                setStats(someCal);

            } catch (error) {
                console.error("Erreur lors de la récupération des stats :", error);
            }
        }

        fetchStats();
    }, [startWeek, endWeek]);

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
                            depuis le 1 janvier 2026
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
                                {stats} <small>cal</small>
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
                                9 <small>jours</small>
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
