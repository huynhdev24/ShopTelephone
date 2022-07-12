import React, { useEffect, useState } from "react";
import { Wrapper, Title } from "./styles";
import Button from "../../components/Button";
import apis from "../../apis";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import DetailProduct from "../Modal/DetailProduct";
import CreateProduct from "../Modal/CreateProduct";
import UpdateProduct from "../Modal/UpdateProduct";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    let datas = [];
    const hasDetail = true;

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const res = await apis.product.getProducts();
                setProducts(res.someProduct);
                
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };

        setReload(0);
        getProducts();
    }, [reload]);

    products.forEach((product) => {
        let d = new Date(product.createdAt);
        let date = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
        datas.push({ ...product, createdAt: date });
    });

    const labels = [
        {
            Header: "Product name",
            accessor: "name",
        },
        {
            Header: "Price",
            accessor: "price",
        },
        {
            Header: "Brand",
            accessor: "brand",
        },
        {
            Header: "Count In Stock",
            accessor: "countInStock",
        },
        {
            Header: "Description",
            accessor: d => d.description.length > 20 ? d.description.substring(0, 20)  + "...": d.description,
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (product) => {
        if (window.confirm(product.name + " will be deleted!") === true) {
            apis.product.deleteProduct(product.id).then((rea) => {
                setReload(1);
            });
        }
    };

    return (
        <Wrapper>
            {openDetailModal && <DetailProduct setOpenModal={setOpenDetailModal} data={currentObject} />}
            {openCreateModal && <CreateProduct setOpenModal={setOpenCreateModal} setReload={setReload}/>}
            {openUpdateModal && <UpdateProduct setOpenModal={setOpenUpdateModal} currentObject={currentObject} setReload={setReload} />}
            <Title>
                <h1>Products</h1>
                <Button onClick={() => setOpenCreateModal(true)}>Add new product</Button>
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

export default Product;
