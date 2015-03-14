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
            'click .downvote': 'toggleDownvote'
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
        }
    });

    return PodView;
});
