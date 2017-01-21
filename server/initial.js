Meteor.startup(function () {
  Users.remove({});
  Messages.remove({});
        [{
            username: "pussyLicker69",
            objective: "'notallmen', 'hitler', 'yolo'",
			challenge: "You may not use the words 'bitch', 'bitches'"
        },
		{
			username: "_*~StarSparkle~*_",
			objective: "'glitter', 'glowstick', 'so fetch'",
			challenge: "You may not use UPPERCASE letters"
		},
		{
			username: "John.",
			objective: "'football', 'the office', 'elbow patches'",
			challenge: "You cannot smile. ever."
		}].forEach(function (entry) {
            Users.insert(entry);
        });
});
