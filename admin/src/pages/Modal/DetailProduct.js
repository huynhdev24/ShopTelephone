import React from "react";
import { Grid, Content, Wrapper, ButtonLocal, Avatar, Photo, Info } from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";

const DetailProduct = ({ setOpenModal, data }) => {
    return (
        <Wrapper>
            <Content>
                <h1>Details</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Grid>
                    <Avatar>
                        <Photo src={data.image} />
                        <p>Photo</p>
                    </Avatar>
                    <ReactTable>
                        <TableBody>
                            <TableRow>
                                <TableData>Product name</TableData>
                                <TableData>
                                    <strong>{data.name}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Price</TableData>
                                <TableData>
                                    <strong>{data.price}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Price Discount</TableData>
                                <TableData>
                                    <strong>{data.priceDiscount}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Brand</TableData>
                                <TableData>
                                    <strong>{data.brand}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Count In Stock</TableData>
                                <TableData>
                                    <strong>{data.countInStock}</strong>
                                </TableData>
                            </TableRow>
                            {/* <TableRow>
                                <TableData>Chip Set</TableData>
                                <TableData>
                                    <strong>{data.chipset}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Rom</TableData>
                                <TableData>
                                    <strong>{data.rom}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Ram</TableData>
                                <TableData>
                                    <strong>{data.ram}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Color</TableData>
                                <TableData>
                                    <strong>{data.color}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Operating</TableData>
                                <TableData>
                                    <strong>{data.operating}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Camera Truoc</TableData>
                                <TableData>
                                    <strong>{data.cameraTruoc}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Camera Sau</TableData>
                                <TableData>
                                    <strong>{data.cameraSau}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Screen</TableData>
                                <TableData>
                                    <strong>{data.manHinh}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Battery</TableData>
                                <TableData>
                                    <strong>{data.pin}</strong>
                                </TableData>
                            </TableRow> */}
                            <TableRow>
                                <TableData>Crerated at</TableData>
                                <TableData>
                                    <strong>{data.createdAt}</strong>
                                </TableData>
                            </TableRow>
                        </TableBody>
                    </ReactTable>
                </Grid>
                <Info>
                    <strong>Description: </strong> {data.description}
                </Info>
            </Content>
        </Wrapper>
    );
};

export default DetailProduct;
