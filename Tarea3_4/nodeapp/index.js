const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
// Constants
const PORT = 3000;

//Public directory
app.use(express.static('public'));

//Middlewares
app.use(express.json());
app.use(cors());

// App
const server = require('http').createServer(app);



//Redirect to public dir
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});