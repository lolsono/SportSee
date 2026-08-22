import { GetDetailsUser } from './RepositoryServices.js';

async function UserServices(token) {

    const details = await GetDetailsUser(token);

    if (details) {
        return details;
    }

    return false;
}

export default UserServices;
