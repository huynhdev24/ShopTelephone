import api from "./api";

const getRoles = async () => {
    const roles = await api({
        method: "GET",
        url: "/sv_1/roles",
    });
    return roles;
};

export { getRoles };
