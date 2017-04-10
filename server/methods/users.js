/* global Meteor */

Meteor.methods({
    'getUserData': () => {
    // console.log("Ah?");
    // console.log(Meteor.userId());
        return Meteor.users.findOne({_id:Meteor.userId()});
    }
});