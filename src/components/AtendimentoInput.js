import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Vagas from './Vagas.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import { classes } from 'istanbul-lib-coverage';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

class AtendimentoInput extends Component {
    
    constructor(props) {
        super(props);
        this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
        this.onHide = this.onHide.bind(this);        
        this.state = {
            clientes: [],
            atendimentos: [],
            visibleClientes: false,
            loading: true,
            selectedCliente: '',
            valorBase: '',
            valorTotal: '',
            vaga: ''
        };    
    }

    getVaga(){
        console.log(this.props.selectedVaga);
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
            "cliente": this.state.selectedCliente.idCliente,
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

    _handleDoubleClickItem(event){
        this.setState({visibleClientes: true});
    }

    onHide() {
        this.setState({visibleClientes: false});
    }

    render() {
        return (
            <div>
                <Header/>                
                <div className="body">
                    <Breadcrumb title="Atendimento"/>

                    <h3>Cliente</h3>
                    <InputText 
                        value={this.state.selectedCliente.nomeDoCliente} 
                        className="input"
                        onDoubleClick={this._handleDoubleClickItem}/>
                     
                    <Dialog 
                        header="Clientes" 
                        visible={this.state.visibleClientes} 
                        modal={true} 
                        onHide={() => this.setState({visibleClientes: false})}>
                            <DataTable 
                                value={this.state.clientes}
                                selectionMode="single"
                                selection={this.state.selectedCliente} 
                                onSelectionChange={e => this.setState({selectedCliente: e.value})}>
                                <Column field="idCliente" header="ID" />                        
                                <Column field="nomeDoCliente" header="Nome" />
                            </DataTable>
                    </Dialog>

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
                    <Button label="teste" onClick={() => this.getVaga()}/>
                </div>

            </div>
        );
    }
}

export default AtendimentoInput;