import React from "react";
import { Input, Option } from "./styles";

const Select = ({ datas, current, handleChange }) => {
    return (
        <Input value={current} onChange={(e) => handleChange(e)}>
            {datas.map((data) => (
                <Option key={data.value} value={data.value}>
                    {data.label}
                </Option>
            ))}
        </Input>
    );
};

export default Select;
