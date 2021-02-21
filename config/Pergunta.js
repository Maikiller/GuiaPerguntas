const Sequelize = require("sequelize");
const connect = require("./connect");

const Pergunta = connect.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {});
module.exports = Pergunta;
