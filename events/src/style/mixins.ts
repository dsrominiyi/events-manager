import { css } from 'styled-components';

export const interactiveStyles = css`
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: revert;
  }
`;

export const resetStyles = css`
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  appearance: none;
  background-color: transparent;
  border: 0;
  ${interactiveStyles}
`;
