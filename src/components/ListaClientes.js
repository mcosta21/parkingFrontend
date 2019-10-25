import React, { Component } from 'react';
import { DataTable, Column } from 'primereact/datatable';
import Header from './Header.js'
import Breadcrumb from './Breadcrumb.js'

class ListaClientes extends Component {

    onNovoClienteClick(){
        window.location = '/cadastroCliente'
    }

    render() {
        return (
            <div>
                <Header />
                <Breadcrumb caminho="/" title="Clientes" />
                <DataTable>
                    <Column field="vin" header="Nome" />
                    <Column field="year" header="Tipo" />
                    <Column field="brand" header="Veículo" />
                </DataTable>
            </div>
        );
    }
}

export default ListaClientes;