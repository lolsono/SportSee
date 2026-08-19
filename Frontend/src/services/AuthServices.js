import { GetUser } from "./RepositoryServices";

async function AuthServices(username, password) {

    const user = await GetUser(username, password);

    if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.userId);
        return true;
    }

    return false;
}

export default AuthServices;
