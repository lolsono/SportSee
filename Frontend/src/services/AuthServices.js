import { GetUser } from "./RepositoryServices";

async function AuthServices(email, password) {

    const user = await GetUser(email, password);

    if (user) {
        document.cookie = `token=${user.token}; SameSite=Lax`;
        return true;
    }

    return false;
}

export default AuthServices;
