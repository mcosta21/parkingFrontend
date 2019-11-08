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
            ufs: [],
            municipios: [],
            municipioSelecionado: '',
            bairros: [],
            bairroSelecionado: '',
        };    
        this.onUfChange = this.onUfChange.bind(this);
        this.onMunicipioChange = this.onMunicipioChange.bind(this);
    }

    componentDidMount() {
        this.getRequestUfs()
    }

    setRequest(){
        axios.post('http://localhost:8080/estacionamento/rest/ws/createCliente',
        {
            "nomeDoCliente": this.state.nomeDoCliente,
            "cpfDoCliente": this.state.cpfDoCliente,
            "rgDoCliente": this.state.rgDoCliente,
            "sexoDoCliente": this.state.sexoDoCliente,
            "enderecoDoCliente": this.state.enderecoDoCliente,
            "dataDeNascimento": this.state.dataDeNascimento,
            "tipoCliente": this.state.tipoCliente,
            "situacaoCliente": this.state.situacaoCliente,
            "bairro": this.state.bairroSelecionado
        })
        .then(response => {     
            console.log(response);
            this.setState=({
                nomeDoCliente: '',
                cpfDoCliente: '',
                rgDoCliente: '',
                enderecoDoCliente: '',
                sexoDoCliente: '',
                dataDeNascimento: '',
                tipoCliente: '',
                situacaoCliente: '',
                ufSelecionada: '',
                municipios: [],
                municipioSelecionado: '',
                bairros: [],
                bairroSelecionado: ''
            })                    
        })       
        .catch(error => {
            console.log(error.response)
            alert(error.response);
        })
        .finally(()=>{
            alert("Cliente cadastrado com sucesso")
            window.location = '/'
        })   
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
            {name: valor.nomeDaUf, code: valor.idUf}
        ))
    }

    async onUfChange(e){
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ufSelecionada: e.value, municipios: [], bairros: [], municipioSelecionado: '', bairroSelecionado: ''}),
            )
          });        
        let result = await promise;
        console.log(this.state.ufSelecionada.code);  
        this.getRequestMunicipios();
    }

    getRequestMunicipios() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getMunicipiosPorUf/' + this.state.ufSelecionada.code)
            .then(res =>
                this.setState({ 
                    municipios: res.data, 
                    loading: false 
                }),
            )
    }

    getMunicipios() {
        return this.state.municipios.map((valor) => (
            {name: valor.nomeDoMunicipio, code: valor.idMunicipio}
        ))
    }

    async onMunicipioChange(e){
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({municipioSelecionado: e.value})
            )
          });        
        let result = await promise;
        console.log(this.state.municipioSelecionado.name);  
        this.getRequestBairros();
    }

    getRequestBairros() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getBairrosPorMunicipio/' + this.state.municipioSelecionado.code)
            .then(res =>
                this.setState({ 
                    bairros: res.data, 
                    loading: false 
                }),
            )
    }

    getBairros() {
        return this.state.bairros.map((valor) => (
            {name: valor.nomeDoBairro, code: valor.idBairro}
        ))
    }

    renderInput(){
        const ufs = this.getUfs();
        const sexo = [
            { label: 'Feminino', value: 'FEMININO' },
            { label: 'Masculino', value: 'MASCULINO' },
            { label: 'Indefinido', value: 'INDEFINIDO' }
        ];

        const tipo = [
            { label: 'Rotativo', value: 'ROTATIVO' },
            { label: 'Mensalista', value: 'MENSALISTA' }
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
                <InputMask
                    mask="99.999.999-9"
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
                <Dropdown value={this.state.situacaoCliente} 
                        options={situacao} 
                        onChange={(e) => { this.setState({ situacaoCliente: e.target.value }) }} placeholder="Selecione a Situação do Cliente" />
                
                <h3>Unidade Federativa</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.ufSelecionada}
                            options={ufs} 
                            onChange={this.onUfChange} placeholder="Selecione a Unidade Federativa"/>
                
                <h3>Município</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.municipioSelecionado}
                            options={this.getMunicipios()} 
                            onChange={this.onMunicipioChange} placeholder="Selecione o Município"/>

                <h3>Bairro</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.bairroSelecionado}
                            options={this.getBairros()} 
                            onChange={(e) => { this.setState({ bairroSelecionado: e.target.value }) }} placeholder="Selecione o Bairro"/>
                 
                <Button label="Click" onClick={this.setRequest.bind(this)} />
                
                <Button label="teste" icon="pi pi-check" iconPos="right" onClick={()=>{console.log(this.state.bairroSelecionado)}} />
               
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
