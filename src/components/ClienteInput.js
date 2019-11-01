import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Select } from '@material-ui/core';


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
            situacaoCliete: '',
            bairro: [],
            municipio: [],
            uf: [],
            ufSelecionada: '',
        };
    }

    componentDidMount() {
        this.getUf();
        this.getMunicipio();
        this.getBairro();
    }

    getUf() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getUfs/')
            .then(res => {
                this.setState({ uf: res.data });
                console.log("THIS.STATE.UF ----> ", this.state.uf);
                console.log("THIS.STATE.UF.NOMEDAUF ----> ", this.state.uf.idUf);
            }).finally(() => {this.mapUfToDropdown()});
    }

    mapUfToDropdown() {
        return this.state.uf.map((valores) => (
            { name: valores.nomeDaSigla, code: valores.nomeDaSigla }
        ))
    }

    getMunicipio() {
        axios.get('http://localhost:8080/estacionamento/rest/ws/getMunicipios/')
            .then(res => {
                this.setState({ municipio: res.data });
                console.log("THIS.STATE.MUNICIPIO ----> ", this.state.municipio);
                console.log("THIS.STATE.MUNICIPIO.NOMEDOMUNICIPIO ----> ", this.state.municipio.nomeDoMunicipio);
            });
    }

    mapMunicipioToDropdown() {
        return this.state.Municipio.map((valores) => (
            { name: valores.nomeDoMunicipio, code: valores.nomeDoMunicipio }
        ))
    }

    getBairro() {
        axios.get('http://localhost:8080/estacionamento/rest/ws/getBairros/')
            .then(res => {
                this.setState({ bairro: res.data });
                console.log("THIS.STATE.BAIRRO ----> ", this.state.bairro);
                console.log("THIS.STATE.BAIRRO.NOMEDOMBAIRRO ----> ", this.state.bairro.nomeDoBairro);
            });
    }

    setRequest() {
        axios.post('http://localhost:8080/estacionamento/rest/ws/createCliente',
            {

            })
            .then(response => {
                console.log(response);
                this.setState = ({ cliente: '', vagas: [], selectedCliente: '', selectedVaga: '', valorTotal: '0' });
                alert("Atendimento cadastrado com sucesso");
                this.setRequestAlterarStatusVaga('2');

            })
            .catch(error => {
                console.log(error.response)
                alert(error.response);
            })


    }

    render() {
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
        
        const ufDropdown = this.mapUfToDropdown();

        return (
            <div>
                <Header />
                <Breadcrumb caminho="/" title="Cadastro Cliente" />
                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoCliente || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoCliente: e.target.value })} />
                <h3>CPF</h3>
                <InputMask
                    mask="999.999.999-99"
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
                <Dropdown value={this.state.sexoDoCliente} options={sexo} onChange={(e) => { this.setState({ sexoDoCliente: e.target.value }) }} placeholder="Selecione o Sexo" />
                <h3>Data de Nascimento</h3>
                <InputMask
                    mask="99/99/9999"
                    value={this.state.dataDeNascimento}
                    onChange={(e) => this.setState({ dataDeNascimento: e.target.value })} />
                <h3>Tipo:</h3>
                <Dropdown value={this.state.tipoCliente} options={tipo} onChange={(e) => { this.setState({ tipoCliente: e.target.value }) }} placeholder="Selecione o Tipo do Cliente" />
                <h3>Situacao:</h3>
                <Dropdown value={this.state.situacaoCliete} options={situacao} onChange={(e) => { this.setState({ situacaoCliete: e.target.value }) }} placeholder="Selecione a Situação do Cliente" />
                <h3>Uf:</h3>
                <Dropdown value={this.state.ufSelecionada} options={ufDropdown} onChange={(e) => { this.setState({ ufSelecionada: e.target.value }) }} placeholder="Selecione a UF" />
                <h3>Município:</h3>
                <Dropdown value={this.state.municipio} options={this.state.municipio} onChange={(e) => { this.setState({ municipio: e.target.value }) }} placeholder="Selecione o Município" />
                <h3>Bairro:</h3>
                <Dropdown value={this.state.bairro} options={this.state.bairro} onChange={(e) => { this.setState({ bairro: e.target.value }) }} placeholder="Selecione o Bairro" />
                <br />
                <Button label="Cadastrar" icon="pi pi-check" iconPos="right" onClick={this.onNovoClienteClick} />
            </div>
        );
    }

}

export default ClienteInput;
