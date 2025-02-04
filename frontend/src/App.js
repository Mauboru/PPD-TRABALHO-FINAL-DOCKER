import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import SalesList from './components/sales/SalesList';  
import SalesForm from './components/sales/SalesForm';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>SISTEMA DE MICROSERVIÇOS - PPD</h1>
          <nav>
            <ul className="menu">
              <li><Link to="/products">Produtos</Link></li>
              <li><Link to="/sales">Vendas</Link></li>
              <li><Link to="/clients">Clientes</Link></li>
            </ul>
          </nav>
        </header>
        
        <Routes>
          <Route path="/products" element={
            <main>
              <ProductForm />
              <ProductList />
            </main>
          } />
          <Route path="/clients" element={
            <main>
              <ClientForm />
              <ClientList />
            </main>
          } />
          <Route path="/sales" element={
            <main>
              <SalesForm />
              <SalesList />
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;