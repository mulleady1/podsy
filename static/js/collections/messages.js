define([
    'backbone',
    'models/message'
], function(Backbone, Message) {
    'use strict';

    var Messages = Backbone.Collection.extend({
        model: Message,
        url: function() {
            return '/conversations/{id}/messages/'.replace('{id}', this.conversationId);
        },
        setConversationId: function(id) {
            this.conversationId = id;
        }
    });

    return Messages;
});
