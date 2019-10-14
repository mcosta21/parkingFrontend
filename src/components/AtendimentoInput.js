import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import { classes } from 'istanbul-lib-coverage';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

class AtendimentoInput extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            atendimentos: [],
            loading: true,
            cliente: '',
            valorBase: '',
            valorTotal: ''
        };    
    }

    componentDidMount() {
        this.getRequestClientes();
        this.getRequestAtendimentos();
    }

    getRequestClientes() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getClientes/')
            .then(res =>
                this.setState({ 
                    clientes: res.data, 
                    loading: false 
                }),
            );
    }

    getRequestAtendimentos(){    
        axios
        .get('http://localhost:8080/estacionamento/rest/ws/getAtendimentos/')
        .then(res =>
            this.setState({ 
                atendimentos: res.data, 
                loading: false 
            }),
        );
    }   
   
    setRequest(){
        axios.post('http://localhost:8080/estacionamento/rest/ws/createAtendimento',
        {
            "cliente": this.state.cliente,
            "valorBase": this.state.valorBase,
            "valorTotal": this.state.valorTotal
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    renderClientes() {
        console.log('entrou no render clientes');
        console.log('this.state.clientes', this.state.clientes);
        return this.state.clientes.map((valor, i) => (
            <li key={i}>{valor.nomeDoCliente}</li>
        ))
    }

    renderAtendimentos() {
        console.log('entrou no render atendimentos');
        console.log('this.state.atendimentos', this.state.atendimentos);
        return this.state.atendimentos.map((valor, i) => (
            <li key={i}>{valor.idAtendimento}</li>
        ))
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="body">
                    <Breadcrumb title="Atendimento"/>
                    <h3>Cliente</h3>
                    <InputText 
                        value={this.state.cliente} 
                        className="input"
                        onChange={(e) => this.setState({cliente: e.target.value})} />
                     
                     <h3>Valor Base</h3>
                     <InputText 
                        value={this.state.valorBase} 
                        className="input"
                        onChange={(e) => this.setState({valorBase: e.target.value})} />
                     
                     <h3>Valor Total</h3>
                     <InputText 
                        value={this.state.valorTotal} 
                        className="input"
                        onChange={(e) => this.setState({valorTotal: e.target.value})} />
                    <Button label="Click" onClick={this.setRequest.bind(this)} />
                    {this.renderAtendimentos()}
                </div>

            </div>
        );
    }
}

export default AtendimentoInput;