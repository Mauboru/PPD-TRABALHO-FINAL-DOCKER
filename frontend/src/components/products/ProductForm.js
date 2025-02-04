import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/products', {
        name,
        description,
        price: parseFloat(value),
      });
      setMessage('Produto cadastrado com sucesso!');
      setName('');
      setDescription('');
      setValue('');
    } catch (error) {
      setMessage('Erro ao cadastrar o produto: ' + error.message);
    }
  };

  return (
    <div className="ProductForm">
    <h2>Cadastrar Produto</h2>
    <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <label>Descrição:</label>
        <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />
        <label>Valor:</label>
        <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        />
        <button type="submit">Cadastrar Produto</button>
    </form>
    {message && <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default ProductForm;
