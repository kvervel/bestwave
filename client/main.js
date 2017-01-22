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
		var array = Session.get("array");
		var score = Session.get("score");
		var word = Session.get("word");
		var words = Session.get("words");

		var wordyes = false;
		var wordno = false;

		event.preventDefault();

		Messages.insert({
			message: message,
      date: new Date(),
			username: username,
			checked: false
		});

		event.target[0].value = "";

		word = words[word];
		message = message.toLowerCase();
		if (message.includes(word)) {
			wordno = true;
		};

		if (wordyes) {
			score += 1;
			Session.set("score", score);
			$("#score").html("score: " + score);
		}

		if (wordno) {
			Router.go("/lose");
		}

	}
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
		return Users.findOne({_id: id});
	}
});

Template.info.helpers({
	users: function () {
		var test = Session.get("id");
		console.log(test);
		if(Session.get("id")==null) {
		var x = Users.find({inuse: "false"}).fetch();
		console.log(x);
		var randomIndex = Math.floor(Math.random() * x.length);
		var element = x[randomIndex];
		Session.set("id", element._id);
		Session.set("username", element.username);
		Session.set("array", element.array);
		Session.set("score", 0);
		Session.set("word", 0);

		var array = Session.get("array");
		var words = $.map(array, function (value, key) {
			return value;
		});
		Session.set("words", words);
		elementId = element._id;
		Users.update(elementId, {
			$set: {
				inuse: true
			}
		});
		return Users.findOne({_id: elementId});
	}

		else {
			console.log(test);
			return Users.findOne({_id: test});}
	}

});

Template.registerHelper("formatDate", function (date) {
  return moment(date).format("DD MMM HH:mm");
});


/*******************************************************************

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
