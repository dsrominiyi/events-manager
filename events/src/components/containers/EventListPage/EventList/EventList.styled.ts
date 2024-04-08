import { styled } from 'styled-components';

export const EventListRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  width: 100%;
`;

export const EventListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[6]}`};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg2};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg2Hover};
  }

  h3 {
    margin: 0;
    font-weight: 600;
  }
`;

export const DateAndTicketDetails = styled.div`
  margin-left: auto;
`;
