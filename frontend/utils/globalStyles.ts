import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body, #__next {
    height: 100% !important;
  }
  body {
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 5px;
      @media (max-width: 575.98px) {
        width: 0px;
      }
    }
    &::-webkit-scrollbar-track {
      height: 90%;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0099FF;
    }
  }
  #nprogress .bar {
    background: #0099FF !important;
  }
`;

export const globalTheme = {
  blue: "#0099FF",
  lightBlue: "#CCEBFF",
  green: "#60CFBF",
  red: "#CF6060",
  yellow: "#CFBD60",
  white: "#FFF",
  orange: "#E86900",
  blueBgc: "#FAFCFF",
};