
const { startBot } = require('./index.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

startBot();

app.get('/', (req, res) => {
  res.send('Turnocinante is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));