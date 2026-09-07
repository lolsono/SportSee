import data from "../mocks/data.json";

const USE_MOCK = import.meta.env.VITE_USE_MOCK;

/**
 * Attention en mode mock bien se déconnecter puis reconnecter
 * Car le token ne change pas il est figé.
 * Sinon ça bloque les recherches via le token.
 */

/**
 * Requête de connexion utilisateur
 */
export async function GetUser(username, password) {

    if (USE_MOCK === "true") {

        const user = data.users.find(
            user =>
                user.username === username &&
                user.password === password
        );

        if (user) {
            return user;
        }

        return false;
    }

    const response = await fetch(
        `${process.env.API_URL}/api/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }
    );

    if (response.ok) {
        return await response.json();
    }

    return false;
}


/**
 * Requête pour récupérer les détails de l'utilisateur connecté
 */
export async function GetDetailsUser() {

    const response = await fetch(
        `/api/user`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (response.ok) {
        return await response.json();
    }

    return false;
}


/**
 * Requête pour récupérer les statistiques de la semaine
 */
export async function GetStatsWeek(startWeek, endWeek) {
    const response = await fetch(
        `/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (response.ok) {
        return await response.json();
    }

    return false;
}

