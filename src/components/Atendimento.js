import React, { Component } from 'react';
import axios from 'axios';

class Atendimento extends Component {

    constructor(props) {
        super(props);

        this.state = {
            atendimentos: [],
            loading: true
        };
    }

    UNSAFE_componentWillMount() {
        this.getRequest();
    }

    getRequest() {
        axios
            .get('http://localhost:8080/estacionamento/rest/ws/getAtendimentos/')
            .then(res =>
                this.setState({ atendimentos: res.data, loading: false }),
            );
    }

    renderAtendimentos() {
        console.log('entrou no render atendimentos');
        console.log('this.state.atendimentos', this.state.atendimentos);
        return this.state.atendimentos.map(valor => (
            <div>
                <h3>{valor.cliente.nomeDoCliente}</h3>
            </div>
        ))
    }

    render() {
        return (
            <div>
                <h1>Atendimento</h1>
                {this.renderAtendimentos()}
            </div>
        );
    }
}

export default Atendimento;