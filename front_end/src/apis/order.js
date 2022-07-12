import api from "./api";

const getOrders = async () => {
    const datas = await api({
        method: "GET",
        url: "/api/orders",
    });

    return datas;
};

const updateItem = async (payload) => {
    const datas = await api({
        method: "PUT",
        url: "/api/orders/" + payload.id + "/status",
        data: {"orderStatus": payload.orderStatus}
    });

    return datas;
};


export { getOrders, updateItem };
