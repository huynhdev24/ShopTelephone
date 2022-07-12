import api from "./api";

const getProducts = async () => {
    const datas = await api({
        method: "GET",
        url: "/api/product",
    });

    return datas;
};

const addProduct = async (payload) => {
    const datas = await api({
        method: "POST",
        url: "/api/product",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" }
    });

    return datas;
};

const updateProduct = async (payload, id) => {
  
    const datas = await api({
        method: "PUT",
        url: "/api/product/" + payload.get("id"),
        data: payload,
    });

    return datas;
};

const deleteProduct = async (payload) => {
    const datas = await api({
        method: "DELETE",
        url: "/api/product/" + payload,
    });
    return datas;
};

export { getProducts, addProduct, updateProduct, deleteProduct };
