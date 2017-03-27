import { Meteor } from 'meteor/meteor';
import '../imports/api/projects.js';
import {} from "../imports/api/methods.js";




Meteor.startup(() => {
  // code to run on server at startup
    Modules.server.startup()
});
