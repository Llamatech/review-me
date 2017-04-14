/* global Modules */

let startup = () => {
    Modules.server.setEnvironmentVariables();
    _setBrowserPolicies();
    Modules.server.configureServices();
    Modules.server.generateAccounts();
    Modules.server.startjobs();
};

var _setBrowserPolicies = () => {
    // BrowserPolicy.content.allowOriginForAll( '*' );
    // BrowserPolicy.content.allowEval();
};

Modules.server.startup = startup;