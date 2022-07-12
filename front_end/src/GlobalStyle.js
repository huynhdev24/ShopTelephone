import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main-color: #027581;
        --color-dark: #1d2231;
        --text-grey: #8390a2;
    }

    * {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style-type: none;
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
