import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import logo from './logo.svg';
import './App.css';
import Atendimento from './components/Atendimento';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header.js'
import Panel from './components/Panel.js'

const useStyles = makeStyles(theme => ({
  app: {
    minHeight: '100vh',
    backgroundColor: '#160f30',
    color: '#dbd8e3',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Header/>
      <Panel/>
      <Atendimento />
    </div>
  );
}

export default App;
