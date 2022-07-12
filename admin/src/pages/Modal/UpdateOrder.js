import React from "react";
import Button from "../../components/Button";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import { Content, Wrapper, ButtonLocal, Grid } from "./styles";
import apis from "../../apis";
import SelectField from "../../components/SelectField";
import { ReactTable, TableBody, TableRow, TableData, TableHead, TableHeader } from "../../components/Table/styles";

const UpdateStore = ({ setOpenModal, currentObject, setReload }) => {

    console.log(currentObject);

    const initialValues = {
        id: currentObject.id,
        customerName: currentObject.deliveryAdd.name,
        phone: currentObject.deliveryAdd.phone,
        address: currentObject.deliveryAdd.address.details + ", " + currentObject.deliveryAdd.address.wards
                + ", " + currentObject.deliveryAdd.address.district + ", " + currentObject.deliveryAdd.address.province,
        prodName: currentObject.orderProd.name,
        price: currentObject.orderProd.price,
        priceDiscount: currentObject.orderProd.priceDiscount,
        numOfProd: currentObject.numOfProd,

    };

    const statusData = [
        { value: 0, label: "Order success" },
        { value: 1, label: "Order received" },
        { value: 2, label: "Preparing goods" },
        { value: 3, label: "Shipping handover" },
        { value: 4, label: "Being transported" },
        { value: 5, label: "Delivery successful" },
        { value: 6, label: "Cancel order" },
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


    const handleSubmit = (item) => {
        console.log(item);

        apis.order.updateItem({"id": item.id, "orderStatus": item.orderStatus}).then((res) => {
            console.log(res);
            setReload(1);
        });
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Update status order</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <ReactTable>
                    <TableBody>
                        <TableRow>
                            <TableData>Customer name</TableData>
                            <TableData>
                                <strong>{currentObject.deliveryAdd.name}</strong>
                            </TableData>
                            <TableData>Phone number</TableData>
                            <TableData>
                                <strong>{currentObject.deliveryAdd.phone}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Address</TableData>
                            <TableData>
                                <strong>{currentObject.deliveryAdd.address.details + ", " + currentObject.deliveryAdd.address.wards
                                        + ", " + currentObject.deliveryAdd.address.district + ", " + currentObject.deliveryAdd.address.province}</strong>
                            </TableData>
                            <TableData>Created at</TableData>
                            <TableData>
                                <strong>{currentObject.createdAt}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Product name</TableData>
                            <TableData>
                                <strong>{currentObject.orderProd.name}</strong>
                            </TableData>
                            <TableData>Price discount</TableData>
                            <TableData>
                                <strong>{currentObject.orderProd.priceDiscount}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Number of product</TableData>
                            <TableData>
                                <strong>{currentObject.numOfProd}</strong>
                            </TableData>
                            <TableData>Transport method</TableData>
                            <TableData>
                                <strong>{Object.values(deliveryData[currentObject.transportMethod])}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Transport Fee</TableData>
                            <TableData>
                                <strong>{currentObject.transportFee}</strong>
                            </TableData>
                            <TableData>Payment method</TableData>
                            <TableData>
                                <strong>{Object.values(paymentData[currentObject.paymentMethod])}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Paid</TableData>
                            <TableData>
                                <strong>{currentObject.isPaid.toString()}</strong>
                            </TableData>
                        </TableRow>
                    </TableBody>
                </ReactTable>


                <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FastField name='orderStatus' component={SelectField} label='Status odrer' placeholder='' options={statusData} />
                                <Button type='submit' block>
                                    Update status
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default UpdateStore;
