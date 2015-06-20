define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Conversation = Backbone.Model.extend({
        defaults: function() {
            return {
                id: '',
                members: [],
                created: '',
                preview: ''
            };
        }
    });

    return Conversation;
});
