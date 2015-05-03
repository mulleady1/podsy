define([
    'jquery',
    'underscore',
    'backbone',
    'models/comment',
    'collections/comments',
    'views/comment'
], function($, _, Backbone, Comment, Comments, CommentView) {
    var PodDetailView = Backbone.View.extend({
        el: '#pod-detail-container',
        template: _.template($('#pod-detail-template').html()),
        className: 'container card',
        events: {
            'click .upvote': 'toggleUpvote',
            'click .downvote': 'toggleDownvote',
            'click .podtitle > a': 'listen',
            'click .podtitle > .glyphicon': 'toggleFavorite',
            'click button.submit': 'addComment'
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
            this.comments = new Comments(commentsData).setPod(this.model);
            this.$el.find('.comments-container').html('');
            _.each(commentsData, this.showComment.bind(this));
        },
        showComment: function(commentData, index, collection, comment) {
            var $el = this.$el.find('.comments-container');
            comment = comment || new Comment(commentData);
            var commentView = new CommentView({ model: comment });

            $el.append(commentView.render().el);
        },
        addComment: function() {
            if (!app.loggedIn) return;
            var date = new Date();
            var data = {
                text: this.$el.find('textarea[name="text"]').val(),
                url: this.comments.url,
                userid: app.userid,
                username: app.username,
                timestamp: '%b %d'.replace('%b', app.monthNames[date.getMonth()]).replace('%d', date.getDate())
            };
            var comment = new Comment(data);
            this.comments.add(comment);
            comment.save();
            this.showComment(null, null, null, comment);
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
