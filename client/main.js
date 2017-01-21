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

Router.route("/startmenu", function() {
	this.render("startmenu");
});

Router.route("/newgame", function() {
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

Template.messageboard.events({

	"keypress form"(event) {
			if (event.which == 13 && !(event.shiftKey)) {
				event.preventDefault();
				$("#submit").click();
			}
	},

	"submit form"(event) {
		var message = event.target[0].value;
		event.preventDefault();
		Messages.insert({
			message: message,
      date: new Date(),
			username: "you"
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
		return Users.findOne({});
	}
});

Template.registerHelper("formatDate", function (date) {
  return moment(date).format("DD MMM HH:mm");
});

Template.startmenu.events({
  'click #btn-new-game': function () {
    Router.go("/newgame");
  },
  'click #btn-join-game': function () {
    Router.go("/joingame");
  },
	'click #btn-start-back': function () {
    Router.go("/");
  }
});

Template.joingame.events({
  'click #btn-join-back': function (e) {
		e.preventDefault();
    Router.go("/startmenu");
  }
});



Template.createGame.events({
  'submit #create-game': function (event) {
    var playerName = event.target.playerName.value;
    if (!playerName || Session.get('loading')) {
      return false;
    }
    var game = generateNewGame();
    var player = generateNewPlayer(game, playerName);
    Meteor.subscribe('games', game.accessCode);
    Session.set("loading", true);
    Meteor.subscribe('players', game._id, function onReady(){
      Session.set("gameID", game._id);
      Session.set("playerID", player._id);
      Session.set("currentView", "lobby");
    })
    return false;
  },
  'click #btn-cre-back': function (e) {
		e.preventDefault();
    Router.go("/startmenu");
  }
});
