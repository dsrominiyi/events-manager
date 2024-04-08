import { css, styled } from 'styled-components';

import { resetStyles } from '~/style';

export const Input = styled.input`
  ${resetStyles}
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.bg1};
  border: ${({ theme }) => theme.border};

  ${({ type }) =>
    type === 'checkbox' &&
    css`
      width: fit-content;
      appearance: auto;
      cursor: pointer;
    `};
`;
