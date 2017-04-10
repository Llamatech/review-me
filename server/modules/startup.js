/* global Modules, BrowserPolicy */

let startup = () => {
    Modules.server.setEnvironmentVariables();
    _setBrowserPolicies();
    Modules.server.configureServices();
    Modules.server.generateAccounts();
    Modules.server.startjobs();
};

var _setBrowserPolicies = () => {
    BrowserPolicy.content.allowOriginForAll( '*' );
};

Modules.server.startup = startup;