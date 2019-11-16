import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AtendimentoInput from './components/AtendimentoInput';
import Atendimentos from './components/Atendimentos';
import Vagas from './components/Vagas';
import Clientes from './components/Clientes';
import ClienteInput from './components/ClienteInput';
import FuncionarioInput from './components/FuncionarioInput';

ReactDOM.render(

    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/atendimento" component={AtendimentoInput} />
            <Route path="/atendimentos" component={Atendimentos} />
            <Route path="/vagasDisponiveis" component={Vagas} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/cliente" component={ClienteInput} />
            <Route path="/funcionario" component={FuncionarioInput} />

        </Switch>
    </ BrowserRouter>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
