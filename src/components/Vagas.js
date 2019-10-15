import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import { classes } from 'istanbul-lib-coverage';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import { Link } from 'react-router-dom'
import AtendimentoInput from './AtendimentoInput.js'

class Vagas extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            vagas: [],
            selectedVaga: '',
            loading: true,
            caminho: '/vagasDisponiveis'
        };
    }

    componentDidMount() {
        this.getRequestVagas();
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
        this.setState({selectedVaga: vaga.valor.idVaga, caminho: '/atendimento'});
        console.log(vaga.valor.idVaga);
    }

    renderVagas(){
        return this.state.vagas.map((valor, i) => (
            <Button label={valor.nomeDaVaga} key={i} className="fieldVaga" onClick={() => this.selectVaga({valor})}></Button>
        ))
    }


    render() {
        return (
            <div>
                <Header/>
                <div className="body">
                    <Breadcrumb title="Vagas Disponiveis"/>
                    <div className="listaVagas">
                        {this.renderVagas()}
                    </div>
                    <div className="panel_opcoes">    
                        <Link to={this.state.caminho}>
                            <Button className="btn_confirmar" disabled={!this.state.selectedVaga} label="Confirmar"/>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default Vagas;