import { FunctionComponent, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import { resetStyles } from '~/style';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

const SelectRoot = styled.select`
  ${resetStyles}
  padding: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg1};
  border: ${({ theme }) => theme.border};
`;

export const Select: FunctionComponent<Props> = ({ options, ...props }) => (
  <SelectRoot {...props}>
    {options.map(({ value: optValue, label }) => (
      <option key={optValue} value={optValue}>
        {label}
      </option>
    ))}
  </SelectRoot>
);
