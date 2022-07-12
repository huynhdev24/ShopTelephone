import styled from "styled-components";

const Badge = styled.span`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.7rem;

    background-color: ${(props) => {
        if (props.type === "success") return "#def7ec";
        if (props.type === "warning") return "#f0f6b2";
        if (props.type === "danger") return "";
    }};
    color: ${(props) => {
        if (props.type === "success") return "var(--main-color)";
        if (props.type === "warning") return "orange";
        if (props.type === "danger") return "";
    }};
`;
