define([
    'backbone',
    'collections/messages'
], function(Backbone, Messages) {
    'use strict';

    var Conversation = Backbone.Model.extend({
        defaults: function() {
            return {
                id: '',
                members: [],
                messages: new Messages(),
                created: '',
                preview: ''
            };
        }
    });

    return Conversation;
});