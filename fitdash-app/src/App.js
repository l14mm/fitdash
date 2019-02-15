import React from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Header from "./components/Header";
import Footer from "./components/Footer";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true
  }
});

const App = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <div style={{
      backgroundColor: "rgb(245, 245, 245)",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <div style={{
        flex: '1 0 auto',
        padding: '20px'
      }}>
        {children}
      </div>
      <Footer />
    </div>
  </MuiThemeProvider >
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default App;