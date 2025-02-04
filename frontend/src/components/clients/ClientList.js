import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5002/clients')
  .then((response) => {
    setClients(response.data);
    setError(null);
  })
  .catch((error) => {
    console.error('Erro ao buscar clientes:', error);
    setError(`Não foi possível conectar ao banco de dados: ${error.message}`);
  })
  .finally(() => {
    setIsLoading(false);
  });
  }, []);

  return (
    <div className="ClientList">
      <h1>Clientes</h1>
      {isLoading ? (
        <p>Carregando clientes...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : clients.length === 0 ? (
        <p>Não há clientes disponíveis no momento.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.name} - {client.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientList;