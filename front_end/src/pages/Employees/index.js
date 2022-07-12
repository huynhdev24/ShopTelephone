import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import apis from "../../apis";
import { Wrapper, Title } from "./styles";
import DetailUser from "../Modal/DetailUser";
import UpdateUser from "../Modal/UpdateUser";
import Spinner from "../../components/Spinner";

const Employee = () => {
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const hasDetail = true;

    let datas = [];

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const res = await apis.user.getUsers();
                setUsers(res.getUsers);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };

        setReload(0);
        getUsers();
    }, [reload]);

    users.forEach((user) => {
        let d = new Date(user.createdAt);
        let date = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
        datas.push({ ...user, createdAt: date });
    });


    const labels = [
        {
            Header: "Full name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Phone number",
            accessor: "phoneNumber",
        },
        {
            Header: "Position",
            accessor: d => d.isAdmin? "Admin": "Customer",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (id) => {
        alert("Feature is being worked on!");
    };

    return (
        <Wrapper>
            {openDetailModal && <DetailUser setOpenModal={setOpenDetailModal} data={currentObject} />}
            {openUpdateModal && <UpdateUser setOpenModal={setOpenUpdateModal} currentUser={currentObject} setReload={setReload} />}
            <Title>
                <h1>Users</h1>
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

export default Employee;
