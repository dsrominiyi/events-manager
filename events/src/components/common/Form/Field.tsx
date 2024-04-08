import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  error?: boolean | string;
  label?: string;
  labelFor?: string;
}

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;

  label {
    font-weight: 600;
  }
`;

export const Field = ({ children, label, labelFor, ...props }: Props) => (
  <FieldRoot {...props}>
    {label ? <label htmlFor={labelFor}>{label}</label> : null}
    {children}
  </FieldRoot>
);
