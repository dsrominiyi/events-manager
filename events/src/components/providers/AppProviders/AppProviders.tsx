'use client';

import { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '~/style/theme';

import { StyledComponentsRegistry } from './StyledComponentsRegistry';

export const AppProviders: FunctionComponent = ({ children }) => (
  <StyledComponentsRegistry>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StyledComponentsRegistry>
);
