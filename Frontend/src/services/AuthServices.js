import { GetUser } from "./RepositoryServices";

async function AuthServices(username, password) {

    const user = await GetUser(username, password);

    console.log(user);
    console.log(user.token);
    console.log(user.userId);

    if (user === undefined) {
        return user;
    }

    localStorage.setItem("token", user.token);
    localStorage.setItem("id", user.userId);
}

export default AuthServices;
