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

Router.route("/info", function () {
	this.render("info");
});

Router.route("/messageboard", function () {
	this.render("messageboard");
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
