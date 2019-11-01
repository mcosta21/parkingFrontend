import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb.js'
import '../App.css';
import {Button} from 'primereact/button';
import { Link } from 'react-router-dom'

class Vagas extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            vagas: [],
            selectedVaga: '',
            loading: true,
            caminho: '/vagasDisponiveis',
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
        console.log(this.state.selectedVaga);
    }

    renderVagas(){
        return this.state.vagas.map((valor, i) => (
            <Button label={valor.nomeDaVaga} key={i} className="fieldVaga" onClick={() => this.selectVaga({valor})}></Button>
        ))
    }

    render() {
        return (
            <div>
                <div className="body">
                    <Breadcrumb caminho="/" title="Vagas Disponiveis"/>
                    <div className="listaVagas">
                        {this.renderVagas()}
                    </div>
                    <div className="panel_opcoes">    
                        <Link to={this.state.caminho}>
                            <Button className="btn_confirmar" label="Confirmar"/>
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default Vagas;