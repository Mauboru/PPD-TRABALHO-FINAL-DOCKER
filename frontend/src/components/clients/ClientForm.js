import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/clients', {
        name,
        phone,
      });
      setMessage('Cliente cadastrado com sucesso!');
      setName('');
      setPhone('');
    } catch (error) {
      setMessage('Erro ao cadastrar o cliente: ' + error.message);
    }
  };

  return (
    <div className="ClientForm">
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Telefone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Cadastrar Cliente</button>
      </form>
      {message && (
        <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>
      )}
    </div>
  );
};

export default ClientForm;