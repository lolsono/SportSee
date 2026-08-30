import data from "../mocks/data.json";
import getCookie from "./CookieServices";

const USE_MOCK = import.meta.env.VITE_USE_MOCK

/**
 * Attention en mode mock bien se déconnecter puis reconnecter
 * Car le token ne change pas il est figé.
 * Sinon ça bloque les recherches via le token
 */

/** Requête pour les connexion utilisateur **/
export async function GetUser(username, password) {

  if (USE_MOCK === "true") {
      const user = data.users.find(
          user => user.username === username
              && user.password === password
      );

      if (user) {
          return user;
      }

      return false;
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username,
          password
      })
  });

  if (response.ok) {
    return await response.json();
  }

  return false;
}

/** Requête pour les details de l'utilisateur **/
export async function GetDetailsUser(token) {

    if (USE_MOCK === "true") {
        const user = data.userInfos.find(
            user => user.token === token
        );

        return user || false;
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user-info`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const text = await response.text();

    if (response.ok) {
        return JSON.parse(text);
    }

    return false;
}


/** Requête récup les stats pour graphique **/
export async function GetStatsWeek(startWeek, endWeek) {

    if (USE_MOCK === "true") {

        const user = data.userInfos.find(
            user => user.token === getCookie("token")
        );

        if (!user) {
            console.log("Utilisateur introuvable");
            return false;
        }

        // On transforme les dates en YYYY-MM-DD
        const formatDate = (date) => {
            if (date instanceof Date) {
                return date.toISOString().split("T")[0];
            }

            return String(date).split("T")[0];
        };

        const startDate = formatDate(startWeek);
        const endDate = formatDate(endWeek);

        const stats = user.runningData.filter((activity) => {

            const activityDate = formatDate(activity.date);

            return activityDate >= startDate && activityDate <= endDate;
        });

        return stats;
    }

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("token")}`
            },
        }
    );

    if (response.ok) {
        return await response.json();
    }

  return false;
}