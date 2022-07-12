import React from "react";
import { Content, Wrapper, ButtonLocal} from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";

const DetailUser = ({ setOpenModal, data }) => {


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
                            <TableData>Full name</TableData>
                            <TableData>
                                <strong>{data.name}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Email</TableData>
                            <TableData>
                                <strong>{data.email}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Phone number</TableData>
                            <TableData>
                                <strong>{data.phoneNumber}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Address</TableData>
                            <TableData>
                                <strong>{data.address}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Position</TableData>
                            <TableData>
                                <strong>{data.isAdmin? "Admin": "Customer"}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Gender</TableData>
                            <TableData>
                                <strong>{data.gender? "Male": "Female"}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Created at</TableData>
                            <TableData>
                                <strong>{data.createdAt}</strong>
                            </TableData>
                        </TableRow>
                    </TableBody>
                </ReactTable>
            </Content>
        </Wrapper>
    );
};

export default DetailUser;
