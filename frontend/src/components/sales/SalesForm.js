import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesForm = () => {
  const [product, setProduct] = useState(''); 
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });

    axios.get('http://localhost:5002/clients')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  }, []);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setProduct(selectedProductId); 
    const selectedProduct = products.find((p) => String(p.id) === String(selectedProductId));

    if (selectedProduct) {
      setPrice(selectedProduct.price);
      setTotal(quantity * selectedProduct.price);
    } else {
      console.log('Produto não encontrado');
      setPrice('');
      setTotal(0);
    }
  };
  
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    if (newQuantity && price) {
      setTotal(newQuantity * price);
    } else {
      setTotal(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product || !quantity || !clientId) {
      setMessage('Por favor, preencha todos os campos antes de submeter a venda!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5003/sales', {
        product_id: product,
        quantity: parseInt(quantity),
        unit_price: parseFloat(price),
        total: total,
        client_id: clientId,
      });

      setMessage('Venda cadastrada com sucesso!');
      setProduct('');
      setClientId('');
      setQuantity('');
      setPrice('');
      setTotal(0);
    } catch (error) {
      console.error('Erro ao cadastrar a venda:', error);
      setMessage('Erro ao cadastrar a venda: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="SalesForm">
      <h2>Cadastrar Venda</h2>
      <form onSubmit={handleSubmit}>
        <label>Cliente:</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map((cli) => (
            <option key={cli.id} value={cli.id}>
              {cli.name}
            </option>
          ))}
        </select>

        <label>Produto:</label>
        <select
          value={product}
          onChange={handleProductChange}
          required
        >
          <option value="">Selecione um produto</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          required
        />

        <label>Preço Unitário:</label>
        <input
          type="number"
          value={price}
          readOnly
        />

        <label>Total:</label>
        <input
          type="number"
          value={total}
          readOnly
        />

        <button type="submit">Cadastrar Venda</button>
      </form>
      {message && (
        <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>
      )}
    </div>
  );
};

export default SalesForm;