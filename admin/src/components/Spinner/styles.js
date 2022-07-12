import styled from "styled-components";

export const Spinner = styled.div`
    border: 5px solid var(--main-color);
    border-top: 5px solid #f1f5f9;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 20px auto;
    animation: animationSpinner 0.8s linear infinite;

    @keyframes animationSpinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
