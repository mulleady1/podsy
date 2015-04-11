define([
    'jquery',
    'underscore',
    'backbone',
    'models/comment',
    'views/comment'
], function($, _, Backbone, Comment, CommentView) {
    var PodDetailView = Backbone.View.extend({
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
        show: function(pod) {
            this.model = pod;
            $('body').append(this.render().el);
            var $el = this.$el.find('.comments-container');
            $.get('/pods/{id}/comments'.replace('{id}', pod.get('id'))).then(function(data) {
                _.each(data, function(attrs) {
                    var comment = new Comment(attrs);
                    var commentView = new CommentView({ model: comment });
                    $el.append(commentView.render().el);
                });
            });
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
