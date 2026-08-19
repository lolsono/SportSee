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

  const user = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (user.ok) {
    return await user.json();
  }

  return false;
}

