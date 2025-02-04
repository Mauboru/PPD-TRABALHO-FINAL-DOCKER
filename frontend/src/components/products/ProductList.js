import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/products')
      .then((response) => {
        setProducts(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setError('Não foi possível conectar ao banco de dados.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="ProductList">
      <h1>Produtos</h1>
      {isLoading ? (
        <p>Carregando produtos...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p>Não há produtos disponíveis no momento.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} BRL
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;