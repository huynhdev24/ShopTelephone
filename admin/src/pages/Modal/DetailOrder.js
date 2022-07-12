import React from "react";
import { Content, Wrapper, ButtonLocal } from "./styles";
import { ReactTable, TableBody, TableRow, TableData, TableHead, TableHeader } from "../../components/Table/styles";

const DetailProduct = ({ setOpenModal, data }) => {
    const statusData = [
        {0: "Order success" },
        {1: "Order received" },
        {2: "Preparing goods" },
        {3: "Shipping handover" },
        {4: "Being transported" },
        {5: "Delivery successful" },
        {6: "Cancel order" },
    ];

    const deliveryData = [
        { 0: "Standard" },
        { 1: "Save" },
        { 2: "Fast" },
    ];

    const paymentData = [
        { 0: "Cash payment on delivery" },
        { 1: "Payment via VNPay" },
    ];

    return (
        <Wrapper>
            <Content>
                <h1>Details</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <ReactTable>
                    <TableBody>
                        <TableRow>
                            <TableData>Customer name</TableData>
                            <TableData>
                                <strong>{data.deliveryAdd.name}</strong>
                            </TableData>
                            <TableData>Phone number</TableData>
                            <TableData>
                                <strong>{data.deliveryAdd.phone}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Address</TableData>
                            <TableData>
                                <strong>{data.deliveryAdd.address.details + ", " + data.deliveryAdd.address.wards
                                        + ", " + data.deliveryAdd.address.district + ", " + data.deliveryAdd.address.province}</strong>
                            </TableData>
                            <TableData>Created at</TableData>
                            <TableData>
                                <strong>{data.createdAt}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Product name</TableData>
                            <TableData>
                                <strong>{data.orderProd.name}</strong>
                            </TableData>
                            <TableData>Price discount</TableData>
                            <TableData>
                                <strong>{data.orderProd.priceDiscount}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Number of product</TableData>
                            <TableData>
                                <strong>{data.numOfProd}</strong>
                            </TableData>
                            <TableData>Transport method</TableData>
                            <TableData>
                                <strong>{Object.values(deliveryData[data.transportMethod])}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Transport Fee</TableData>
                            <TableData>
                                <strong>{data.transportFee}</strong>
                            </TableData>
                            <TableData>Payment method</TableData>
                            <TableData>
                                <strong>{Object.values(paymentData[data.paymentMethod])}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Paid</TableData>
                            <TableData>
                                <strong>{data.isPaid.toString()}</strong>
                            </TableData>
                            <TableData>Order status</TableData>
                            <TableData>
                                <strong>{Object.values(statusData[data.orderStatus])}</strong>
                            </TableData>
                        </TableRow>
                    </TableBody>
                </ReactTable>

            </Content>
        </Wrapper>
    );
};

export default DetailProduct;
