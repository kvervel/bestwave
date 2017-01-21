Meteor.startup(function () {
  Users.remove({});
  Messages.remove({});
        [{
            username: "pussyLicker69",
            about: "Here to fuck and suck, and he's all out of fuck",
            objective: "get the bitches"
        },
		{
			username: "John",
			about: "Pretty gaaay.",
			objective: "hack the planet"
		}].forEach(function (entry) {
            Users.insert(entry);
        });
});
