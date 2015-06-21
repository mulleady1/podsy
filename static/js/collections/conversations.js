define([
    'backbone',
    'models/conversation'
], function(Backbone, Conversation) {
    'use strict';

    var Conversations = Backbone.Collection.extend({
        model: Conversation,
        url: '/conversations/'
    });

    return Conversations;
});
