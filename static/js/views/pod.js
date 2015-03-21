define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var PodView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#pod-template').html()),
        listenTemplate: _.template($('#pod-listen-template').html()),
        events: {
            'click .upvote': 'toggleUpvote',
            'click .downvote': 'toggleDownvote',
            'click .podtitle > a': 'listen'
        },
        initialize: function() {
            this.listenTo(this.model, 'listen', this.listen);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        listen: function() {
            if (!this.listenEl) {
                this.listenEl = this.listenTemplate(this.model.toJSON());
                $('body').append(this.listenEl);
            }
            $(this.listenEl).modal();
            return this;
        },
        toggleUpvote: function() {
            this.model.toggleUpvote();
        },
        toggleDownvote: function() {
            this.model.toggleDownvote();
        }
    });

    return PodView;
});
