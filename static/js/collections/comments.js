define([
    'models/comment'
], function(Comment) {
    'use strict';

    var Comments = Backbone.Collection.extend({
        model: Comment,
        setPod: function(pod) {
            this.url = '/pods/{id}/comments/'.replace('{id}', pod.get('id'));
            return this;
        }
    });

    return Comments;
});
