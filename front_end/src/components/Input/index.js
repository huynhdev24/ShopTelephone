import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles";

const Input = (props) => {
    const { field, form, type, label, placeholder, disabled } = props;

    const { name } = field; 

    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    return (
        <Wrapper>
            {label && <label htmlFor={name}>{label}</label>}
            <input id={name} type={type} placeholder={placeholder} disabled={disabled} {...field} />
            {showError && <span>{errors[name]}</span>}
        </Wrapper>
    );
};

Input.propTypes = {
    // Formik's props
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    // Additional props
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",
    disabled: false,
};

export default Input;
