define([
    'backbone'
], function(Backbone) {
    'use strict';

    var CommentView = Backbone.View.extend({
        template: _.template($('#comment-template').html()),
        events: {
            'click button.reply': 'reply'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        reply: function() {
            alert('reply');
        }
    });

    return CommentView;
});
