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
            'click button.reply': 'showReply',
            'click button.submit': 'submit'
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
            return commentView;
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
        showReply: function(e) {
            $(e.target).hide();
            $(e.target).siblings('.reply-container').show();
        },
        submit: function(e) {
            e.preventDefault();

            // Prevent parent comments from catching the event.
            var commentId = $(e.target).data('comment-id');
            if (commentId != this.model.get('id')) {
                this.sendEventToTarget(e, commentId);
                return;
            }

            var self = this,
                btn = $(e.target),
                textarea = this.$el.find('textarea[name="text"]'),
                data = {
                    text: textarea.val(),
                    parent_id: this.model.get('id'),
                    userid: app.userid,
                    username: app.username,
                    timestamp: app.getFormattedDate(),
                    children: []
                },
                commentView = this.createChild(data);

            btn.attr('disabled', true);
            commentView.model.url = location.hash.substring(1) + 'comments/';
            commentView.model.save().then(function(data) {
                btn.attr('disabled', false);
                textarea.html('');
                self.render();
            });
        },
        sendEventToTarget: function(e, commentId) {
            _.each(this.children, function(view) {
                if (commentId == view.model.get('id')) {
                    view.submit(e);
                    return;
                }
                view.sendEventToTarget(e, commentId);
            });
        }
    });

    return CommentView;
});
