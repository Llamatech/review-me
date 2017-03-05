'use strict';

// Declare more modules here.
const Project = require('../models/project');
const Rating = require('../models/rating');
const Comment = require('../models/comment');

// HTTP endpoints declaration.
module.exports = function(app) {
    app.get('/projects', Project.list);
    app.get('/projects/:id', Project.list);
    app.post('/projects', Project.create);
    app.post('/ratings', Rating.publish);
    app.post('/comments', Comment.comment);
}
