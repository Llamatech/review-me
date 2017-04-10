/* global WebApp, Modules */

import { Meteor } from 'meteor/meteor';
import '../imports/api/projects.js';




Meteor.startup(() => {
  // code to run on server at startup
    WebApp.addHtmlAttributeHook(function() {
        return {
            'lang': 'eng'
        };
    });
    Modules.server.startup();
});
