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

Template.info.events({
	"click #newobj"(event) {
		console.log("hi");
		Users.update({username: "pussyLicker69"}, {
			$set: {objective: "get the money"}
		});
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
	var name = Session.get("name");
	console.log(name);
  if(false) {
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
		var username = Session.get("name");
		event.preventDefault();
		Messages.insert({
			message: message,
      date: new Date(),
			username: username
		});

		event.target[0].value = "";
	}
});

Template.messageboard.helpers({
	messages: function () {
		return Messages.find({}, {
			sort: {
				date: -1
			}
		});
	}
});

Template.info.helpers({
	users: function () {
		var array = Users.find().fetch();
		var randomIndex = Math.floor( Math.random() * array.length );
		var element = array[randomIndex];
		Session.set("id", element._id);
		elementId = Session.get("id");
		//Session.set("_id");
		return Users.findOne({_id: elementId});
	}
});

Template.registerHelper("formatDate", function (date) {
  return moment(date).format("DD MMM HH:mm");
});


/*******************************************************************
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
