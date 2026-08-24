import { GetStatsWeek } from "./RepositoryServices";

/** Function pour recup les info de 1 semaine **/
async function ChartServices (startWeek, endWeek) {

    const token = localStorage.getItem("token");

    const stats = await GetStatsWeek(startWeek, endWeek, token)

    if (stats) {
        return stats;
    }

    return false;
}

export default ChartServices;