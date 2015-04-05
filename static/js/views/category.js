define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var CategoryView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#category-template').html()),
        events: {
            'click .upvote': 'toggleUpvote'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return CategoryView;
});
