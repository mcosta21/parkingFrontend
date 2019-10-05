import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import logo from './logo.svg';
import './App.css';
import Atendimento from './components/Atendimento';

function App() {
  return (
    <div className="App">
      <Atendimento />
    </div>
  );
}

export default App;
