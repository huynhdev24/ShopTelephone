import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: var(--main-color);
    width: 100%;
    height: 100vh;
    padding-top: 160px;
`;

export const Content = styled.div`
    margin: 0 auto;
    max-width: 400px;
    background: white;
    padding: 35px 25px 40px 25px;
    color: #333333;
    border-radius: 10px;

    h1 {
        text-align: center;
        margin-bottom: 10px;
    }

    p {
        text-align: center;
        margin-bottom: 20px;
    }
`;
