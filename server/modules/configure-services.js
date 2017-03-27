const services = Meteor.settings.private.oAuth;

const configure = () => {
  if ( services ) {
    for( let service in services ) {
        console.log(service);
      ServiceConfiguration.configurations.upsert( { service: service }, {
        $set: services[ service ]
      });
    }
  }
};

Modules.server.configureServices = configure;
