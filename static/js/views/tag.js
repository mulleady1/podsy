'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var TagView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tag-template').html()),
    events: {
        'click .glyphicon.fav': 'toggleFavorite'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleFavorite: function() {
        if (!app.loggedIn) return;
        this.model.toggleFavorite();
    }
});

module.exports = TagView;
