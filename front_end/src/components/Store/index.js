import React, { useEffect } from "react";
import { Wrapper } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getStoresAsync } from "../../redux/storeSlice";
import Select from "../Select";
import { selectStore } from "../../redux/storeSlice";

const Store = () => {
    const dispatch = useDispatch();
    const storeState = useSelector((state) => state.store);

    useEffect(() => {
        dispatch(getStoresAsync());
    }, [dispatch]);

    const options = storeState.stores.map((store) => ({ value: store.id, label: store.name }));

    const handleChange = (e) => {
        dispatch(selectStore(e.target.value));
    };

    return (
        <Wrapper>
            <Select datas={options} current={storeState.selectedStore} handleChange={handleChange} />
        </Wrapper>
    );
};

export default Store;
