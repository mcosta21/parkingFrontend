import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';

class AtendimentoInput extends Component {
    
    constructor(props) {
        super(props);
        this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
        this.onHide = this.onHide.bind(this);        
        this.state = {
            clientes: [],
            atendimentos: [],
            visibleClientes: false,
            loading: true,
            cliente: '',
            selectedCliente: '',
            vagas: [],
            selectedVaga: '',
            valorTotal: 0,
            caminho: '/vagasDisponiveis',
            veiculos: [],
            veiculo: '',
            selectedVeiculo: '',
            visibleVeiculos: false,
            tipoAtendimentoSelecionado: '',
            tiposAtendimentos: [],
            desconto: 0,
            funcionario: '',
            funcionarios: [],
            dataEntrada: '',
            dataSaida: '',
            porcentagem: 0
        };    
    }

    componentDidMount() {
        this.getRequestClientes()
        this.getRequestAtendimentos()
        this.getRequestVagas()
        this.getRequestTiposAtendimentos()
        this.getRequestFuncionarios()
        let data = new Date().toLocaleString();
        this.setState({
            dataEntrada: data
        })
    }

    getRequestClientes() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getClientes/')
            .then(res =>
                this.setState({ 
                    clientes: res.data, 
                    loading: false 
                }),
            );
    }

    getRequestVeiculosDoCliente() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getVeiculosDoCliente/' + this.state.cliente.idCliente)
            .then(res =>
                this.setState({ 
                    veiculos: res.data, 
                    loading: false 
                }),
            );
    }

    getVeiculos() {
        return this.state.veiculos.map((valor) => (
            {name: valor.numeroDaPlaca + ' / ' + valor.corDoCarro, code: valor.idVeiculo}
        ))
    }

    getRequestTiposAtendimentos() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getTipoDeAtendimentos/')
            .then(res =>
                this.setState({ 
                    tiposAtendimentos: res.data, 
                    loading: false 
                }),
            );
    }

    getTiposDeAtendimentos() {
        return this.state.tiposAtendimentos.map((valor) => (
            {
             name: valor.nomeDoTipoAtendimento + ' - Desconto de ' + valor.porcentagemDesconto + '% ',
             code: valor.idTipoAtendimento, 
             porcentagem: valor.porcentagemDesconto
            }
        ))
    }

    async onDescontoChange(e){
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({
                    tipoAtendimentoSelecionado: e.value,
                    porcentagem: e.value.porcentagem,
                })
            )
        });
        await promise;
    }

    async getValorTotal(e){        
        if((e.value === '' || e.value.replace("_", "").length < 19) || this.state.tipoAtendimentoSelecionado === ''){
            return 0
        }
        let dtSaida = new Date(e.value)
        let dtEntrada = new Date(this.state.dataEntrada)
        let diffMs = (dtSaida - dtEntrada);
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        let diffMins = Math.round(((diffMs) % 86400000 % 3600000) / 60000);
        let valorPorMinuto = this.state.selectedVaga.valorBase / 60;
        let valor = this.state.selectedVaga.valorBase * diffHrs + valorPorMinuto * diffMins;
        let porcent = this.state.porcentagem
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({
                    dataSaida: e.value,
                    valorTotal: (Number.parseFloat(valor) - (Number.parseFloat(valor) * (Number.parseInt(porcent) / 100))).toFixed(2),
                    desconto: (Number.parseFloat(valor) * (Number.parseInt(porcent) / 100)).toFixed(2)
                })
            )
        });
        await promise;

    }

    getRequestAtendimentos(){    
        axios
        .get('http://localhost:8080/estacionamento/rest/ws/getAtendimentos/')
        .then(res =>
            this.setState({ 
                atendimentos: res.data, 
                loading: false 
            }),
        );
    }
    
    getRequestFuncionarios() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getFuncionarios/')
            .then(res =>
                this.setState({ 
                    funcionarios: res.data, 
                    loading: false 
                }),
            );
    }

    getFuncionarios() {
        return this.state.funcionarios.map((valor) => (
            {name: valor.nomeDoFuncionario, code: valor.idFuncionario}
        ))
    }

    getHorasAtendimento(){
        if((this.state.dataSaida === '' || this.state.dataSaida.replace("_", "").length < 19) || this.state.tipoAtendimentoSelecionado === ''){
            return 0
        }
        let dtSaida = new Date(this.state.dataSaida)
        let dtEntrada = new Date(this.state.dataEntrada)
        let diffMs = (dtSaida - dtEntrada);
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        let diffMins = Math.round(((diffMs) % 86400000 % 3600000) / 60000);
        let diff = diffHrs + 'h ' + diffMins + 'm'   
        return diff
    }
   
    setRequest(){
        axios.post('http://localhost:8080/estacionamento/rest/ws/createAtendimento',
        {
            "cliente": this.state.cliente.idCliente,
            "vaga": this.state.selectedVaga.idVaga,
            "valorBase": this.state.selectedVaga.valorBase,
            "valorTotal": this.state.valorTotal,
            "funcionario": this.state.funcionario
        })
        .then(response => {     
            console.log(response);
            this.setState=({cliente: '', vagas: [], selectedCliente: '', selectedVaga: '', valorTotal: '0'})            
            this.setRequestAlterarStatusVaga('2')                      
        })       
        .catch(error => {
            console.log(error.response)
            alert(error.response);
        })
        .finally(()=>{
            alert("Atendimento cadastrado com sucesso")
            window.location = '/'
        })   
    }

    setRequestAlterarStatusVaga(status){
        axios.post('http://localhost:8080/estacionamento/rest/ws/alterarStatusVaga',
        {
            "idVaga": this.state.selectedVaga.idVaga,
            "status": status
        })
        .then(response => {
            console.log(response);            
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data);
        })
    }

    getStatusAtendimento(){
        return (this.state.dataSaida === '' ? 'Aberto' : 'Fechado')
    }

    renderClientes() {
        console.log('entrou no render clientes');
        console.log('this.state.clientes', this.state.clientes);
        return this.state.clientes.map((valor, i) => (
            <li key={i}>{valor.nomeDoCliente}</li>
        ))
    }

    async confirmarSelectedCliente(){
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({
                    cliente: this.state.selectedCliente, 
                    visibleClientes: false
                })
            )
        });
        await promise;
        this.getRequestVeiculosDoCliente()
    }

    confirmarSelectedFuncionario(){
        this.setState({
                        funcionario: this.state.selectedFuncionario, 
                        visibleFuncionarios: false
                    });  
    }

    renderAtendimentos() {
        return this.state.atendimentos.map((valor, i) => (
            <li key={i}>{valor.idAtendimento}</li>
        ))
    }

    _handleDoubleClickItem(event){
    }

    onHide() {
        this.setState({visibleClientes: false});
    }

    getRequestVagas() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getVagasDisponiveis/')
            .then(res =>
                this.setState({ 
                    vagas: res.data, 
                    loading: false 
                }),
            );
            
    }

    selectVaga(vaga){
        this.setState({selectedVaga: vaga.valor, nomeDaVaga: vaga.valor.nomeDaVaga, caminho: '/atendimento'});
        console.log(this.state.selectedVaga);
    }

    renderVagas(){
        return this.state.vagas.map((valor, i) => (
            <Button label={valor.nomeDaVaga} key={i} className="fieldVaga" onClick={() => this.selectVaga({valor})}></Button>
        ))
    }

    renderInput(){
        const tipos = this.getTiposDeAtendimentos();
        const funcionarios = this.getFuncionarios();
        return (
            <div id="atendimento" className="body">
                
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={() => displayVagas()} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Atendimento</h4>
                    </div>
                </div>

                <h3>Status</h3>
                <InputText 
                    value={this.getStatusAtendimento()} 
                    className="input"
                    readOnly/>

                <h3>Vaga</h3>
                <InputText 
                    value={this.state.selectedVaga.nomeDaVaga || ''} 
                    className="input"
                    readOnly
                    onChange={(e) => this.setState({nomeDaVaga: e.target.value})}/>

                <h3>Cliente</h3>
                <InputText 
                    value={this.state.cliente.nomeDoCliente || ''} 
                    className="input"
                    readOnly
                    onChange={(e) => this.setState({nomeDoCliente: e.target.value})}
                    onDoubleClick={()=>this.setState({visibleClientes: true})}/>
                    
                <Dialog 
                    header="Clientes" 
                    visible={this.state.visibleClientes} 
                    modal={true} 
                    onHide={() => this.setState({visibleClientes: false})}>
                        <DataTable 
                            value={this.state.clientes}
                            selectionMode="single"
                            selection={this.state.selectedCliente} 
                            onSelectionChange={e => this.setState({selectedCliente: e.value})}>
                            <Column field="idCliente" header="ID" />                        
                            <Column field="nomeDoCliente" header="Nome" />
                        </DataTable>
                        <Button label="Confirmar" onClick={() => this.confirmarSelectedCliente()}/>
                        <Button label="Cancelar" onClick={() => this.setState({visibleClientes: false})}/>
                </Dialog>

                <h3>Veiculos</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.veiculo}
                            options={this.getVeiculos()} 
                            onChange={(e) => {this.setState({veiculo: e.value})}} placeholder="Selecione o Veiculo"/>

                <h3>Tipo de Atendimento</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.tipoAtendimentoSelecionado}
                            options={tipos} 
                            onChange={(e)=>{this.onDescontoChange(e)}} placeholder="Selecione o Tipo de Atendimento"/>
                
                <h3>Funcionário</h3>
                <Dropdown optionLabel="name" 
                        value={this.state.funcionario}
                        options={funcionarios} 
                        onChange={(e) => {this.setState({funcionario: e.value})}} placeholder="Selecione o Funcionário"/>

                <h3>Data da Entrada</h3>
                <InputText 
                    value={this.state.dataEntrada || ''} 
                    className="input"
                    readOnly
                    onChange={(e) => this.setState({dataEntrada: e.target.value})}/>

                <h3>Data de Saída</h3>
                <InputMask
                    mask="99/99/9999 99:99:99"
                    value={this.state.dataSaida || ''} 
                    className="input"
                    readOnly
                    onChange={(e)=>{this.getValorTotal(e)}}/>

                <h3>Horas de Atendimento</h3>
                <InputText 
                    value={this.getHorasAtendimento()} 
                    className="input"
                    readOnly />

                <h3>Valor Base por Hora</h3>
                <InputText 
                    value={this.state.selectedVaga.valorBase || 0} 
                    className="input"
                    readOnly 
                    onChange={(e) => this.setState({valorBase: e.target.value})}/>
                
                <h3>Desconto</h3>
                <InputText 
                    value={this.state.desconto || 0} 
                    className="input"
                    readOnly 
                    onChange={(e) => this.setState({desconto: e.target.value})}/>

                <h3>Valor Total</h3>
                <InputText 
                    value={this.state.valorTotal} 
                    className="input"
                    readOnly 
                    onChange={(e) => this.setState({valorTotal: e.target.value})}/>
                
                
                <Button className="btn_confirmar" label="Salvar" onClick={this.setRequest.bind(this)} />
                <Button className="btn_confirmar" label="Teste" onClick={()=>{console.log(this.getValorTotal())}} />
                
            </div>
        )
    }

    renderSelecaoVagas(){
        return (
            <div id="vagas" className="body">

                <Breadcrumb caminho="/" title="Vagas Disponiveis"/>

                <div className="listaVagas">
                    {this.renderVagas()}
                </div>
                <div className="panel_opcoes">    
                    <Button className="btn_confirmar" onClick={() => displayAtendimento()} label="Confirmar"/>
                </div>
            </div>
            )
    }

    render() {
        return (
            <div>
                <Header/>               
                {this.renderSelecaoVagas()}
                {this.renderInput()}
            </div>
        );
    }
}

function displayVagas(){
    let vagas = document.getElementById('vagas')
    vagas.style.display = 'block'
    let atendimento = document.getElementById('atendimento')
    atendimento.style.display = 'none'
}

function displayAtendimento(){
    let atendimento = document.getElementById('atendimento')
    atendimento.style.display = 'block'
    let vagas = document.getElementById('vagas')
    vagas.style.display = 'none'
}

export default AtendimentoInput;
