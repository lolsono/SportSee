import data from "../mocks/data.json";

const USE_MOCK = true;

export async function GetUser(username, password) {

  if (USE_MOCK) {

    return data.users.find(user => user.username === username);

  }

  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }

  return response.json();
}

