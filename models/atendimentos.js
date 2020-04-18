// Serve para formatar as datas
const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res) {
        /* const dataCriacao = new Date(); */
        /* const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS'); */
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        /* const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS'); */
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        // Usando uma função que compara duas datas e verifica se ela é ou igual ou depois da outra
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        // Só retorna se for válido
        const erros = validacoes.filter(campo => !campo.valido);
        // if = 0 não existem erros
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            // ? = O que colocarmos aqui vai ser adicionado a tabela
            const sql = 'INSERT INTO Atendimentos SET ?';
            
            conexao.query(sql, atendimentoDatado, (err, resultados) => {
                if(err) {
                    res.status(400).json(err);
                } else {
                    // Retonando o que foi cadastrado
                    res.status(201).json(atendimento);
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (err, resultados) => {
            if(err) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscarPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (err, resultados) => {
            // Estamos devolvendo apenas o objeto, já que ele retona um array completo com apenas um valor
            const atendimento = resultados[0];
            if(err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        // Como estamos com duas incógnitas ali em cima (não sabemos qual vai ser o valor), estamos passando um array no query
        conexao.query(sql, [valores, id], (err, resultados) => {
            if(err) {
                res.status(400).json(err);
            } else {
                // Mostrando os valores que foram alterados e quem foi alterado
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (err, resultados) => {
            if(err) {
                res.status(400).json(err);
            } else {
                // Informando o ID que foi deletado
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;