import styled, { css } from 'styled-components';

import { resetStyles } from '~/style/mixins';

export const Button = styled.button<{ $secondary?: boolean }>`
  ${resetStyles}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text2};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid;
  transition: ${({ theme }) => theme.transitions.normal};
  transition-property: border-color, background-color, color;

  &:disabled {
    color: ${({ theme }) => theme.colors.buttonTextDisabled};
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
    border-color: ${({ theme }) => theme.colors.buttonDisabled};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }

  ${({ $secondary }) =>
    $secondary &&
    css`
      color: ${({ theme }) => theme.colors.accent};
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.accent};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.colors.text2};
        background-color: ${({ theme }) => theme.colors.accent};
      }
    `};
`;
