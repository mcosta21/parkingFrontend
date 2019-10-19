import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Link, useHistory } from 'react-router-dom'

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
            cliente: '',
            selectedCliente: '',
            vagas: [],
            selectedVaga: '',
            valorTotal: '0',
            caminho: '/vagasDisponiveis'            
        };    
    }

    componentDidMount() {
        this.getRequestClientes();
        this.getRequestAtendimentos();
        this.getRequestVagas();
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
            "vaga": this.state.selectedVaga.idVaga,
            "valorBase": this.state.selectedVaga.valorBase,
            "valorTotal": this.state.valorTotal
        })
        .then(response => {
            console.log(response);
            this.setState=({cliente: '', vagas: [], selectedCliente: '', selectedVaga: '', valorTotal: '0'});
            alert("Atendimento cadastrado com sucesso");
            this.setRequestAlterarStatusVaga('2');
            displayVagas();
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response);
        })

        
    }

    setRequestAlterarStatusVaga(status){
        axios.post('http://localhost:8080/estacionamento/rest/ws/alterarStatusVaga',
        {
            "idVaga": this.state.selectedVaga.idVaga,
            "status": status
        })
        .then(response => {
            console.log(response);            
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data);
        })
    }

    renderClientes() {
        console.log('entrou no render clientes');
        console.log('this.state.clientes', this.state.clientes);
        return this.state.clientes.map((valor, i) => (
            <li key={i}>{valor.nomeDoCliente}</li>
        ))
    }

    confirmarSelectedCliente(){
        this.setState({cliente: this.state.selectedCliente, visibleClientes: false});  
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

    getRequestVagas() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getVagasDisponiveis/')
            .then(res =>
                this.setState({ 
                    vagas: res.data, 
                    loading: false 
                }),
            );
            
    }

    selectVaga(vaga){
        this.setState({selectedVaga: vaga.valor, nomeDaVaga: vaga.valor.nomeDaVaga, caminho: '/atendimento'});
        console.log(this.state.selectedVaga);
    }

    renderVagas(){
        return this.state.vagas.map((valor, i) => (
            <Button label={valor.nomeDaVaga} key={i} className="fieldVaga" onClick={() => this.selectVaga({valor})}></Button>
        ))
    }

    renderInput(){
        return (
            <div id="atendimento" className="body">
                
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={() => displayVagas()} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Atendimento</h4>
                    </div>
                </div>

                <h3>Vaga</h3>
                <InputText 
                    value={this.state.selectedVaga.nomeDaVaga || ''} 
                    className="input"
                    onChange={(e) => this.setState({nomeDaVaga: e.target.value})}/>

                <h3>Cliente</h3>
                <InputText 
                    value={this.state.cliente.nomeDoCliente || ''} 
                    className="input"
                    onChange={(e) => this.setState({nomeDoCliente: e.target.value})}
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
                        <Button label="Confirmar" onClick={() => this.confirmarSelectedCliente()}/>
                        <Button label="Cancelar" onClick={() => this.setState({visibleClientes: false})}/>
                </Dialog>

                <h3>Valor Base</h3>
                <InputText 
                    value={this.state.selectedVaga.valorBase || ''} 
                    className="input"
                    onChange={(e) => this.setState({valorBase: e.target.value})}/>
                    
                <h3>Valor Total</h3>
                <InputText 
                    value={this.state.valorTotal} 
                    className="input"
                    onChange={(e) => this.setState({valorTotal: e.target.value})}/>
                <Button label="Click" to="/" onClick={this.setRequest.bind(this)} />
            </div>
        )
    }

    renderSelecaoVagas(){
        return (
            <div id="vagas" className="body">

                <Breadcrumb caminho="/" title="Vagas Disponiveis"/>

                <div className="listaVagas">
                    {this.renderVagas()}
                </div>
                <div className="panel_opcoes">    
                    <Button className="btn_confirmar" onClick={() => displayAtendimento()} label="Confirmar"/>
                </div>
            </div>
            )
    }

    render() {
        return (
            <div>
                <Header/>               
                {this.renderSelecaoVagas()}
                {this.renderInput()}
            </div>
        );
    }
}

function displayVagas(){
    let vagas = document.getElementById('vagas')
    vagas.style.display = 'block'
    let atendimento = document.getElementById('atendimento')
    atendimento.style.display = 'none'
}

function displayAtendimento(){
    let atendimento = document.getElementById('atendimento')
    atendimento.style.display = 'block'
    let vagas = document.getElementById('vagas')
    vagas.style.display = 'none'
}

export default AtendimentoInput;
