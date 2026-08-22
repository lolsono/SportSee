import { GetUser } from "./RepositoryServices";

async function AuthServices(email, password) {

    const user = await GetUser(email, password);

    if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.userId);
        return true;
    }

    return false;
}

export default AuthServices;
