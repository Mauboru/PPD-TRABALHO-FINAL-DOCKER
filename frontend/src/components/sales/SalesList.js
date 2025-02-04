import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5003/sales')
      .then((response) => {
        setSales(Array.isArray(response.data) ? response.data : []);
        setError(null);
      })
      .catch((error) => {
        console.error('Erro ao buscar vendas:', error);
        setError(`Não foi possível conectar ao banco de dados: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="SalesList">
      <h1>Vendas</h1>
      {isLoading ? (
        <p>Carregando vendas...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (!Array.isArray(sales) || sales.length === 0) ? (
        <p>Não há vendas registradas no momento.</p>
      ) : (
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              Produto: {sale.product_id} - Cliente: {sale.client_id} - Total: {sale.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalesList;