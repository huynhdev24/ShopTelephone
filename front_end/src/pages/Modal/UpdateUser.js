import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Content, Wrapper, ButtonLocal, Grid } from "./styles";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../redux/userSlice";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";

const UpdateUser = ({ setOpenModal, currentUser, setReload }) => {
    const dispatch = useDispatch();
    const initialValues = {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phoneNumber,
        admin: currentUser.isAdmin.toString(),
    };



    const handleSubmit = (values) => {
        const payload = { ...values, id: currentUser.id };
        dispatch(updateUserAsync(payload));
        setReload(1);
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Update Admin</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <ReactTable>
                                    <TableBody>
                                        <TableRow>
                                            <TableData>Full name</TableData>
                                            <TableData>
                                                <strong>{currentUser.name}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Email</TableData>
                                            <TableData>
                                                <strong>{currentUser.email}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Phone number</TableData>
                                            <TableData>
                                                <strong>{currentUser.phoneNumber}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Address</TableData>
                                            <TableData>
                                                <strong>{currentUser.address}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Position</TableData>
                                            <TableData>
                                                <strong>{currentUser.isAdmin ? "Admin" : "Customer"}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Gender</TableData>
                                            <TableData>
                                                <strong>{currentUser.gender ? "Male" : "Female"}</strong>
                                            </TableData>
                                        </TableRow>
                                        <TableRow>
                                            <TableData>Created at</TableData>
                                            <TableData>
                                                <strong>{currentUser.createdAt}</strong>
                                            </TableData>
                                        </TableRow>
                                    </TableBody>
                                </ReactTable>
                                <Button type='submit' block>
                                    Accept Admin
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default UpdateUser;
