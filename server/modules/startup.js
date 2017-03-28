// import { BrowserPolicy } from 'meteor/meteor';

let startup = () => {
  Modules.server.setEnvironmentVariables();
  _setBrowserPolicies();
  Modules.server.configureServices();
  Modules.server.generateAccounts();
  Modules.server.startjobs();
};

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll( '*' );
  // BrowserPolicy.content.allowOriginForAll( '*.youtube.com' );
};

Modules.server.startup = startup;