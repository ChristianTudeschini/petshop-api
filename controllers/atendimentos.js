const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        // O .params vai puxar o nome do parametro e o valor
        /* console.log(req.params); */
        const id = parseInt(req.params.id);
        
        Atendimento.buscarPorId(id, res);
        /* res.send('OK'); */
    })

    app.post('/atendimentos', (req, res) => {
        console.log('Atendimento enviado')
        console.log(req.body);
        
        const atendimento = req.body;

        Atendimento.adiciona(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    });
}