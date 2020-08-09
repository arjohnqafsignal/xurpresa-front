import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Baloo Da 2', cursive;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
  }

  input, select {
    font-size: 14px;
    color: #000;
  }
  .form-text {
    font-size: 14px;
  }
`;
