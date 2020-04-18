const express = require('express');
// Consing serve para agrupar as rotas
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    // .use serve para indicar o que o app vai poder usar de bibliotecas externas
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .into(app);

    return app;
}