import { styled } from 'styled-components';

import { Button } from '~/components/common/Button';

export const TicketDetailsRoot = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  align-items: center;
  width: 512px;
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.platinum};
  border: ${({ theme }) => theme.border};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[2]};
  border-right: 2px solid ${({ theme }) => theme.colors.border2};
  border-radius: 0;

  ${Button} {
    padding: ${({ theme }) => theme.space[2]};
    border: 0;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const TicketInfo = styled.div`
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space[2]};
  justify-content: space-between;

  h4 {
    margin: 0;
  }
`;
