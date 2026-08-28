import { useState, useEffect } from 'react';
import '../../public/Styles/runChart.css'
import ChartServices from '../services/ChartServices';

//icone 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

//import pour les graphiques
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

function RunChart () {

    // Gestion du sélecteur de date
    const [startWeek, setStartWeek] = useState(new Date(new Date().getFullYear(), 0, 28));
    const [endWeek, setendWeek] = useState(new Date(new Date().getFullYear(), 1, 28));

    // Gestion de récupération des valeurs pour le graphique
    const [stats, setStats] = useState([]);
    const [averageDistance, setAverageDistance] = useState(0);

    useEffect(() => {

        async function fetchStats() {
            try {
                const data = await ChartServices(startWeek, endWeek);
                
                const RunData = data.map(item => ({
                    date: item.date,
                    dist: item.distance ?? 0,
                    duration: item.duration ?? 0
                }));

                // Regroupement des distances par semaine
                const weeklyData = [
                    { week: "S1", dist: 0 },
                    { week: "S2", dist: 0 },
                    { week: "S3", dist: 0 },
                    { week: "S4", dist: 0 }
                ];

                RunData.forEach(item => {

                    const date = new Date(item.date);

                    const difference = Math.floor(
                        (date - startWeek) / (1000 * 60 * 60 * 24)
                    );

                    let weekIndex = Math.floor(difference / 7);

                    if (weekIndex > 3) {
                        weekIndex = 3;
                    }

                    if (weekIndex >= 0) {
                        weeklyData[weekIndex].dist += item.dist;
                    }
                });

                setStats(weeklyData);

                const averageDistance = calculateAverageDistance(weeklyData);
                setAverageDistance(averageDistance);

            } catch (error) {
                console.error("Erreur lors de la récupération des stats :", error);
            }
        }

        fetchStats();
    }, [startWeek, endWeek]);

    //fonction de calcule de la moyenne
    function calculateAverageDistance(RunData) {
        
        const totalDistance = RunData.reduce(
            (total, item) => total + item.dist,
            0
        );

        if (RunData.length === 0) {
            return 0;
        }

        const averageDistance = totalDistance / RunData.length;

        return averageDistance;
    }

    // Gestion du sélecteur de date
    function nextWeek() {
        setStartWeek(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() + 1);
            return date;
        });

        setendWeek(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() + 1);
            return date;
        });
    }

    function previousWeek() {
        setStartWeek(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() - 1);
            return date;
        });

        setendWeek(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() - 1);
            return date;
        });
    }

    return (
      <div className='runChart-container'>

        <div className='TopContainer'>

            <div className='runBpm'>
                <h3>{averageDistance.toFixed(1)} Km en moyenne</h3>
                <p>Total des kilomètres du mois</p>
            </div>

            <div className='SelectWeek'> 
                <button onClick={previousWeek}><FontAwesomeIcon icon={faChevronLeft} /></button>

                <p>
                    {startWeek.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                    })}
                    {" - "}
                    {endWeek.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                    })}
                </p>

                <button onClick={nextWeek}><FontAwesomeIcon icon={faChevronRight} /></button> 
            </div>
        </div>

        <ComposedChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={stats}
            margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            >
            <CartesianGrid 
                stroke="#f5f5f5"
                strokeDasharray="3 3" 
            />
            <XAxis
                dataKey="week"
                scale="band"
            />
            <YAxis />
            <Tooltip />
            <Legend
                wrapperStyle={{
                    paddingRight: "250px"
                }}
            />
            <Bar dataKey="dist" name="Dist" barSize={20} fill="#B6BDFC" radius={30}/>
        </ComposedChart>
      </div>  
    );
}

export default RunChart;
