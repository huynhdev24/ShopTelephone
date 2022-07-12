import api from "./api";

const getUsers = async () => {
    const users = await api({
        method: "GET",
        url: "/api/user",
    });
    return users;
};

const getProfile = async () => {
    const user = await api({
        method: "GET",
        url: "/api/user/profile",
    });
    return user;
};

const addUser = async (payload) => {
    const user = await api({
        method: "POST",
        url: "/sv_1/users",
        data: payload,
    });

    return user;
};

const updateUser = async (payload) => {
    const user = await api({
        method: "PUT",
        url: "/api/user/" + payload.id
    });

    return user;
};

export { getUsers, addUser, updateUser, getProfile };
