import { Poppins } from 'next/font/google';
import { FunctionComponent } from 'react';

import { AppContainer } from '~/components/containers/AppContainer';
import { AppProviders } from '~/components/providers/AppProviders';
import { GlobalStyle } from '~/style';

import 'normalize.css';
import 'react-datepicker/dist/react-datepicker.css';

const poppins = Poppins({
  weight: ['100', '300', '400', '600'],
  subsets: ['latin-ext'],
  preload: true,
});

const RootLayout: FunctionComponent = ({ children }) => (
  <html lang="en" className={poppins.className}>
    <body>
      <AppProviders>
        <GlobalStyle />
        <AppContainer>{children}</AppContainer>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
