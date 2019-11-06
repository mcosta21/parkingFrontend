import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import {Dropdown} from 'primereact/dropdown';

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
            tipoCliente: '',
            situacaoCliente: '',            
            ufSelecionada: '',
            ufs: []
        };    
    }

    componentDidMount() {
        this.getRequestUfs()
    }

    UNSAFE_componentWillMount(){
    }

    getRequestUfs() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getUfs/')
            .then(res =>
                this.setState({ 
                    ufs: res.data, 
                    loading: false 
                }),
            );
    }

    getUfs() {
        return this.state.ufs.map((valor) => (
            {name: valor.nomeDaUf, code: valor.nomeDaUf}
        ))
    }

    renderInput(){
        const ufs = this.getUfs();
        const sexo = [
            { label: 'Feminino', value: 'FEMININO' },
            { label: 'Masculino', value: 'MASCULINO' }
        ];

        const tipo = [
            { label: 'Rotativo', value: 'ROTATIVO' },
            { label: 'Mensalista', value: 'MENSALISTA' },
            { label: 'Sócio', value: 'SÓCIO' }
        ];

        const situacao = [
            { label: 'Ativo', value: 'ATIVO' },
            { label: 'Inativo', value: 'INATIVO' },
            { label: 'Devedor', value: 'DEVEDOR' }
        ];
        return (
            <div className="body">                
                <Breadcrumb caminho="/" title="Cliente" />
                
                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoCliente || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoCliente: e.target.value })} />

                <h3>CPF</h3>
                <InputMask
                    mask="999.999.999-99"
                    className="input"
                    value={this.state.cpfDoCliente}
                    onChange={(e) => this.setState({ cpfDoCliente: e.target.value })} />

                <h3>RG</h3>
                <InputText
                    value={this.state.rgDoCliente || ''}
                    className="input"
                    onChange={(e) => this.setState({ rgDoCliente: e.target.value })} />

                <h3>Endereço</h3>
                <InputText
                    value={this.state.enderecoDoCliente || ''}
                    className="input"
                    onChange={(e) => this.setState({ enderecoDoCliente: e.target.value })} />

                <h3>Sexo</h3>
                <Dropdown value={this.state.sexoDoCliente} 
                        options={sexo} 
                        onChange={(e) => { this.setState({ sexoDoCliente: e.target.value }) }} placeholder="Selecione o Sexo" />
                
                <h3>Data de Nascimento</h3>
                <InputMask
                    mask="99/99/9999"
                    className="input"
                    value={this.state.dataDeNascimento}
                    onChange={(e) => this.setState({ dataDeNascimento: e.target.value })} />
                
                <h3>Tipo do Cliente</h3>
                <Dropdown value={this.state.tipoCliente} 
                        options={tipo} 
                        onChange={(e) => { this.setState({ tipoCliente: e.target.value }) }} placeholder="Selecione o Tipo do Cliente" />
                
                <h3>Situação</h3>
                <Dropdown value={this.state.situacaoCliete} 
                        options={situacao} 
                        onChange={(e) => { this.setState({ situacaoCliete: e.target.value }) }} placeholder="Selecione a Situação do Cliente" />
                
                <h3>Unidade Federativa</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.ufSelecionada}
                            options={ufs} 
                            onChange={(e) => {this.setState({ufSelecionada: e.value})}} placeholder="Selecione a Unidade Federativa"/>
                 
                <Button label="Cadastrar" icon="pi pi-check" iconPos="right" onClick={this.onNovoClienteClick} />
                <Button label="teste" icon="pi pi-check" iconPos="right" onClick={()=>{console.log(this.state.uf)}} />
               
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>               
                {this.renderInput()}
            </div>
        );
    }
}

export default ClienteInput;
