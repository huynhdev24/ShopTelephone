import styled from "styled-components";

export const Wrapper = styled.div`
    border-radius: 7px;
    background-color: #ffffff;
`;

export const Tool = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: end;
`;

export const Search = styled.input`
    padding: 5px 10px;
    font-size: 14px;
    width: 300px;
    margin-right: 10px;
    :focus {
        outline: none;
    }
`;

export const Select = styled.select`
    padding: 5px 10px;
    font-size: 14px;
    width: 120px;
`;

export const Option = styled.option`
    padding-top: 5px;
    padding-bottom: 5px;
`;

export const Content = styled.div`
    max-height:70vh;
    overflow-x: auto;
`;

export const ReactTable = styled.table`
    width: 100%;
    position: relative;
    border-collapse: collapse;
`;

export const TableHead = styled.thead`
    background-color: #efefef;
    text-align: left;
`;

export const TableHeader = styled.th`
    font-size: 0.9rem;
    padding: 1rem;
    color: var(--color-dark);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
    :nth-child(even) {
        background-color: #f9fafc;
    }
`;

export const TableData = styled.td`
    font-size: 1rem;
    padding: 1rem;
    color: var(--color-dark);
`;

export const Pagination = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Button = styled.button`
    padding: 8px 10px 5px 10px;
    cursor: pointer;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    transition: all 0.4s;
    background-color: var(--main-color);
    color: #ffffff;
    margin-left: 10px;
    :hover {
        background-color: #ffffff;
        color: var(--main-color);
    }
    :disabled {
        background-color: #efefef;
        color: var(--main-color);
        cursor: not-allowed;
    }
`;
