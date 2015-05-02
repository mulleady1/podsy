define([
    'backbone',
    'underscore',
    'models/comment'
], function(Backbone, _, Comment) {
    'use strict';

    var CommentView = Backbone.View.extend({
        className: 'comment',
        template: _.template($('#comment-template').html()),
        events: {
            'click button.reply': 'reply'
        },
        initialize: function() {
            this.children = [];
            if (!this.hasChildren()) return;
            _.each(this.model.attributes.children, this.createChild.bind(this));
        },
        hasChildren: function() {
            return this.model.attributes.children.length > 0;
        },
        createChild: function(child) {
            var comment = new Comment(child),
                commentView = new CommentView({ model: comment });
            this.children.push(commentView);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            var container = this.$el.find('.children-container');
            container.html('');
            _.each(this.children, function(child) {
                container.append(child.render().el);
            });
            return this;
        },
        reply: function() {
            alert('reply');
        }
    });

    return CommentView;
});
