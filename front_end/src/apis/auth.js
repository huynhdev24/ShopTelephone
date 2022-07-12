import api from "./api";

const login = async (email, password) => {
    const loginInfo = await api({
        method: "POST",
        url: "/api/user/login",
        data: { email, password },
    });
    return loginInfo;
};

const currentUser = async () => {
    const currentUser = await api({
        method: "GET",
        url: "/api/user/profile",
    });
    return currentUser;
};

export { login, currentUser };
