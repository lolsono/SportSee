import "../../public/Styles/dashboard.css";
import { useAuth } from "../context/ContextAuth.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import BpmChart from "../components/BpmChart.jsx";
import RunChart from "../components/RunChart.jsx"

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
                        <strong>?? km</strong>
                    </div>

                </div>
                  
                <div className="chart-container">
                    <h2>Vos dernières performances</h2>
                    <RunChart />
                    <BpmChart />
                </div>

            </div>

            <Footer />

        </div>
    </>
    );

}

export default Dashboard;