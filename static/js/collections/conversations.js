'use strict';

var Backbone = require('backbone'),
    Conversation = require('../models/Conversation');

var Conversations = Backbone.Collection.extend({
    model: Conversation,
    url: '/conversations/'
});

module.exports = Conversations;
