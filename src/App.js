import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import Header from './components/Header';
import Panel from './components/Panel';

function App() {

  return (
    <div className='app'>
      <Header/>
      <Panel/>
    </div>
  );
}

export default App;
