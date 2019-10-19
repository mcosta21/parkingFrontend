import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
class Atendimento extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            atendimentos: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getRequest();
    }

    getRequest() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getAtendimentos/')
            .then(res =>
                this.setState({ 
                    atendimentos: res.data, 
                    loading: false 
                }),
            );
    }

    renderAtendimentos() {
        console.log('entrou no render atendimentos');
        console.log('this.state.atendimentos', this.state.atendimentos);
        return this.state.atendimentos.map((valor, i) => (
            <li key={i}>{valor.valorBase}</li>
        ))
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="body">
                    <Breadcrumb title="Atendimentos"/>
                    <DataTable value={this.state.atendimentos}>
                        <Column field="idAtendimento" header="ID" />                        
                        <Column field="cliente.nomeDoCliente" header="Cliente" />
                        <Column field="valorBase" header="Valor Base" />
                        <Column field="valorTotal" header="Valor Total" />
                    </DataTable>
                </div>

            </div>
        );
    }
}

export default Atendimento;