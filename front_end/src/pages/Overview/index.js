import React, { useEffect, useState } from "react";
import apis from "../../apis";
import BarChart from "../../components/BarChart";
import { GridTwo, Title, OptionField } from "./styles";
import Spinner from "../../components/Spinner";
import Select from "../../components/Select";

const Overview = () => {
    const [weeklySaleInDeptData, setWeeklySaleInDeptData] = useState([]);
    const [weeklySaleInDeptLoading, setWeeklySaleInDeptLoading] = useState(false);
    const [weeklySaleInDeptError, setWeeklySaleInDeptError] = useState(false);
    const [weeklySaleInDeptData2, setWeeklySaleInDeptData2] = useState([]);
    const [weeklySaleInDeptLoading2, setWeeklySaleInDeptLoading2] = useState(false);
    const [weeklySaleInDeptError2, setWeeklySaleInDeptError2] = useState(false);
    const [weeklySaleInDeptData3, setWeeklySaleInDeptData3] = useState([]);
    const [weeklySaleInDeptLoading3, setWeeklySaleInDeptLoading3] = useState(false);
    const [weeklySaleInDeptError3, setWeeklySaleInDeptError3] = useState(false);
    const [year, setYear] = useState("2022");

    const yearData = [
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
        { value: "2020", label: "2020" },
    ];


    const getWeeklySaleInDeptData = async (payload) => {
        try {
            setWeeklySaleInDeptLoading(true);
            const data = await apis.analysis.weeklySaleInDept(payload);
            setWeeklySaleInDeptData(data);
        
        } catch (error) {
            setWeeklySaleInDeptError(true);
        }
        setWeeklySaleInDeptLoading(false);
    };

    const getWeeklySaleInDeptData2 = async (payload) => {
        try {
            setWeeklySaleInDeptLoading2(true);
            const data = await apis.analysis.weeklySaleInDept2(payload);
            setWeeklySaleInDeptData2(data);
        
        } catch (error) {
            setWeeklySaleInDeptError2(true);
        }
        setWeeklySaleInDeptLoading2(false);
    };

    const getWeeklySaleInDeptData3 = async (payload) => {
        try {
            setWeeklySaleInDeptLoading3(true);
            const data = await apis.analysis.weeklySaleInDept3(payload);
            setWeeklySaleInDeptData3(data);
        
        } catch (error) {
            setWeeklySaleInDeptError3(true);
        }
        setWeeklySaleInDeptLoading3(false);
    };

    useEffect(() => {
        getWeeklySaleInDeptData();
        getWeeklySaleInDeptData2();
        getWeeklySaleInDeptData3();
    }, []);



    useEffect(() => {
        getWeeklySaleInDeptData({ year: year });

    }, [year ]);


    const handleChangeYear = (e) => {
        setYear(e.target.value);
    };


    return (
        <div>
            <h1>Overview</h1>
            <GridTwo>
                <div>
                    {weeklySaleInDeptLoading ? (
                        <Spinner />
                    ) : weeklySaleInDeptError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title={"Registered account number in " + year}
                            // labels={weeklySaleInDeptData}
                            datas={{
                                label: "account",
                                data: weeklySaleInDeptData,
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
                <div>
                    <OptionField>
                        <Title>Select year</Title>
                        <Select datas={yearData} current={year} handleChange={handleChangeYear} />
                    </OptionField>
                </div>
            </GridTwo>
            <GridTwo>
                <div>
                    {weeklySaleInDeptLoading2 ? (
                        <Spinner />
                    ) : weeklySaleInDeptError2 ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title={"Number of orders in " + year}
                            // labels={weeklySaleInDeptData}
                            datas={{
                                label: "order",
                                data: weeklySaleInDeptData2,
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
            </GridTwo>

            <GridTwo>
                <div>
                    {weeklySaleInDeptLoading3 ? (
                        <Spinner />
                    ) : weeklySaleInDeptError3 ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title={"Revenue in " + year}
                            // labels={weeklySaleInDeptData}
                            datas={{
                                label: "VND",
                                data: weeklySaleInDeptData3,
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
            </GridTwo>
        </div>
    );
};

export default Overview;
