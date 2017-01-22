import {
	Template
} from "meteor/templating";
import {
	ReactiveVar
} from "meteor/reactive-var";

import "./main.html";

Router.configure({
	layoutTemplate: "layoutMain"
});

Router.route("/", function () {
	this.render("home");
});

Router.route("/newgame", function () {
	this.render("newgame");
});

Router.route("/info", function () {
	this.render("info");
});

Router.route("/messageboard", function () {
	this.render("messageboard");
});

Router.route("/joingame", function () {
	this.render("joingame");
});

Router.route("/about", function () {
	this.render("about");
});

Router.route("/howto", function () {
	this.render("howto");
});

Router.route("/lose", function () {
	this.render("lose");
});

Template.joingame.events({
	"submit form"(event) {
		Session.set("name", event.target[0].value);
		event.preventDefault();
		Router.go("/info");
	},

	"keypress form"(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("#joingame").click();
		}
	}
});

Template.newgame.events({
	"keypress form"(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("#creategame").click();
		}
	}
});

Template.messageboard.onRendered(function () {
	var name = Session.get("username");
	var meow = Session.get("meow");
	var array = Session.get("array");

	console.log(array);
	var word = array[meow];
	console.log(word);

	$("#word").html("word: " + word);

	if (name == null) {
		Router.go("/");
		alert("You didn't say the magic word.");
	}
});

Template.messageboard.events({
	"keypress form"(event) {
		if (event.which == 13 && !(event.shiftKey)) {
			event.preventDefault();
			$("#submit").click();
		}
	},

	"submit form"(event) {
		var message = event.target[0].value;
		var username = Session.get("username");
		var wordcount = Session.get("wordcount");
		var number = Session.get("number");
		var array = Session.get("array");
		var meow = Session.get("meow");

		var word = array[meow];
		var wordno = false;

		event.preventDefault();

		Messages.insert({
			message: message,
			date: new Date(),
			username: username,
			checked: false
		});

		event.target[0].value = "";

		message = message.toLowerCase();
		if (message.includes(word)) {
			wordno = true;
		};

		if (number == 0) {
			if (message.includes("guys")) {
				wordcount = 0;
			} else {
				wordcount += 1;
			}
			Session.set("wordcount", wordcount);

			if (wordcount >= 4) {
				wordno = true;
			}

		} else if (number == 1) {

			if (!(message.endsWith("xd")) && !(message.endsWith("haha"))) {
				wordno = true;
			}

		} else if (number == 2) {
			if (!(message.endsWith("."))) {
				wordno = true;
			}

		} else if (number == 3) {
			if ((message.includes("badger")) || (message.includes("mink")) || (message.includes("termitarium")) || (message.includes("rodent"))) {
				wordcount = 0;
			} else {
				wordcount += 1;
			}
			Session.set("wordcount", wordcount);

			if (wordcount >= 4) {
				wordno = true;
			}

		}

		if (wordno) {
			Router.go("/lose");
		}

	}
});

Template.messageboard.onCreated(function () {
  	let query = Messages.find({});
	let handle = query.observeChanges({
	    added: function (id, fields) {

			var array = Session.get("array");
			var word = Session.get("word");
			var meow = Session.get("meow");
			var wordcount = Session.get("wordcount");
			var score = Session.get("score");
			var newmessage = fields.message;
			var word = array[meow];

			if (newmessage.includes(word)) {
				console.log("yes!!");
				score += 1;
				Session.set("score", score);
				$("#score").html("score: " + score);

				meow += 1;
				word = array[meow];
				Session.set("word", word);
				$("#word").html("word: " + word);

				console.log(word);
				console.log(score);

			}

	     }
	 });
});

Template.messageboard.helpers({
	messages: function () {
		return Messages.find({}, {
			sort: {
				date: -1
			}
		});
	},

	users: function () {
		var id = Session.get("id");
		return Users.findOne({
			_id: id
		});
	}
});

Template.info.helpers({
	users: function () {
		var test = Session.get("id");
		if (Session.get("id") == null) {
			var x = Users.find({
				inuse: "false"
			}).fetch();

			var randomIndex = Math.floor(Math.random() * x.length);
			var element = x[randomIndex];
			Session.set("id", element._id);
			Session.set("username", element.username);
			Session.set("array", element.array);
			Session.set("score", 0);
			Session.set("wordcount", 0);
			Session.set("meow", 0);
			Session.set("number", element.number);


			var array = Session.get("array");
			array = $.map(array, function (value, key) {
				return value;
			});
			Session.set("array", array);


			elementId = element._id;
			Users.update(elementId, {
				$set: {
					inuse: true
				}
			});
			return Users.findOne({
				_id: elementId
			});
		} else {
			return Users.findOne({
				_id: test
			});
		}
	}

});

Template.registerHelper("formatDate", function (date) {
	return moment(date).format("DD MMM HH:mm");
});


/*******************************************************************



if (wordyes) {
	score += 1;
	Session.set("score", score);
	$("#score").html("score: " + score);
}

"click #newobj"(event) {
	var id = Session.get("id");
	console.log(id);
	Users.update({_id: id}, {
		$set: {objective: "meow"}
	});
}

Template.createGame.events({
  "submit #create-game": function (event) {
    var playerName = event.target.playerName.value;
    if (!playerName || Session.get("loading")) {
      return false;
    }
    var game = generateNewGame();
    var player = generateNewPlayer(game, playerName);
    Meteor.subscribe("games", game.accessCode);
    Session.set("loading", true);
    Meteor.subscribe("players", game._id, function onReady() {
      Session.set("gameID", game._id);
      Session.set("playerID", player._id);
      Session.set("currentView", "lobby");
  });
    return false;
  },
  "click #btn-cre-back": function (e) {
		e.preventDefault();
    Router.go("/");
  }
});
************************************************************************/
