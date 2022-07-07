/* eslint-disable no-loop-func */
// apollo
import { ApolloProvider } from '@apollo/client';
import { client } from './api/apollo';

// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth';

// app
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import vt1 from './components/common/theme';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = responsiveFontSizes(vt1);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
