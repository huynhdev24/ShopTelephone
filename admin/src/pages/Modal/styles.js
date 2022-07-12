import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(230, 230, 230, 0.5);
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 800px;
    background-color: #ffffff;
    padding: 15px 20px 15px 20px;
    position: relative;
    max-height:80vh;
    overflow: auto;

    h1 {
        text-align: center;
        margin-bottom: 10px;
        font-size: 24px;
    }

    .label-photo {
        display: block;
        color: #666666;
        margin-bottom: 5px;
    }

    .upload-photo {
        width: 100%;
        padding: 10px;
        border: 1px solid #dddddd;
        border-radius: 5px;
    }

    h2 {
        margin-top: 15px;
        margin-bottom: 10px;
    }

    h3 {
        margin-top: 20px;
        margin-bottom: 25px;
        font-size: 1rem;
        color: red;
        text-align: center;
    }
`;

export const ButtonLocal = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
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
`;

export const Avatar = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
`;

export const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

export const Photo = styled.img`
    width: 100%;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
`;
export const Info = styled.p`
    margin-top: 10px;
    font-size: 0.8rem;
`;

export const FieldName = styled.p`
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 1rem;
`;

export const FieldCustom = styled.div`
    margin-bottom: 15px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
`;

export const Label = styled.label`
    display: block;
    color: #666666;
    margin-bottom: 5px;
`;

export const ShowError = styled.span`
    color: red;
    font-size: 0.8rem;
`;
