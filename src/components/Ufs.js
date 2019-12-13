import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

class Ufs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ufs: [],
            loading: true,
            selectedUf: null,            
            nomeDaUf: null,
            siglaDaUf: null
        };
        this.onUfChange = this.onUfChange.bind(this);
    }

    componentDidMount() {
        this.getRequestUfs()
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarUf',
            {
                "idUf": this.state.selectedUf.idUf,
                "nomeDaUf": this.state.nomeDaUf,
                "siglaDaUf": this.state.siglaDaUf,
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDaUf: null,
                    siglaDaUf: null,
                    selectedUf: null,
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/ufs'
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
                this.setState({ ufSelecionada: e.value }),
            )
        });
        await promise;
    }

    voltarParaLista(){
        displayLista()
    }

    renderInput() {
        return (
            <div id="input" className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{this.voltarParaLista()}} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Unidade Federativa</h4>
                    </div>
                </div>

                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDaUf || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDaUf: e.target.value })} />
                
                <h3>Sigla</h3>
                <InputText
                    value={this.state.siglaDaUf || ''}
                    className="input"
                    onChange={(e) => this.setState({ siglaDaUf: e.target.value })} />

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
                            <h4>Unidades Federativas</h4>
                        </div>
                    </div>

                    <DataTable 
                        value={this.state.ufs}
                        selectionMode="single"
                        selection={this.state.selectedUf} 
                        emptyMessage="Nenhum unidade federativa registrado."
                        paginator={true} 
                        responsive={true}
                        rows={20}
                        onRowDoubleClick={(e)=>{this.renderMunicipio(e.data)}}>

                        <Column  field="idUf" header="ID" />  
                        <Column  field="nomeDaUf" header="NOME" />         
                        <Column  field="siglaDaUf" header="SIGLA" />        
                    </DataTable>
                </div>

        )
    }

    async renderMunicipio(e){
        console.log(e)
        displayInput()
        let ufSelecionada = e     
        
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    selectedUf: ufSelecionada,
                    nomeDaUf: ufSelecionada.nomeDaUf,
                    siglaDaUf: ufSelecionada.siglaDaUf      
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

export default Ufs;

