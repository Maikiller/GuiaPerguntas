const express = require("express");
const app = express();
const connect = require("./config/connect");
const Pergunta = require("./config/Pergunta");
const Resposta = require("./config/Resposta");

//banco de dados
connect
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso no Mysql");
  })
  .catch((error) => {
    console.log(error);
  });
//express ja vem com encode const bodyParser = require("body-parser");

//usando o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//codifica html,json para javascript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("pergunta");
});

app.post("/salvarpegunta", (req, res) => {
  var titulo = req.body.titulo;
  var desc = req.body.texto;

  Pergunta.create({
    titulo: titulo,
    descricao: desc,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;

  Pergunta.findOne({
    where: { id: id },
  }).then((perguntas) => {
    if (perguntas != undefined) {
      Resposta.findAll({
        where: { perguntaID: perguntas.id },
        order:[['id','DESC']]
      }).then((resposta) => {
        res.render("perguntas", {
          perguntas: perguntas,
          resposta: resposta,
        }); // id encontrada
      });
    } else {
      res.redirect("/"); // não encontrada
    }
  });
});

app.post("/responder", (req, res) => {
  var corpoBody = req.body.corpo;
  var id = req.body.idPergunta;
  Resposta.create({
    corpo: corpoBody,
    perguntaID: id,
  }).then(() => {
    res.redirect("pergunta/" + id);
  });
});

app.listen(80, (req, res) => {
  console.log("Servidor");
});
