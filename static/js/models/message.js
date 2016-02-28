'use strict';

var Backbone = require('backbone'),
    User = require('../models/user');

var Message = Backbone.Model.extend({
    defaults: function() {
        return {
            conversation_id: '',
            user: new User(),
            created: '',
            text: '',
            preview: ''
        };
    }
});

module.exports = Message;
