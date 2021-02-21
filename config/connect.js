const Sequelize = require("sequelize");
const connect = new Sequelize(
  "GuiaPerguntas",
  "public_login",
  "Escelsa!2080*",
  {
    host: "10.0.0.5",
    dialect: "mysql",
  }
);
module.exports = connect;
