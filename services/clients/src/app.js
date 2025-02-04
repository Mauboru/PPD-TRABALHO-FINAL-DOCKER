const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientsRoutes = require('./routes/clients');
const { sequelize } = require('./models/client');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/clients', clientsRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => console.log(`Clients service running on port ${PORT}`));
});