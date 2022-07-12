import styled from "styled-components";

export const GridTwo = styled.div`
    width: 95% !important;
    margin: 0 auto;
    display: grid !important;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
    margin-top: 15px;
    div {
        margin-bottom: 15px;
    }
`;

export const OptionField = styled.div`
    width: 50%;
    margin-top: 15px;
    margin-left: 25px;
`;

export const Title = styled.h3`
    margin-bottom: 15px;
`;
