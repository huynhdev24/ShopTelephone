import React, { useEffect, useState } from "react";
import { Wrapper, Title } from "./styles";
import apis from "../../apis";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import UpdateOrder from "../Modal/UpdateOrder";
import DetailOrder from "../Modal/DetailOrder";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let datas = [];
    const hasDetail = true;
    const [reload, setReload] = useState(0);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});

    const statusData = [
        {0: "Order success" },
        {1: "Order received" },
        {2: "Preparing goods" },
        {3: "Shipping handover" },
        {4: "Being transported" },
        {5: "Delivery successful" },
        {6: "Cancel order" },
    ];

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const res = await apis.order.getOrders();
                setOrders(res);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        setReload(0);
        getItems();
    }, [reload]);

    orders.forEach((order) => {
        let d = new Date(order.createdAt);
        let date = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
        datas.push({ ...order, createdAt: date });
    });

    const labels = [
        {
            Header: "Customer name",
            accessor: d => d.deliveryAdd.name,
        },
        {
            Header: "Product name",
            accessor: d => d.orderProd.name,
        },
        {
            Header: "Number of product",
            accessor: "numOfProd",
        },
        {
            Header: "Status order",
            accessor: d => Object.values(statusData[d.orderStatus]),
        },
        {
            Header: "Transport fee",
            accessor: "transportFee",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (item) => {
        if (window.confirm("Order of " + item.deliveryAdd.customerName + " will be deleted!") === true) {
            apis.order.updateItem({"id": item.id, "orderStatus": 6}).then((res) => {
                console.log(res);
                setReload(1);
            });
        }
    };

    return (
        <Wrapper>
            {openDetailModal && <DetailOrder setOpenModal={setOpenDetailModal} data={currentObject} />}
            {openUpdateModal && <UpdateOrder setOpenModal={setOpenUpdateModal} currentObject={currentObject} setReload={setReload} />}
            <Title>
                <h1>Orders</h1>
            </Title>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p>Oops, Something went wrong!</p>
            ) : (
                <Table
                    labels={labels}
                    datas={datas}
                    hasDetail={hasDetail}
                    setOpenDetailModal={setOpenDetailModal}
                    setCurrentObject={setCurrentObject}
                    setOpenUpdateModal={setOpenUpdateModal}
                    deleteObject={handleDelete}
                />
            )}
        </Wrapper>
    );
};

export default Order;
