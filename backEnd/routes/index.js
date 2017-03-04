// const Estudiante = require('../models/estudiante');
const Project = require('../models/project');

module.exports = function(app) {
    app.get('/', Project.get);
  // app.get('/estudiantes', Estudiante.list);
  // app.get('/estudiantes/:id', Estudiante.get);
  // app.post('/estudiantes', Estudiante.add);
  // app.delete('/estudiantes/:id', Estudiante.delete);
}
