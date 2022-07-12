import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal, FieldName } from "./styles";
import apis from "../../apis";

const UpdateItem = ({ setOpenModal, setReload, currentObject }) => {
    const initialValues = {
        price: currentObject.price,
        count: currentObject.count,
    };

    const validationSchema = Yup.object({
        price: Yup.number().required("Price is required!").positive("Price must be a positive number").integer("Price must be an integer"),
        count: Yup.number().required("Count is required!").positive("Count must be a positive number").integer("Count must be an integer"),
    });

    const handleSubmit = (values) => {
        const payload = { data: { ...values }, id: currentObject.id };
        apis.item.updateItem(payload).then((res) => {
            setReload(1);
            setOpenModal(false);
        });
    };
    return (
        <Wrapper>
            <Content>
                <h1>Update information</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FieldName>
                                    Product name: <strong>{currentObject.productName}</strong>
                                </FieldName>
                                <FieldName>
                                    SKU: <strong>{currentObject.productSku}</strong>
                                </FieldName>
                                <FieldName>
                                    Unit: <strong>{currentObject.productUnit}</strong>
                                </FieldName>
                                <FastField
                                    // Formik's props
                                    name='price'
                                    component={Input}
                                    // Additional props
                                    label='Price VNĐ'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />
                                <FastField
                                    // Formik's props
                                    name='count'
                                    component={Input}
                                    // Additional props
                                    label='Number of items'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />
                                <Button type='submit' block>
                                    Update
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default UpdateItem;
