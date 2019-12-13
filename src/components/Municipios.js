import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import {Dialog} from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

class Bairros extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            municipios: [],
            loading: true,
            selectedMunicipio: null,
            ufs: [],
            ufSelecionada: null,
            nomeDoMunicipio: null,
        };
        this.onUfChange = this.onUfChange.bind(this);
    }

    componentDidMount() {
        this.getRequestUfs()
        this.getRequestMunicipios();
    }

    getRequestMunicipios() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getMunicipios/')
            .then(res =>
                this.setState({
                    municipios: res.data,
                    loading: false
                }),
            )
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarMunicipio',
            {
                "idMunicipio": this.state.selectedMunicipio.idMunicipio,
                "nomeDoMunicipio": this.state.nomeDoMunicipio,
                "idUf": this.state.ufSelecionada.code
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoMunicipio: null,
                    ufSelecionada: null,
                    selectedMunicipio: null,
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/municipios'
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
                            <h4>Municípios</h4>
                        </div>
                    </div>

                    <DataTable 
                        value={this.state.municipios}
                        selectionMode="single"
                        selection={this.state.selectedMunicipio} 
                        emptyMessage="Nenhum município registrado."
                        paginator={true} 
                        responsive={true}
                        rows={20}
                        onRowDoubleClick={(e)=>{this.renderMunicipio(e.data)}}>

                        <Column  field="idMunicipio" header="ID" />  
                        <Column  field="nomeDoMunicipio" header="NOME" />         
                        <Column  field="uf.nomeDaUf" header="UF" />        
                    </DataTable>
                </div>

        )
    }

    async renderMunicipio(e){
        console.log(e)
        displayInput()
        let municipioSelecionado = e     
        let evenUfSelecionada

        evenUfSelecionada = {
            name: municipioSelecionado.uf.nomeDaUf,
            code: municipioSelecionado.uf.idUf
        }
        
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    selectedMunicipio: municipioSelecionado,
                    nomeDoMunicipio: municipioSelecionado.nomeDoMunicipio,
                    ufSelecionada: evenUfSelecionada      
                })
            )
        });
        await promise;           
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

