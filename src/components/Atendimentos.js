import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import { classes } from 'istanbul-lib-coverage';
class Atendimento extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            atendimentos: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getRequest();
    }

    getRequest() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getAtendimentos/')
            .then(res =>
                this.setState({ 
                    atendimentos: res.data, 
                    loading: false 
                }),
            );
    }

    renderAtendimentos() {
        console.log('entrou no render atendimentos');
        console.log('this.state.atendimentos', this.state.atendimentos);
        return this.state.atendimentos.map((valor, i) => (
            <li key={i}>{valor.valorBase}</li>
        ))
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="body">
                    <h1>Atendimento</h1>
                    {this.renderAtendimentos()}
                </div>

            </div>
        );
    }
}

export default Atendimento;