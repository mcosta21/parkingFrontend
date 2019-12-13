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
import Funcionarios from './components/Funcionarios';
import BairroInput from './components/BairroInput';
import Bairros from './components/Bairros';
import MunicipioInput from './components/MunicipioInput';
import Municipios from './components/Municipios';
import UfInput from './components/UfInput';
import Ufs from './components/Ufs';
import CargoInput from './components/CargoInput';
import Cargos from './components/Cargos';

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
            <Route path="/funcionarios" component={Funcionarios} />
            <Route path="/bairro" component={BairroInput} />
            <Route path="/bairros" component={Bairros} />
            <Route path="/municipio" component={MunicipioInput} />
            <Route path="/municipios" component={Municipios} />
            <Route path="/uf" component={UfInput} />
            <Route path="/ufs" component={Ufs} />
            <Route path="/cargo" component={CargoInput} />
            <Route path="/cargos" component={Cargos} />
        </Switch>
    </ BrowserRouter>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
