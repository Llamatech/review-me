'use strict';

// Declare more modules here.
const Project = require('../models/project');

// HTTP endpoints declaration.
module.exports = function(app) {
    app.get('/projects', Project.list);
    // app.get('/projects/:id', Project.get);
    // app.delete('/projects/:id', Project.remove);
    app.post('/projects', Project.create);
    // app.post('/projects', Project.create);
}
