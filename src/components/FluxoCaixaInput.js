import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';

class FluxoCaixaInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            valorTotal: null,
            dataTransacao: null,
            observacao: null,
            formasDePagamento: [],
            formaPagamentoSelecionado: null,
            transacaoSelecionada: null
        };
    }

    componentDidMount() {
        this.getRequestFormasDePagamento()
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

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/createFluxoCaixa',
            {
                "valorTotal": this.state.valorTotal,
                "observacao": this.state.observacao,
                "idFormaPagamento": this.state.formaPagamentoSelecionado.code,
                "dataTransacao": this.state.dataTransacao,
                "transacao": this.state.transacaoSelecionada
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    valorTotal: null,
                    dataTransacao: null,
                    observacao: null,
                    formaPagamentoSelecionado: null,
                    transacaoSelecionada: null
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

    renderInput() {
        const formas = this.getFormasDePagamento();
        const transacao = [
            { label: 'Entrada', value: 'ENTRADA' },
            { label: 'Saida', value: 'SAIDA' }
        ];
        return (
            <div className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{window.location="/"}}label="Voltar"/>
                    </div>
                    <div>
                        <h4>Lançamento</h4>
                    </div>
                </div>

                <h3>Data da Transação *</h3>
                <InputMask
                    mask="99/99/9999 99:99:99"
                    className="input"
                    value={this.state.dataTransacao}
                    onChange={(e) => this.setState({ dataTransacao: e.target.value })} />

                <h3>Valor Total *</h3>
                <InputText
                    value={this.state.valorTotal || ''}
                    className="input"
                    onChange={(e) => this.setState({ valorTotal: e.target.value })} />
                
                <h3>Forma de Pagamento *</h3>
                <Dropdown optionLabel="name"
                    value={this.state.formaPagamentoSelecionado}
                    options={formas}
                    onChange={(e) => this.setState({ formaPagamentoSelecionado: e.target.value })} placeholder="Selecione a Forma de Pagamento" />
                
                <h3>Transação *</h3>
                <Dropdown value={this.state.transacaoSelecionada}
                    options={transacao}
                    onChange={(e) => { this.setState({ transacaoSelecionada: e.target.value }) }} placeholder="Selecione a Transação" />

                <h3>Observação *</h3>
                <InputText
                    value={this.state.observacao || ''}
                    className="input"
                    onChange={(e) => this.setState({ observacao: e.target.value })} />

                
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

export default FluxoCaixaInput;
