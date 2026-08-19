import data from "../mocks/data.json";

const USE_MOCK = false;

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

