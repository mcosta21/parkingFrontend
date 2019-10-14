import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class Breadcrumb extends Component {
  
    render() {
        return (
            <div className="bread">
                <Link to="/">Voltar</Link>
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default Breadcrumb;