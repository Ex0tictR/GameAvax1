const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Corregido: body-Parser -> body-parser
const port = 3000;

// Middleware para analizar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const data = req.body; // Corregido: `body` no está definido, usa `req.body` para acceder al cuerpo de la solicitud
    res.send({ message: 'Hello World!', data }); // Corregido: `res.send` acepta un objeto para enviar datos en formato JSON
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
