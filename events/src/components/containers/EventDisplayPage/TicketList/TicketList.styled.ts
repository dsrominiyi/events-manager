import { styled } from 'styled-components';

export const TicketListRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  width: 100%;
`;

export const TicketListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[6]}`};
  border: ${({ theme }) => theme.border};

  h4 {
    margin: 0;
  }
`;

export const PriceAndStockDetails = styled.div`
  margin-left: auto;
`;
