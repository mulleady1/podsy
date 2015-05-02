define([
    'jquery',
    'underscore',
    'backbone',
    'models/comment',
    'views/comment'
], function($, _, Backbone, Comment, CommentView) {
    var PodDetailView = Backbone.View.extend({
        el: '#pod-detail-container',
        template: _.template($('#pod-detail-template').html()),
        className: 'container card',
        events: {
            'click .upvote': 'toggleUpvote',
            'click .downvote': 'toggleDownvote',
            'click .podtitle > a': 'listen',
            'click .podtitle > .glyphicon': 'toggleFavorite'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        setModel: function(pod) {
            this.model = pod;
            return this;
        },
        show: function(pod) {
            this.setModel(pod).render().$el.show();
            $.get('/pods/{id}/comments'.replace('{id}', pod.get('id'))).then(this.showComments.bind(this));
        },
        showComments: function(commentsData) {
            this.$el.find('.comments-container').html('');
            _.each(commentsData, this.showComment.bind(this));
        },
        showComment: function(commentData) {
            var $el = this.$el.find('.comments-container'),
                comment = new Comment(commentData),
                commentView = new CommentView({ model: comment });

            $el.append(commentView.render().el);
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

    return PodDetailView;
});
