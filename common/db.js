Messages = new Mongo.Collection("messages");
Users = new Mongo.Collection("users");

Meteor.startup(function () {
	if (Users.find().count() == 0) {
    [{
			username: "John",
      about: "Pretty gaaay.",
      objective: "hack the planet"
		}]
  }
});
