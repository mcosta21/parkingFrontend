import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class Breadcrumb extends Component {
  
    render() {
        return (
            <div className="bread">
                <div>
                    <Link className="title_bread" to="/"><h5>Voltar</h5></Link>
                </div>
                <div>
                    <h4>{this.props.title}</h4>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;