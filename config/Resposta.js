const Sequelize = require("sequelize");
const connect = require("./connect");

const Resposta = connect.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });
module.exports = Resposta;
