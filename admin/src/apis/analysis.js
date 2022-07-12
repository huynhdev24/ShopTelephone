import api from "./api";

const weeklySaleInDept = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/api/statistic/registerUser",
        params: payload,
    });

    return datas;
};

const weeklySaleInDept2 = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/api/statistic/orderSuccessMonth",
        params: payload,
    });

    return datas;
};


const weeklySaleInDept3 = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/api/statistic/revenueMonth",
        params: payload,
    });

    return datas;
};


export { weeklySaleInDept, weeklySaleInDept2, weeklySaleInDept3 };
