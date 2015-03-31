define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
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
            this.listenTo(this.model, 'listen', this.listen);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        listen: function() {
            app.listenView.render(this.model.toJSON());
        },
        toggleUpvote: function() {
            this.model.toggleUpvote();
        },
        toggleDownvote: function() {
            this.model.toggleDownvote();
        },
        toggleFavorite: function() {
            if (!app.loggedIn) {
                return;
            }
            this.$el.find('.podtitle > .glyphicon').toggleClass('glyphicon-star glyphicon-star-empty');
            this.model.toggleFavorite();
        }
    });

    return PodView;
});
