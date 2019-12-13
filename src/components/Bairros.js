import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

class Bairros extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bairros: [],
            loading: true,
            selectedBairro: null,
            ufs: [],
            ufSelecionada: null,
            municipios: [],
            municipioSelecionado: null,
            nomeDoBairro: null,
        };
        this.onUfChange = this.onUfChange.bind(this);
        this.onMunicipioChange = this.onMunicipioChange.bind(this);
    }

    componentDidMount() {
        this.getRequestBairros();
        this.getRequestUfs()
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarBairro',
            {
                "idBairro": this.state.selectedBairro.idBairro,
                "nomeDoBairro": this.state.nomeDoBairro,
                "idMunicipio": this.state.municipioSelecionado.code
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    municipios: [],
                    municipioSelecionado: null,
                    nomeDoBairro: null,
                    ufSelecionada: null,
                    selectedBairro: null,
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/bairros'
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
        this.getRequestMunicipios();
    }

    getRequestMunicipios() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getMunicipiosPorUf/' + this.state.ufSelecionada.code)
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
        await promise;
    }

    getRequestBairros() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getBairros/')
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

    voltarParaLista(){
        displayLista()
    }

    renderInput() {
        const ufs = this.getUfs();
        return (
            <div id="input" className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{this.voltarParaLista()}} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Bairro</h4>
                    </div>
                </div>

                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoBairro || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoBairro: e.target.value })} />

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

                <Button label="Salvar" className="btn_confirmar" onClick={this.setRequest.bind(this)} />
                <Button label="Cancelar" className="btn_confirmar" onClick={()=>{this.voltarParaLista()}} />
            </div>
        )
    }

    renderLista(){
        return (
            <div id="lista" className="body">

                    <div className="bread">
                        <div>
                            <Button className="button_bread" onClick={()=>{window.location = '/'}} label="Voltar"/>
                        </div>
                        <div>
                            <h4>Bairros</h4>
                        </div>
                    </div>

                    <DataTable 
                        value={this.state.bairros}
                        selectionMode="single"
                        selection={this.state.selectedBairro} 
                        emptyMessage="Nenhum bairro registrado."
                        paginator={true} 
                        responsive={true}
                        rows={20}
                        onRowDoubleClick={(e)=>{this.renderBairro(e.data)}}>

                        <Column  field="idBairro" header="ID" />  
                        <Column  field="nomeDoBairro" header="NOME" />         
                        <Column  field="municipio.nomeDoMunicipio" header="Município" />   
                        <Column  field="municipio.uf.nomeDaUf" header="Uf" />        
                    </DataTable>
                </div>

        )
    }

    async renderBairro(e){
        console.log(e)
        displayInput()
        let bairroSelecionado = e        
        let eventMunicipioSelecionado
        let evenUfSelecionada

        evenUfSelecionada = {
            name: bairroSelecionado.municipio.uf.nomeDaUf,
            code: bairroSelecionado.municipio.uf.idUf
        }

        eventMunicipioSelecionado = {
            name: bairroSelecionado.municipio.nomeDoMunicipio,
            code: bairroSelecionado.municipio.idMunicipio
        }  
        
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    selectedBairro: bairroSelecionado,
                    nomeDoBairro: bairroSelecionado.nomeDoBairro,
                    municipioSelecionado: eventMunicipioSelecionado,
                    ufSelecionada: evenUfSelecionada      
                })
            )
        });
        await promise;    
        this.getRequestMunicipios()        
    }

    render() {
        return (
            <div>
                <Header/>
                {this.renderLista()}
                {this.renderInput()}
            </div>
        );
    }
}

function displayInput(){
    let input = document.getElementById('input')
    input.style.display = 'block'
    let lista = document.getElementById('lista')
    lista.style.display = 'none'
}

function displayLista(){
    let input = document.getElementById('input')
    input.style.display = 'none'
    let lista = document.getElementById('lista')
    lista.style.display = 'block'
}

export default Bairros;

