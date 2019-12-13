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

class Clientes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            loading: true,
            selectedCliente: null,
            nomeDoCliente: null,
            cpfDoCliente: null,
            rgDoCliente: null,
            enderecoDoCliente: null,
            sexoDoCliente: null,
            dataDeNascimento: null,
            tipoCliente: null,
            situacaoCliente: null,
            ufSelecionada: null,
            ufs: [],
            municipios: [],
            municipioSelecionado: null,
            bairros: [],
            bairroSelecionado: null,
            numeroDaPlaca: null,
            corDoCarro: null,
            veiculos: [],
            selectedVeiculo: null,
            visibleVeiculos: false,
        };
        this.onUfChange = this.onUfChange.bind(this);
        this.onMunicipioChange = this.onMunicipioChange.bind(this);
    }

    componentDidMount() {
        this.getRequestClientes();
        this.getRequestUfs()
    }

    setRequest() {
        let bairro
        if(this.state.bairroSelecionado != null){
            bairro = this.state.bairroSelecionado.code
        }
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarCliente',
            {   
                "idCliente": this.state.selectedCliente.idCliente,
                "nomeDoCliente": this.state.nomeDoCliente,
                "cpfDoCliente": this.state.cpfDoCliente,
                "rgDoCliente": this.state.rgDoCliente,
                "sexoDoCliente": this.state.sexoDoCliente,
                "enderecoDoCliente": this.state.enderecoDoCliente,
                "dataDeNascimento": this.state.dataDeNascimento,
                "tipoCliente": this.state.tipoCliente,
                "situacaoCliente": this.state.situacaoCliente,
                "bairro": bairro,
                "veiculos": this.state.veiculos
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoCliente: null,
                    cpfDoCliente: null,
                    rgDoCliente: null,
                    enderecoDoCliente: null,
                    sexoDoCliente: null,
                    dataDeNascimento: null,
                    tipoCliente: null,
                    situacaoCliente: null,
                    ufSelecionada: null,
                    municipios: [],
                    municipioSelecionado: null,
                    bairros: [],
                    bairroSelecionado: null,
                    veiculos: [],
                })
                if(response.status === 200){
                    alert(response.data);
                    window.location = '/clientes'
                }
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response);
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
        this.getRequestBairros();
    }

    getRequestBairros() {
        axios
            .get('http://localhost:8080/parkingBackend/rest/ws/getBairrosPorMunicipio/' + this.state.municipioSelecionado.code)
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

    isDisabledVeiculo(){
        if(this.state.selectedVeiculo == null){
            return true
        }
        else{
            return false
        }
    }

    adicionarVeiculo(){
        displayBotaoConfirmarVeiculo()
        this.setState({
            visibleVeiculos: true,
            selectedVeiculo: null
        })
    }

    setRequestVeiculo(){
        axios.post('http://localhost:8080/parkingBackend/rest/ws/createVeiculo',
        {
            "numeroDaPlaca": this.state.numeroDaPlaca,
            "corDoCarro": this.state.corDoCarro,
        })
        .then(response => {
            console.log(response.data)
            this.atualizarListaVeiculos(response.data)
        }, )
        .catch(error => {
            console.log(error.response)
            alert(error.response.data);
        })        
    }

    atualizarListaVeiculos(veiculo){
        let tempVeiculos = this.state.veiculos
        tempVeiculos.push(veiculo)
        alert("Veiculo cadastrado com sucesso")
        this.setState({
            visibleVeiculos: false,
            veiculo: null,                
            corDoCarro: null,
            numeroDaPlaca: null,
            veiculos: tempVeiculos
        })
        console.log(tempVeiculos)
    }

    excluirVeiculo(){
        if(this.state.selectedVeiculo == null){
            return
        }
        this.removerVeiculoPorId(this.state.selectedVeiculo.idVeiculo);
        let veiculosAtualizados = []
        for(let i = 0; i < this.state.veiculos.length; i++){
            if(this.state.veiculos[i].idVeiculo !== this.state.selectedVeiculo.idVeiculo) veiculosAtualizados.push(this.state.veiculos[i])
        }
        this.setState({
            veiculos: veiculosAtualizados
        })
    }

    editarVeiculo(){
        if(this.state.selectedVeiculo == null){
            return
        }
        displayBotaoEditarVeiculo()
        let placa = this.state.selectedVeiculo.numeroDaPlaca
        let cor = this.state.selectedVeiculo.corDoCarro
        
        this.setState({
            numeroDaPlaca: placa,
            corDoCarro: cor,
            visibleVeiculos: true
        })
    }

    setRequestEditarVeiculo(){
        axios.post('http://localhost:8080/parkingBackend/rest/ws/editarVeiculoPorId/',
        {   
            "idVeiculo": this.state.selectedVeiculo.idVeiculo,
            "numeroDaPlaca": this.state.numeroDaPlaca,
            "corDoCarro": this.state.corDoCarro,
        })
        .then(response => {
            console.log(response)
            let veiculosAtualizados = []
            for(let i = 0; i < this.state.veiculos.length; i++){
                if(this.state.veiculos[i].idVeiculo !== this.state.selectedVeiculo.idVeiculo) veiculosAtualizados.push(this.state.veiculos[i])
            }
            let tempVeiculo = {
                "idVeiculo": this.state.selectedVeiculo.idVeiculo,
                "numeroDaPlaca": this.state.numeroDaPlaca,
                "corDoCarro": this.state.corDoCarro,
            }
            console.log(tempVeiculo)
            veiculosAtualizados.push(tempVeiculo)
            this.setState({
                veiculos: veiculosAtualizados                
            })
        }, this.setState({ visibleVeiculos: false }))
        .catch(error => {
            console.log(error.response)
            alert(error.response);
        })     
    }

    removerVeiculoPorId(id){
        axios.post('http://localhost:8080/parkingBackend/rest/ws/removerVeiculoPorId/' 
            + id)
        .then(
            alert("Veiculo removido com sucesso.")
        )
        .catch(error => {
            console.log(error.response)
            alert(error.response.data);
        })        
    }

    async removerTodosVeiculos(){
        if(this.state.veiculos.length === 0){
            window.location = '/'
            return
        }

        for(let i = 0; i < this.state.veiculos.length; i++){            
            await this.removerVeiculoPorId(this.state.veiculos[i].idVeiculo);
        }
        window.location = '/'
    }

    voltarParaLista(){
        displayLista()
    }

    renderInput() {
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
            <div id="input" className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{this.voltarParaLista()}} label="Voltar"/>
                    </div>
                    <div>
                        <h4>Cliente</h4>
                    </div>
                </div>

                <h3>Nome *</h3>
                <InputText
                    value={this.state.nomeDoCliente || ''}
                    className="input"
                    onChange={(e) => this.setState({ nomeDoCliente: e.target.value })} />

                <h3>CPF *</h3>
                <InputMask
                    mask="999.999.999-99"
                    className="input"
                    value={this.state.cpfDoCliente || ''}
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

                <h3>Sexo *</h3>
                <Dropdown value={this.state.sexoDoCliente}
                    options={sexo}
                    onChange={(e) => { this.setState({ sexoDoCliente: e.target.value }) }} placeholder="Selecione o Sexo" />

                <h3>Data de Nascimento *</h3>
                <InputMask
                    mask="99/99/9999"
                    className="input"
                    value={this.state.dataDeNascimento || ''}
                    onChange={(e) => this.setState({ dataDeNascimento: e.target.value })} />

                <h3>Tipo do Cliente *</h3>
                <Dropdown value={this.state.tipoCliente}
                    options={tipo}
                    onChange={(e) => { this.setState({ tipoCliente: e.target.value }) }} placeholder="Selecione o Tipo do Cliente" />

                <h3>Situação *</h3>
                <Dropdown value={this.state.situacaoCliente}
                    options={situacao}
                    onChange={(e) => { this.setState({ situacaoCliente: e.target.value }) }} placeholder="Selecione a Situação do Cliente" />

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

                <div className="painel_veiculos_cliente">
                    <div>
                        <h2>Veículos</h2>
                    </div>
                    <div className="painel_veiculos_btns">
                        <Button label="Adicionar" className="btn_confirmar2" onClick={()=>{this.adicionarVeiculo()}} />
                        <Button label="Editar" disabled={this.isDisabledVeiculo()} className="btn_confirmar2" onClick={()=>{this.editarVeiculo()}} />
                        <Button label="Excluir" disabled={this.isDisabledVeiculo()} className="btn_confirmar2" onClick={()=>{this.excluirVeiculo()}} />
                    </div>
                   
                </div>

                <Dialog 
                    header="Veiculos" 
                    visible={this.state.visibleVeiculos} 
                    style={{width: '50vw'}}
                    modal={true} 
                    onHide={() => this.setState({visibleVeiculos: false})}>

                    <h3>Placa do Veículo</h3>
                    <InputMask
                        mask="***-9*99"
                        value={this.state.numeroDaPlaca || ''}
                        className="input2"
                        onChange={(e) => this.setState({ numeroDaPlaca: e.target.value })} />

                    <h3>Cor do Veículo</h3>
                    <InputText
                        value={this.state.corDoCarro || ''}
                        className="input2"
                        onChange={(e) => this.setState({ corDoCarro: e.target.value })} />
                    <div style={{display: 'inline-flex'}}>
                        <Button label="Confirmar" id="confirmarVeiculo" className="btn_confirmar2" onClick={() => this.setRequestVeiculo()}/>
                        <Button label="Confirmar2" id="editarVeiculo" className="btn_confirmar2" onClick={() => this.setRequestEditarVeiculo()}/>
                        <Button label="Cancelar" className="btn_confirmar2" onClick={() => this.setState({visibleVeiculos: false})}/>
                    </div>
                </Dialog>
                
                <DataTable 
                    value={this.state.veiculos}
                    selectionMode="single"
                    selection={this.state.selectedVeiculo} 
                    emptyMessage="Nenhum veiculo registrado."
                    onSelectionChange={e => this.setState({selectedVeiculo: e.value})}>
                    <Column field="numeroDaPlaca" header="Placa Do Veiculo" />                        
                    <Column field="corDoCarro" header="Cor do Veiculo" />
                </DataTable>
                
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
                            <h4>Clientes</h4>
                        </div>
                    </div>

                    <DataTable 
                        value={this.state.clientes}
                        selectionMode="single"
                        selection={this.state.selectedCliente} 
                        emptyMessage="Nenhum cliente registrado."
                        paginator={true} 
                        responsive={true}
                        rows={20}
                        onRowDoubleClick={(e)=>{this.renderCliente(e.data)}}>

                        <Column  field="idCliente" header="ID" />  
                        <Column  field="nomeDoCliente" header="NOME" />    
                        <Column  field="cpfDoCliente" header="CPF" />      
                        <Column  field="tipoCliente" header="TIPO" />     
                        <Column  field="situacaoCliente" header="SITUAÇÃO" />    
                        <Column  field="bairro.municipio.nomeDoMunicipio" header="Município" />   
                        <Column  field="bairro.municipio.uf.nomeDaUf" header="Uf" />        
                    </DataTable>
                </div>

        )
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

    formatarData(data){

    }

    async renderCliente(e){
        console.log(e)
        displayInput()
        let clienteSelecionado = e
        let dataDeNascimento = new Date(clienteSelecionado.dataDeNascimento);
        let eventBairroSelecionado
        let eventMunicipioSelecionado
        let evenUfSelecionada

        if(clienteSelecionado.bairro != null){
            eventBairroSelecionado = {
                name: clienteSelecionado.bairro.nomeDoBairro,
                code: clienteSelecionado.bairro.idBairro
            }

            evenUfSelecionada = {
                name: clienteSelecionado.bairro.municipio.uf.nomeDaUf,
                code: clienteSelecionado.bairro.municipio.uf.idUf
            }
    
            eventMunicipioSelecionado = {
                name: clienteSelecionado.bairro.municipio.nomeDoMunicipio,
                code: clienteSelecionado.bairro.municipio.idMunicipio
            }
        }        

        let promise = new Promise((resolve) => {
            resolve(
                this.setState({ 
                    selectedCliente: clienteSelecionado,
                    nomeDoCliente: clienteSelecionado.nomeDoCliente,
                    cpfDoCliente: clienteSelecionado.cpfDoCliente,
                    rgDoCliente: clienteSelecionado.rgDoCliente,
                    enderecoDoCliente: clienteSelecionado.enderecoDoCliente,
                    sexoDoCliente: clienteSelecionado.sexoDoCliente,
                    dataDeNascimento: dataDeNascimento.toLocaleDateString(),
                    tipoCliente: clienteSelecionado.tipoCliente,
                    situacaoCliente: clienteSelecionado.situacaoCliente,
                    veiculos: clienteSelecionado.veiculos,
                    ufSelecionada: evenUfSelecionada,
                    municipioSelecionado: eventMunicipioSelecionado,
                    bairroSelecionado: eventBairroSelecionado
                
                })
            )
        });
        await promise;
        
        if(clienteSelecionado.bairro != null){
            this.getRequestMunicipios()
            this.getRequestBairros()
        }
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

function displayBotaoConfirmarVeiculo(){
    let confirmar = document.getElementById('confirmarVeiculo')
    confirmar.style.display = 'block'
    let editar = document.getElementById('editarVeiculo')
    editar.style.display = 'none'
}

function displayBotaoEditarVeiculo(){
    let confirmar = document.getElementById('confirmarVeiculo')
    confirmar.style.display = 'none'
    let editar = document.getElementById('editarVeiculo')
    editar.style.display = 'block'
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

export default Clientes;

