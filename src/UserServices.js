import { userApi } from './APIClient';
const UserServices = {
    register: async ({firstName, lastName, username, password, email, userId,profilePicture}) => {
        // Handle traditional login and then one with google
        let body = { firstName, lastName, username, password, userId, email, profilePicture };
        try {
            const response = await userApi.post("register",body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response;
        } catch (error) {
            console.log("Error Creating a new user", error);
            throw error;
        }
    },
    checkUser: async ({ userId }) => {
        let body = { userId };
        try {
            const response = await userApi.post("checkUser",body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response;
        }catch (error) {
            console.log("Error checking user", error);
            throw error;
        }
    },
    login: async ({ username, password }) => {
        let body = { username, password };
        try {
            const response = await userApi.post("login/username-password",body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response;
        }catch (error) {
            console.log("Error loggin in", error);
            throw error;
        }
    }
}

export default UserServices;