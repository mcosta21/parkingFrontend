import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

class FuncionarioInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            nomeDoFuncionario: '',
            cpfDoFuncionario: '',
            rgDoFuncionario: '',
            enderecoDoFuncionario: '',
            sexoDoFuncionario: '',
            dataDeNascimento: '',
            dataDaAdmissao: '',
            ufSelecionada: '',
            ufs: [],
            municipios: [],
            municipioSelecionado: '',
            bairros: [],
            bairroSelecionado: '',
            salarioBase: '',
            usuario: '',
            senha: '',
            cargos: [],
            cargoSelecionado: '',
        };
        this.onUfChange = this.onUfChange.bind(this);
        this.onMunicipioChange = this.onMunicipioChange.bind(this);
    }

    componentDidMount() {
        this.getRequestUfs()
    }

    setRequest() {
        axios.post('http://localhost:8080/estacionamento/rest/ws/createFuncionario',
            {
                "nomeDoFuncionario": this.state.nomeDoFuncionario,
                "cpfDoFuncionario": this.state.cpfDoFuncionario,
                "rgDoFuncionario": this.state.rgDoFuncionario,
                "sexoDoFuncionario": this.state.sexoDoFuncionario,
                "enderecoDoFuncionario": this.state.enderecoDoFuncionario,
                "dataDeNascimento": this.state.dataDeNascimento,
                "dataDaAdmissao": this.state.dataDaAdmissao,
                "bairro": this.state.bairroSelecionado,
                "salarioBase": this.state.salarioBase,
                "usuario": this.state.usuario,
                "senha": this.state.senha,
                "cargo": this.state.cargoSelecionado,
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoFuncionario: '',
                    cpfDoFuncionario: '',
                    rgDoFuncionario: '',
                    enderecoDoFuncionario: '',
                    sexoDoFuncionario: '',
                    dataDeNascimento: '',
                    dataDaAdmissao: '',
                    ufSelecionada: '',
                    ufs: [],
                    municipios: [],
                    municipioSelecionado: '',
                    bairros: [],
                    bairroSelecionado: '',
                    salarioBase: '',
                    usuario: '',
                    senha: '',
                    cargos: [],
                    cargoSelecionado: '',
                })
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response);
            })
            .finally(() => {
                alert("Funcionário cadastrado com sucesso")
                window.location = '/'
            })
    }

    getRequestCargo() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getCargos/')
            .then(res =>
                this.setState({
                    cargos: res.data,
                    loading: false
                }),
            );
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
            { name: valor.nomeDaUf, code: valor.idUf }
        ))
    }

    async onUfChange(e) {
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ ufSelecionada: e.value, municipios: [], bairros: [], municipioSelecionado: '', bairroSelecionado: '' }),
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
            { name: valor.nomeDoMunicipio, code: valor.idMunicipio }
        ))
    }

    async onMunicipioChange(e) {
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ municipioSelecionado: e.value })
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
            { name: valor.nomeDoBairro, code: valor.idBairro }
        ))
    }

    renderInput() {
        const ufs = this.getUfs();
        const sexo = [
            { label: 'Feminino', value: 'FEMININO' },
            { label: 'Masculino', value: 'MASCULINO' },
            { label: 'Indefinido', value: 'INDEFINIDO' }
        ];

        return (
            <div className="body">
                <Breadcrumb caminho="/" title="Funcionário" />

                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoFuncionario || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoFuncionario: e.target.value })} />

                <h3>CPF</h3>
                <InputMask
                    mask="999.999.999-99"
                    className="input"
                    value={this.state.cpfDoFuncionario}
                    onChange={(e) => this.setState({ cpfDoFuncionario: e.target.value })} />

                <h3>RG</h3>
                <InputMask
                    mask="99.999.999-9"
                    value={this.state.rgDoFuncionario || ''}
                    className="input"
                    onChange={(e) => this.setState({ rgDoFuncionario: e.target.value })} />

                <h3>Endereço</h3>
                <InputText
                    value={this.state.enderecoDoFuncionario || ''}
                    className="input"
                    onChange={(e) => this.setState({ enderecoDoFuncionario: e.target.value })} />

                <h3>Sexo</h3>
                <Dropdown value={this.state.sexoDoFuncionario}
                    options={sexo}
                    onChange={(e) => { this.setState({ sexoDoFuncionario: e.target.value }) }} placeholder="Selecione o Sexo" />

                <h3>Data de Nascimento</h3>
                <InputMask
                    mask="99/99/9999"
                    className="input"
                    value={this.state.dataDeNascimento}
                    onChange={(e) => this.setState({ dataDeNascimento: e.target.value })} />

                <h3>Data da Admissão</h3>
                <InputMask
                    mask="99/99/9999"
                    className="input"
                    value={this.state.dataDaAdmissao}
                    onChange={(e) => this.setState({ dataDaAdmissao: e.target.value })} />

                <h3>Cargo</h3>
                <Dropdown value={this.state.cargoSelecionado}
                    options={this.getRequestCargo()}
                    onChange={(e) => { this.setState({ cargoSelecionado: e.target.value }) }} placeholder="Selecione o cargo" />

                <h3>Unidade Federativa</h3>
                <Dropdown optionLabel="name"
                    value={this.state.ufSelecionada}
                    options={ufs}
                    onChange={this.onUfChange} placeholder="Selecione a Unidade Federativa" />

                <h3>Município</h3>
                <Dropdown optionLabel="name"
                    value={this.state.municipioSelecionado}
                    options={this.getMunicipios()}
                    onChange={this.onMunicipioChange} placeholder="Selecione o Município" />

                <h3>Bairro</h3>
                <Dropdown optionLabel="name"
                    value={this.state.bairroSelecionado}
                    options={this.getBairros()}
                    onChange={(e) => { this.setState({ bairroSelecionado: e.target.value }) }} placeholder="Selecione o Bairro" />

                <h3>Salário Base</h3>
                <InputText
                    value={this.state.salarioBase || ''}
                    className="input"
                    onChange={(e) => this.setState({ salarioBase: e.target.value })} />

                <h3>Usuário</h3>
                <InputText
                    value={this.state.usuario || ''}
                    className="input"
                    onChange={(e) => this.setState({ usuario: e.target.value })} />

                <h3>Password</h3>
                <Password
                    value={this.state.senha || ''}
                    className="input"
                    onChange={(e) => this.setState({ senha: e.target.value })} />

                <Button label="Click" onClick={this.setRequest.bind(this)} />

                <Button label="teste" icon="pi pi-check" iconPos="right" onClick={() => { console.log(this.state.bairroSelecionado) }} />

            </div >
        )
    }

    render() {
        return (
            <div>
                <Header />
                {this.renderInput()}
            </div>
        );
    }
}

export default FuncionarioInput;
