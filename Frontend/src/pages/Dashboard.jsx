import "../../public/Styles/dashboard.css";
import { useAuth } from "../context/ContextAuth.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import BpmChart from "../components/BpmChart.jsx";
import RunChart from "../components/RunChart.jsx"
import WeekGoalChart from "../components/WeekGoalChart.jsx";

function Dashboard () {

    const { userDetails } = useAuth();
    const profile = userDetails?.profile;
    const statistics = userDetails?.statistics;

    return(
    <>
        <div className="dashboard">
            <NavBar />

            <div className="dashboard-content">

                <div className="dashboard-user-card">

                    <img
                        className="dashboard-user-picture"
                        src={profile?.profilePicture}
                        alt={profile?.firstName}
                    />

                    <div className="dashboard-user-info">
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

                    <div className="dashboard-distance">
                        <span>Distance totale parcourue</span>
                        <strong>{statistics?.totalDistance} Km</strong>
                    </div>

                </div>

                <div className="chart-container">
                    <h2>Vos dernières performances</h2>
                    <RunChart />
                    <BpmChart />
                </div>

                <div className="week-section">

                <div className="week-title">
                    <h2>Cette semaine</h2>
                    <p>Du 23/06/2025 au 30/06/2025</p>
                </div>


                <div className="week-content">

                    <div className="week-goal-card">

                        <div className="week-goal-header">
                            <h3>
                                <strong>x4</strong>
                                <span>sur objectif de 6</span>
                            </h3>
                            <p>Courses hebdomadaire réalisées</p>
                        </div>

                        <WeekGoalChart />

                    </div>


                    <div className="week-statistics">

                        <div className="week-stat-card">
                            <p>Durée d'activité</p>
                            <strong>140 <span>minutes</span></strong>
                        </div>


                        <div className="week-stat-card">
                            <p>Distance</p>
                            <strong className="distance">21.7 <span>kilomètres</span></strong>
                        </div>

                        </div>
                </div>
                </div>
            </div>

            <Footer />

        </div>
    </>
    );

}

export default Dashboard;