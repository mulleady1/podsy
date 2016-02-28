'use strict';

var Backbone = require('backbone');

var PodView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#pod-template').html()),
    events: {
        'click .upvote': 'toggleUpvote',
        'click .downvote': 'toggleDownvote',
        'click .podtitle > a': 'listen',
        'click .podtitle > .glyphicon': 'toggleFavorite'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'listen', this.listen);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleUpvote: function() {
        this.model.toggleUpvote();
    },
    toggleDownvote: function() {
        this.model.toggleDownvote();
    },
    toggleFavorite: function() {
        if (!app.loggedIn) return;
        this.model.toggleFavorite();
    }
});

module.exports = PodView;
