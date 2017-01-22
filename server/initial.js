Meteor.startup(function () {
  Users.remove({});
  Messages.remove({});
        [{
            username: "pussyLicker69",
			number: 0,
            about: "You mad lad",
			challenge: "You must use the word 'guys' at least once every fourth message",
            inuse: "false",
			array: {
				word1: "notallmen",
				word2: "hitler",
				word3: "yolo"
			}
        },
		{
			username: "_*~StarSparkle~*_",
			number: 1,
			about: "'In my world, everyone's a pony and they all eat rainbows and poop butterflies!'",
			challenge: "You must end every message with 'xD' or 'haha'",
      inuse: "false",
			array: {
				word1: "glitter",
				word2: "glowstick",
				word3: "so fetch"
			}
		},
		{
			username: "John.",
			number: 2,
			about: "...?",
			challenge: "You must end every message with a period ('.')",
      inuse: "false",
			array: {
				word1: "football",
				word2: "the office",
				word3: "elbow patches"
				}
		},
			{
				username: "ferretKing",
				number: 3,
				about: "Rodents aren't vermin. They're our friends!",
				challenge: "You must use the words 'mink', 'badger' or 'termitarium' at least once every fourth message",
        inuse: "false",
				array: {
					word1: "badger",
					word2: "polecat",
					word3: "weasel"
				}
		}].forEach(function (entry) {
            Users.insert(entry);
        });
});
