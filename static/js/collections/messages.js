'use strict';

var Backbone = require('backbone'),
    Message = require('../models/message');

var Messages = Backbone.Collection.extend({
    model: Message,
    url: function() {
        return '/conversations/{id}/messages/'.replace('{id}', this.conversationId);
    },
    setConversationId: function(id) {
        this.conversationId = id;
    }
});

module.exports = Messages;
