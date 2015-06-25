define([
    'backbone',
    'models/user'
], function(Backbone, User) {
    'use strict';

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

    return Message;
});
