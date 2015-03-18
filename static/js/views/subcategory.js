define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var SubcategoryView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#category-template').html()),
        events: {
            'click .upvote': 'toggleUpvote',
            'click .downvote': 'toggleDownvote'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return SubcategoryView;
});
