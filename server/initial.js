Meteor.startup(function () {
  Users.remove({});
  Messages.remove({});
        [{
            username: "pussyLicker69",
            about: "You mad lad",
			challenge: "You may not use the words 'bitch', 'bitches'",
			array: {
				word1: "notallmen",
				word2: "hitler",
				word3: "yolo"
			}
        },
		{
			username: "_*~StarSparkle~*_",
			about: "'In my world, everyone's a pony and they all eat rainbows and poop butterflies!'",
			challenge: "You may not use UPPERCASE letters",
			array: {
				word1: "glitter",
				word2: "glowstick",
				word3: "so fetch"
			}
		},
		{
			username: "John.",
			about: "...?",
			challenge: "You cannot smile. ever.",
			array: {
				word1: "football",
				word2: "the office",
				word3: "elbow patches"
			}
		}].forEach(function (entry) {
            Users.insert(entry);
        });
});
