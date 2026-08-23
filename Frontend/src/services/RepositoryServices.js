import data from "../mocks/data.json";

const USE_MOCK = false;

/**
 * Attention en mode mock bien se déconnecter puis reconnecter
 * Car le token ne change pas il est figé.
 * Sinon ça bloque les recherches via le token
 */

/** Requête pour les connexion utilisateur **/
export async function GetUser(username, password) {

  if (USE_MOCK) {
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

    if (USE_MOCK) {
        const user = data.userInfos.find(
        user => user.token === token
        );

        if (user) {
        return user;
        }

        return false;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user-info`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.ok) {
        return await response.json();
    }

  return false;
}