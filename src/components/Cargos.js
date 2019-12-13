import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

class Cargos extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Cargos: [],
            loading: true,
            selectedCargo: null,            
            nomeDoCargo: null,
        };
    }

    componentDidMount() {
        this.getRequestCargos()
    }

    getRequestCargos() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getCargos/')
            .then(res =>
                this.setState({
                    cargos: res.data,
                    loading: false
                }),
            );
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarCargo',
            {
                "idCargo": this.state.selectedCargo.idCargo,
                "nomeDoCargo": this.state.nomeDoCargo,
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoCargo: null,
                    selectedCargo: null
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/cargos'
                }
                
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data);
            })
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
                        <h4>Cargo</h4>
                    </div>
                </div>

                <h3>Nome</h3>
                <InputText
                    value={this.state.nomeDoCargo || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoCargo: e.target.value })} />

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
                            <h4>Cargos</h4>
                        </div>
                    </div>

                    <DataTable 
                        value={this.state.cargos}
                        selectionMode="single"
                        selection={this.state.selectedCargo} 
                        emptyMessage="Nenhum cargo registrado."
                        paginator={true} 
                        responsive={true}
                        rows={20}
                        onRowDoubleClick={(e)=>{this.renderCargo(e.data)}}>

                        <Column  field="idCargo" header="ID" />  
                        <Column  field="nomeDoCargo" header="NOME" />        
                    </DataTable>
                </div>

        )
    }

    async renderCargo(e){
        console.log(e)
        displayInput()
        let cargoSelecionado = e     
        
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    selectedCargo: cargoSelecionado,
                    nomeDoCargo: cargoSelecionado.nomeDoCargo
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

export default Cargos;

