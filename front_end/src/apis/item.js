import api from "./api";

const getItems = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_3/items",
    });

    return datas;
};

const addItem = async (payload) => {
    const datas = await api({
        method: "POST",
        url: "/sv_3/items",
        data: payload,
    });

    return datas;
};

const updateItem = async (payload) => {
    const datas = await api({
        method: "PUT",
        url: "/sv_3/items/" + payload.id,
        data: payload.data,
    });

    return datas;
};

const deleteItem = async (payload) => {
    const datas = await api({
        method: "DELETE",
        url: "/sv_3/items/" + payload,
    });
    return datas;
};

const getItemsByStore = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_3/items/in-store/" + payload,
    });
    return datas;
};

export { getItems, addItem, updateItem, deleteItem, getItemsByStore };
