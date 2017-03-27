// Meteor.publish( 'user', function() {
//   return Meteor.users.find( this.userId, {
//     fields: {
//       "services.facebook.email": 1,
//       "services.github.email": 1,
//       "services.google.email": 1,
//       "services.twitter.screenName": 1,
//       "emails": 1,
//       "profile": 1
//     }
//   });
// });

Meteor.methods({
  'getUserData': () => {
    console.log("Ah?");
    console.log(Meteor.userId());
      return Meteor.users.findOne({_id:Meteor.userId()});
  }
})