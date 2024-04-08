import { styled } from 'styled-components';

export const AppPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[8]};
`;

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StockDetails = styled.p<{ $inStock: boolean }>`
  color: ${({ theme, $inStock }) => theme.colors[$inStock ? 'text1' : 'red']};
`;
