class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,'
            + ' cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, '
            + 'data datetime NOT NULL, dataCriacao datetime NOT NULL, '
            + 'status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

        this.conexao.query(sql, err => {
            if(err) {
                console.log(err);
            } else {
                console.log('Tabela atendimentos criada com sucesso!');
                /* this.conexao.query(); */
            }
        });
    }
}

module.exports = new Tabelas;