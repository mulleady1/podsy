'use strict';

var Backbone = require('backbone'),
    Messages = require('../collections/messages');

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

module.exports = Conversation;
