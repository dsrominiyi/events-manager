import { styled } from 'styled-components';

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[10]};
`;

export const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

export const TicketFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
