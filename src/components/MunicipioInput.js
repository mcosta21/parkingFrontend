import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

class MunicipioInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ufs: [],
            ufSelecionada: null,
            nomeDoMunicipio: null,
        };
        this.onUfChange = this.onUfChange.bind(this);
    }

    componentDidMount() {
        this.getRequestUfs()
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/createMunicipio',
            {
                "nomeDoMunicipio": this.state.nomeDoMunicipio,
                "idUf": this.state.ufSelecionada.code
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoMunicipio: null,
                    ufSelecionada: null
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/'
                }
                
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data);
            })
    }

    getRequestUfs() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getUfs/')
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
                this.setState({ ufSelecionada: e.value, municipios: [], bairros: [], municipioSelecionado: null, bairroSelecionado: null }),
            )
        });
        await promise;
    }

    renderInput() {
        const ufs = this.getUfs();
        return (
            <div className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{window.location="/"}}label="Voltar"/>
                    </div>
                    <div>
                        <h4>Município</h4>
                    </div>
                </div>

                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoMunicipio || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoMunicipio: e.target.value })} />

                <h3>Unidade Federativa</h3>
                <Dropdown optionLabel="name"
                    value={this.state.ufSelecionada}
                    options={ufs}
                    onChange={this.onUfChange} placeholder="Selecione a Unidade Federativa" />

                <Button label="Salvar" className="btn_confirmar" onClick={this.setRequest.bind(this)} />
                <Button label="Cancelar" className="btn_confirmar" onClick={()=>{window.location = '/'}} />
            </div>
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

export default MunicipioInput;
