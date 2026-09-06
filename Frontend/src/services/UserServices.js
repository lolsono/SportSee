import { GetDetailsUser } from './RepositoryServices.js';

/** Recup les infos utilisateur **/
async function UserServices() {
    
    const details = await GetDetailsUser();

    if (details) {
        return details;
    }

    return false;
};

export default UserServices;
