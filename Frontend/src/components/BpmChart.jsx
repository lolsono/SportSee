import { useState, useEffect } from 'react';
import '../../public/Styles/bpmChart.css'
import ChartServices from '../services/ChartServices';

//icone 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

//import pour les graphiques
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

function BpmChart () {

    // Gestion du sélecteur de date
    const [startWeek, setStartWeek] = useState(new Date(new Date().getFullYear(), 0, 5));
    const [endWeek, setendWeek] = useState(new Date(new Date().getFullYear(), 0, 11));

    // Gestion de récupération des valeurs pour le graphique
    const [stats, setStats] = useState([]);
    const [averageBpm, setAverageBpm] = useState(0);

    useEffect(() => {

        async function fetchStats() {
            try {
                const data = await ChartServices(startWeek, endWeek);
                
                const heartData = data.map(item => ({
                    date: item.date,
                    min: item.heartRate?.min ?? null,
                    average: item.heartRate?.average ?? null,
                    max: item.heartRate?.max ?? null
                }));

                setStats(heartData);

                const averageBpm = calculateAverageBpm(heartData);
                setAverageBpm(averageBpm);
            } catch (error) {
                console.error("Erreur lors de la récupération des stats :", error);
            }
        }

        fetchStats();
    }, [startWeek, endWeek]);

    //fonction de calcule de la moyenne
    function calculateAverageBpm(heartData) {
        
        const totalBpm = heartData.reduce(
            (total, item) => total + item.average,
            0
        );

        const averageBpm = totalBpm / heartData.length;

        return averageBpm;
    }

    // Gestion du sélecteur de date
    function nextWeek() {
        setStartWeek(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() + 7);
            return date;
        });

        setendWeek(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() + 7);
            return date;
        });
    }

    function previousWeek() {
        setStartWeek(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() - 7);
            return date;
        });

        setendWeek(prev => {
            const date = new Date(prev);
            date.setDate(date.getDate() - 7);
            return date;
        });
    }

    console.log("STATS :", stats);

    return (
      <div className='BpmChart-container'>

        <div className='TopContainer'>

            <div className='ReadBpm'>
                <h3>{averageBpm} BPM</h3>
                <p>Fréquence cardiaque moyenne</p>
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
                dataKey="date"
                scale="band"
                tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("fr-FR", {
                        weekday: "long"
                    })
                }
            />
            <YAxis />
            <Tooltip />
            <Legend 
                wrapperStyle={{
                    paddingRight: "140px"
                }}
            />
            <Bar dataKey="min" name="Min" barSize={20} fill="#FCC1B6" radius={30}/>
            <Bar dataKey="max" name="Max" barSize={20} fill="#F4320B" radius={30}/>
            <Line type="monotone" dataKey="max" name="Max" stroke="#0B23F4" />
        </ComposedChart>
      </div>  
    );
}

export default BpmChart