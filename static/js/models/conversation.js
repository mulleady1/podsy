define([
    'backbone',
    'collections/messages'
], function(Backbone, Messages) {
    'use strict';

    var Conversation = Backbone.Model.extend({
        defaults: function() {
            return {
                members: [],
                messages: new Messages(),
                created: '',
                preview: ''
            };
        },
        url: '/conversations/'
    });

    return Conversation;
});
