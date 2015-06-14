define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var MessageView = Backbone.View.extend({
        tagName: 'li',
        className: 'message',
        template: _.template($('#message-list-template').html()),
        events: {
            'click .upvote': 'toggleUpvote'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return MessageView;
});
