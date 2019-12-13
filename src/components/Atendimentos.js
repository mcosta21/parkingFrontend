import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import {Button} from 'primereact/button';
import '../App.css';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
class Atendimento extends Component {
    
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
            veiculo: null,
            selectedVeiculo: null,
            visibleVeiculos: false,
            tipoAtendimentoSelecionado: null,
            tiposAtendimentos: [],
            desconto: 0,
            funcionario: null,
            funcionarios: [],
            dataEntrada: null,
            dataSaida: null,
            porcentagem: 0,
            idAtendimento: null,
            visibleFecharAtendimento: false,
            observacao: null,
            formasDePagamento: [],
            formaPagamentoSelecionado: null,
        };
    }

    componentDidMount() {
        this.getRequestAtendimentos();
        this.getRequestClientes()
        this.getRequestTiposAtendimentos()
        this.getRequestFuncionarios()
        this.getRequestFormasDePagamento()
    } 

    setRequest(){
        if(this.state.selectedAtendimento.statusAtendimento === true){
            alert("Atendimento fechado.")
            return
        }
        let veiculo
        if(this.state.veiculo != null){
            veiculo = this.state.veiculo.code
        }
        let tipoAtendimento
        if(this.state.tipoAtendimentoSelecionado != null){
            tipoAtendimento = this.state.tipoAtendimentoSelecionado.code
        }
        let funcionario
        if(this.state.funcionario != null){
            funcionario = this.state.funcionario.code
        }
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarAtendimento',
        {
            "idAtendimento": this.state.idAtendimento,
            "cliente": this.state.cliente.idCliente,
            "vaga": this.state.selectedVaga.idVaga,
            "dataEntrada": this.state.dataEntrada,
            "dataSaida": this.state.dataSaida,
            "veiculo": veiculo,
            "tipoDeAtendimento": tipoAtendimento,
            "valorBase": this.state.selectedVaga.valorBase,
            "funcionario": funcionario,
            "valorTotal": this.state.valorTotal
        })
        .then(response => {                 
            this.setState=({
                    cliente: '', 
                    vagas: [], 
                    selectedCliente: '', 
                    selectedVaga: '', 
                    dataEntrada: null,
                    dataSaida: null,
                    tipoAtendimentoSelecionado: null,
                    valorBase: 0,
                    valorTotal: 0,
                    funcionario: null
            })            
            this.setRequestAlterarStatusVaga('2')
            if(response.status === 200){
                alert(response.data);
                window.location = '/atendimentos'
            }                   
        })       
        .catch(error => {
            console.log(error.response)
            alert(error.response.data);
        })
    }

    setRequestAlterarStatusVaga(status){
        axios.post('http://localhost:8080/parkingBackend/rest/ws/alterarStatusVaga',
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
        return (this.state.statusAtendimento === true ? 'Aberto' : 'Fechado')
    }

    getStatusAtendimento2(data){
        return (data === null ? 'Aberto' : 'Fechado')
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
    
    _handleDoubleClickItem(event){
    }

    onHide() {
        this.setState({visibleClientes: false});
    }

    getRequestClientes() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getClientes/')
            .then(res =>
                this.setState({ 
                    clientes: res.data, 
                    loading: false 
                }),
            );
    }

    getRequestVeiculosDoCliente() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getVeiculosDoCliente/' + this.state.cliente.idCliente)
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
            .get('http://localhost:8080/parkingBackend/rest/ws/getTipoDeAtendimentos/')
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

    formatarData(data){
        return data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2) + "T" + data.substr(11, 19) + '.000Z'
    }

    async getValorTotal(e){        
        if((e.value === '' || e.value.replace("_", "").length < 19) || this.state.tipoAtendimentoSelecionado === null){
            return 0
        }
        
        let dtSaida = new Date(this.formatarData(e.value))
        let dtEntrada = new Date(this.formatarData(this.state.dataEntrada))
        let timeDiff = Math.abs(dtSaida - dtEntrada);
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1; 
        let horasDias = diffDays * 24;
        let diffMs = (dtSaida - dtEntrada);
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000) + horasDias;
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
        console.log(this.state.dataSaida)
    }
    
    getRequestFuncionarios() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getFuncionarios/')
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
        if((this.state.dataSaida === null || this.state.dataSaida.replace("_", "").length < 19) || this.state.tipoAtendimentoSelecionado === null){
            return 0
        }
        let dtSaida = new Date(this.formatarData(this.state.dataSaida))
        let dtEntrada = new Date(this.formatarData(this.state.dataEntrada))
        
        let timeDiff = Math.abs(dtSaida - dtEntrada);
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1; 
        let horasDias = diffDays * 24;

        let diffMs = (dtSaida - dtEntrada);
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        let diffMins = Math.round(((diffMs) % 86400000 % 3600000) / 60000);
        let diff = (diffHrs + horasDias) + 'h ' + diffMins + 'm'   
        return diff
    }

    getRequestAtendimentos() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getAtendimentos/')
            .then(res =>
                this.setState({ 
                    atendimentos: res.data, 
                    loading: false 
                }),
            );
    }

    fecharAtendimento(){
        if(this.state.selectedAtendimento.statusAtendimento === true){
            alert("Atendimento fechado.")
            return
        }
        this.setRequest()
        let formaPagamento
        if(this.state.formaPagamentoSelecionado != null){
            formaPagamento = this.state.formaPagamentoSelecionado.code
        }
        axios.post('http://localhost:8080/parkingBackend/rest/ws/createFluxoCaixa',
        {
            "idAtendimento": this.state.idAtendimento,
            "valorTotal": this.state.valorTotal,
            "observacao": "Lançamento gerado do atendimento " + this.state.idAtendimento + ". Observação: " + this.state.observacao,
            "idFormaPagamento": formaPagamento,
            "dataTransacao": this.state.dataEntrada,
            "transacao": "ENTRADA"
        })
        .then(response => {     
            console.log(response);
            this.setState=({
                    cliente: '', 
                    vagas: [], 
                    selectedCliente: '', 
                    selectedVaga: '', 
                    dataEntrada: null,
                    dataSaida: null,
                    tipoAtendimentoSelecionado: null,
                    valorBase: 0,
                    valorTotal: 0,
                    funcionario: null
            })            
            this.setRequestAlterarStatusVaga('2')
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

    getRequestFormasDePagamento() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getFormasDePagamento/')
            .then(res =>
                this.setState({
                    formasDePagamento: res.data,
                    loading: false
                }),
            );
    }

    getFormasDePagamento() {
        return this.state.formasDePagamento.map((valor) => (
            { name: valor.nomeDaFormaPagamento, code: valor.idFormaPagamento }
        ))
    }

    async onFormaDePagamentoChange(e) {
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ formaPagamentoSelecionado: e.value }),
            )
        });
        await promise;
    }

    renderInput(){
        const formas = this.getFormasDePagamento();
        const tipos = this.getTiposDeAtendimentos();
        const funcionarios = this.getFuncionarios();
        return (
            <div id="input" className="body">
                
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={() => {this.voltarParaLista()}} label="Voltar"/>
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

                <h3>Cliente *</h3>
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

                <h3>Veiculo *</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.veiculo}
                            options={this.getVeiculos()} 
                            onChange={(e) => {this.setState({veiculo: e.value})}} placeholder="Selecione o Veiculo"/>

                <h3>Tipo de Atendimento *</h3>
                <Dropdown optionLabel="name" 
                            value={this.state.tipoAtendimentoSelecionado}
                            options={tipos} 
                            onChange={(e)=>{this.onDescontoChange(e)}} placeholder="Selecione o Tipo de Atendimento"/>
                
                <h3>Funcionário *</h3>
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
                <Button className="btn_confirmar" label="Cancelar" onClick={()=>{this.voltarParaLista()}} />

                <Dialog 
                    header="Fechar Atendimento" 
                    visible={this.state.visibleFecharAtendimento} 
                    style={{width: '50vw'}}
                    id="dialogFecharAtendimento"
                    modal={true} 
                    onHide={() => this.setState({visibleFecharAtendimento: false})}>
                
                <h3>Data da Transação</h3>
                <InputText 
                    value={this.state.dataEntrada || ''} 
                    className="input2"
                    readOnly
                    onChange={(e) => this.setState({dataEntrada: e.target.value})}/>

                <h3>Valor Total *</h3>
                <InputText
                    value={this.state.valorTotal || ''}
                    className="input2"
                    onChange={(e) => this.setState({ valorTotal: e.target.value })} />
                
                <h3>Forma de Pagamento *</h3>
                <Dropdown optionLabel="name"
                    value={this.state.formaPagamentoSelecionado}
                    options={formas}
                    onChange={(e) => this.setState({ formaPagamentoSelecionado: e.target.value })} placeholder="Selecione a Forma de Pagamento" />
                
                <h3>Transação</h3>
                <InputText 
                    value={"Entrada"} 
                    className="input2"
                    readOnly/>

                <h3>Observação *</h3>
                <InputText
                    value={this.state.observacao || ''}
                    className="input2"
                    onChange={(e) => this.setState({ observacao: e.target.value })} />

                    <div style={{display: 'inline-flex'}}>
                        <Button label="Confirmar" id="confirmarVeiculo" className="btn_confirmar2" onClick={() => this.fecharAtendimento()}/>
                        <Button label="Cancelar" className="btn_confirmar2" onClick={() => this.setState({visibleFecharAtendimento: false})}/>
                    </div>
                </Dialog>

                <Button className="btn_confirmar" label="Fechar Atendimento" onClick={()=>this.mostrarFecharAtendimento()} />
              
            </div>
        )
    }

    mostrarFecharAtendimento(){
        this.setState({
            visibleFecharAtendimento: true,
        })
    }

    limparData(data){
        if(data == null){
            return ''
        }
        return  data.substr(8, 2) + '/' + data.substr(5, 2) + '/' + data.substr(0, 4) + ' ' + data.substr(11, 19)
    }

    mostrarDataEntradaTabela(rowData, column) {
        let data = rowData['dataEntrada']
        if(data == null){
           return <span >Não informado</span>;
        }
        let dtEntrada = data.substr(8, 2) + '/' + data.substr(5, 2) + '/' + data.substr(0, 4) + ' ' + data.substr(11, 19)
        return <span >{dtEntrada}</span>;
    }

    mostrarDataSaidaTabela(rowData, column) {
        let data = rowData['dataSaida']
        if(data == null){
           return <span >Não informado</span>;
        }
        let dtSaida = data.substr(8, 2) + '/' + data.substr(5, 2) + '/' + data.substr(0, 4) + ' ' + data.substr(11, 19)
        return <span >{dtSaida}</span>;
    }

    mostrarStatusTabela(rowData, column) {
        let statusAtendimento = rowData['statusAtendimento']
        if(statusAtendimento === true){
           return <span>Fechado</span>;
        }
        else{
           return <span >Aberto</span>; 
        }
    }
    
    async renderAtendimento(e){
        console.log(e)
        displayInput()
        let atendimentoSelecionado = e

        let eventVeiculoSelecionada = ''
        if(atendimentoSelecionado.veiculo != null){
            eventVeiculoSelecionada = {
                name: atendimentoSelecionado.veiculo.numeroDaPlaca + ' / ' + atendimentoSelecionado.veiculo.corDoCarro,
                code: atendimentoSelecionado.veiculo.idVeiculo
            }    
        }
        
        let eventTipoSelecionado = ''
        if(atendimentoSelecionado.tipoDeAtendimento != null){
            eventTipoSelecionado = {
                name: atendimentoSelecionado.tipoDeAtendimento.nomeDoTipoAtendimento + ' - Desconto de ' + atendimentoSelecionado.tipoDeAtendimento.porcentagemDesconto + '% ',
                code: atendimentoSelecionado.tipoDeAtendimento.idTipoAtendimento, 
                porcentagem: atendimentoSelecionado.tipoDeAtendimento.porcentagemDesconto
            }
        }

        let eventFuncionario = ''
        if(atendimentoSelecionado.funcionario != null){
            eventFuncionario = {                    
                name: atendimentoSelecionado.funcionario.nomeDoFuncionario,
                code: atendimentoSelecionado.funcionario.idFuncionario            
            }
        }
        console.log(eventTipoSelecionado)
        let dtEntrada = this.limparData(atendimentoSelecionado.dataEntrada)
        let dtSaida = this.limparData(atendimentoSelecionado.dataSaida)
        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    idAtendimento: atendimentoSelecionado.idAtendimento,
                    selectedAtendimento: atendimentoSelecionado,
                    selectedVaga: atendimentoSelecionado.vaga,
                    cliente: atendimentoSelecionado.cliente,
                    veiculo: eventVeiculoSelecionada,
                    funcionario: eventFuncionario,
                    dataEntrada: dtEntrada,
                    dataSaida: dtSaida,
                    tipoAtendimentoSelecionado: eventTipoSelecionado,
                    porcentagem: Number.parseInt(eventTipoSelecionado.porcentagem),
                    valorBase: Number.parseFloat(atendimentoSelecionado.vaga.valorBase),                    
                    desconto: (Number.parseFloat(atendimentoSelecionado.vaga.valorBase) * (Number.parseInt(eventTipoSelecionado.porcentagem) / 100)).toFixed(2),
                    valorTotal: Number.parseFloat(atendimentoSelecionado.valorTotal)
                })
            )
        });
        await promise;        
        this.getRequestVeiculosDoCliente();
    }

    voltarParaLista(){
        displayLista()
    }
    
    renderLista(){
        return (
            <div id="lista" className="body">

                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={() => {window.location = '/'}} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Atendimentos</h4>
                    </div>
                </div>

                <DataTable 
                    value={this.state.atendimentos}
                    selectionMode="single"
                    selection={this.state.selectedAtendimento} 
                    emptyMessage="Nenhum atendimento registrado."
                    paginator={true} 
                    responsive={true}
                    rows={20}
                    onRowDoubleClick={(e)=>{this.renderAtendimento(e.data)}}>
                    
                    <Column field="statusAtendimento" body={this.mostrarStatusTabela} header="Status" /> 
                    <Column field="idAtendimento" header="N° Atendimento" />                        
                    <Column field="cliente.nomeDoCliente" header="Cliente" />
                    <Column field="vaga.nomeDaVaga" header="Vaga" />
                    <Column field="dataEntrada" body={this.mostrarDataEntradaTabela} header="Entrada"/>                    
                    <Column field="dataSaida" body={this.mostrarDataSaidaTabela} header="Saída" />
                    <Column field="valorTotal" header="Valor Total" />
                </DataTable>    
            </div>

        )
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

export default Atendimento;