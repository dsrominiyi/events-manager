import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.borderRadius};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-color: ${({ theme }) => theme.colors.border2} transparent;
    scrollbar-width: auto;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    overflow-x: hidden;
    font-size: 1rem;
    line-height: normal;
    color: ${({ theme }) => theme.colors.text1};
    background-color: ${({ theme }) => theme.colors.bg1};

    > * {
      width: 100%;
    }
  }

  p {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.accentHover};
    }
  }

  svg {
    border-radius: 0;
  }

  .tooltip {
    border-radius: 8px !important;
    opacity: 1 !important;
  }
`;
