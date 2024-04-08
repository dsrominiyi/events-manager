import { styled } from 'styled-components';

import { Button } from '~/components/common/Button';

import { FormFields } from '../EventForm.styled';

export const TicketFormRoot = styled.div`
  width: 300px;

  ${FormFields} {
    padding: ${({ theme }) => theme.space[4]};
    margin-bottom: ${({ theme }) => theme.space[4]};
    background-color: ${({ theme }) => theme.colors.platinum};
    border: ${({ theme }) => theme.border};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};

  ${Button} {
    flex: 1;
  }
`;
