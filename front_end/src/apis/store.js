import api from "./api";

const getStores = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_2/stores",
    });

    return datas;
};

const addStore = async (payload) => {
    const datas = await api({
        method: "POST",
        url: "/sv_2/stores",
        data: payload,
    });

    return datas;
};

const updateStore = async (payload) => {
    const datas = await api({
        method: "PUT",
        url: "/sv_2/stores/" + payload.id,
        data: payload,
    });

    return datas;
};

const deleteStore = async (payload) => {
    const datas = await api({
        method: "DELETE",
        url: "/sv_2/stores/" + payload,
    });
    return datas;
};

export { getStores, addStore, updateStore, deleteStore };
