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
	"submit form"(event) {
		event.preventDefault();
		var message = event.target[0].value;
		Messages.insert({
			message: message,
      date: new Date(),
			username: "You"
		});
document.location.reload(true);
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
  return moment(date).format("DD MMM YYYY HH:mm");
});
