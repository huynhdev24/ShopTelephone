import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal, Grid } from "./styles";
import { addProductAsync } from "../../redux/productSlice";
import { getProductsAsync } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import apis from "../../apis";

const CreateProduct = ({ setOpenModal, setReload }) => {
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        price: 0,
        priceDiscount: 0,
        brand: "",
        description: "",
        countInStock: 0,
        chipset: "",
        rom: "",
        ram: "",
        operating: "",
        image: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required!"),
        price: Yup.number().required("Price is required!"),
        priceDiscount: Yup.number().required("priceDiscount is required!"),
        brand: Yup.string().required("Brand is required!"),
        description: Yup.string().required("Description is required!"),
        countInStock: Yup.number().required("Count In Stock is required!"),
        chipset: Yup.string().required("Chipset is required!"),
        rom: Yup.string().required("Rom is required!"),
        ram: Yup.string().required("Ram is required!"),
        operating: Yup.string().required("Operating is required!"),
    });

    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("priceDiscount", values.priceDiscount);
        formData.append("brand", values.brand);
        formData.append("description", values.description);
        formData.append("countInStock", values.countInStock);
        formData.append("formFile", values.image);
        formData.append("chipset", values.chipset);
        formData.append("ram", values.ram);
        formData.append("rom", values.rom);
        formData.append("operating", values.operating);

        dispatch(addProductAsync(formData)).then((rea) => {
                setReload(1);
            });
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Add new product</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='name'
                                        component={Input}
                                        // Additional props
                                        label='Product name'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />

                                    <FastField
                                        // Formik's props
                                        name='price'
                                        component={Input}
                                        // Additional props
                                        label='Price'
                                        type='number'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='priceDiscount'
                                        component={Input}
                                        // Additional props
                                        label='Price Discount'
                                        type='number'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <FastField
                                        // Formik's props
                                        name='brand'
                                        component={Input}
                                        // Additional props
                                        label='Brand'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='chipset'
                                        component={Input}
                                        // Additional props
                                        label='Chip Set'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <FastField
                                        // Formik's props
                                        name='rom'
                                        component={Input}
                                        // Additional props
                                        label='Rom'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='operating'
                                        component={Input}
                                        // Additional props
                                        label='Operating'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <FastField
                                        // Formik's props
                                        name='ram'
                                        component={Input}
                                        // Additional props
                                        label='Ram'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='countInStock'
                                        component={Input}
                                        // Additional props
                                        label='Count In Stock'
                                        type='number'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <div>
                                        <label className='label-photo'>Photo</label>
                                        <input
                                            className='upload-photo'
                                            type='file'
                                            name='image'
                                            onChange={(e) => props.setFieldValue("image", e.target.files[0])}
                                        />
                                    </div>
                                </Grid>
                                <FastField
                                    // Formik's props
                                    name='description'
                                    component={Input}
                                    // Additional props
                                    label='Description'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />
                                <Button type='submit' block>
                                    Add
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default CreateProduct;
