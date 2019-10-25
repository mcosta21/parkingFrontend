import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import {Dropdown} from 'primereact/dropdown';
import {Dialog} from 'primereact/dialog';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


class ClienteInput extends Component {
    
    constructor(props) {
        super(props);
        
        
        this.state = {
            loading: true,
            nomeDoCliente: '',
            cpfDoCliente: '',
            rgDoCliente: '',
            enderecoDoCliente: '',
            sexoDoCliente: '',
            dataDeNascimento: '',
            dataDoCadastro: '',
            tipoCliente: '',
            situacaoCliete: '',
            bairro: ''
        };    
    }

    setRequest(){
        axios.post('http://localhost:8080/estacionamento/rest/ws/createCliente',
        {
            
        })
        .then(response => {
            console.log(response);
            this.setState=({cliente: '', vagas: [], selectedCliente: '', selectedVaga: '', valorTotal: '0'});
            alert("Atendimento cadastrado com sucesso");
            this.setRequestAlterarStatusVaga('2');
            
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response);
        })

        
    }

    render(){
        const sexo = [
            {label: 'Feminino', value: 'FEMININO'},
            {label: 'Masculino', value: 'MASCULINO'}
        ];
        return(
            <div>
                <Header />
                <Breadcrumb caminho="/" title="Cadastro Cliente" />
                <h3>Nome</h3>
                <InputText 
                    value={this.state.nomeDoCliente || ''} 
                    className="input"
                    onChange={(e) => this.setState({nomeDoCliente: e.target.value})}/>
                <h3>CPF</h3>
                <InputMask 
                    mask="999.999.999-99" 
                     value={this.state.cpfDoCliente} 
                    onChange={(e) => this.setState({cpfDoCliente: e.target.value})}/>
                <h3>RG</h3>
                <InputText 
                    value={this.state.rgDoCliente || ''} 
                    className="input"
                    onChange={(e) => this.setState({rgDoCliente: e.target.value})}/>
                <h3>Sexo</h3>
                <Dropdown value={this.state.sexoDoCliente} options={sexo} onChange={(e) => {this.setState({sexoDoCliente: e.target.value})}} placeholder="Selecione o Sexo"/>
                <h3>Data de Nascimento</h3>
                <InputMask 
                    mask="99/99/9999" 
                     value={this.state.dataDeNascimento} 
                    onChange={(e) => this.setState({dataDeNascimento: e.target.value})}/>
                    <br />
                <Button label="Cadastrar" icon="pi pi-check" iconPos="right" onClick={this.onNovoClienteClick}/>
            </div>
        );
    }
   
}

export default ClienteInput;
