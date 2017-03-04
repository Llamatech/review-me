const thinky = require('../db');

const r = thinky.r;
const type = thinky.type;


var Estudiante = thinky.createModel('Estudiante', {
  nombre: type.string(),
  codigo: type.string(),
  nota: type.string()
});

exports.Estudiante = Estudiante;


exports.list = (req, res) => {
  Estudiante
  .run()
  .then(estudiantes => {
    res.json(estudiantes);
  })
  .error(err => {
    res.status(500);
    res.send();
  })
}

exports.get = (req, res) => {
  Estudiante
  .get(req.params.id)
  .then(estudiante => {
    res.json(estudiante);
  })
  .error(err => {
    res.status(404);
    res.send();
  })
}

exports.add = (req, res) => {
  var estudiante = new Estudiante(req.body);
  estudiante.save().then(result => {
    res.json(estudiante);
  }).error(err => {
    console.log(err);
    res.status(500);
    res.send();
  })
}

exports.delete = (req, res) => {
  Estudiante.get(req.params.id).then(estudiante => {
    estudiante.delete().then(result => {
      console.log(result);
      res.status(200);
      res.send();
    }).error(err => {
      console.log(err);
      res.status(500);
      res.send();
    })
  })
}
