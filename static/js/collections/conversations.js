'use strict';

var Backbone = require('backbone'),
    Conversation = require('../models/conversation');

var Conversations = Backbone.Collection.extend({
    model: Conversation,
    url: '/conversations/'
});

module.exports = Conversations;
