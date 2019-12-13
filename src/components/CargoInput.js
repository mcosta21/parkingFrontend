import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js'
import '../App.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

class CargoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            nomeDoCargo: null,
        };
    }

    componentDidMount() {
    }

    setRequest() {
        axios.post('http://localhost:8080/parkingBackend/rest/ws/createCargo',
            {
                "nomeDoCargo": this.state.nomeDoCargo,
            })
            .then(response => {
                console.log(response);
                this.setState = ({
                    nomeDoCargo: null,
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
        return (
            <div className="body">
                <div className="bread">
                    <div>
                        <Button className="button_bread" onClick={()=>{window.location="/"}}label="Voltar"/>
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

export default CargoInput;
