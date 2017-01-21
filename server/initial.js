Meteor.startup(function () {
	if (Users.find().count() == 0) {
		[{
			username: "John",
      about: "Pretty gaaay.",
      objective: "hack the planet"
		}].forEach(function (entry) {
		Users.insert(entry);
		});
	}
});
