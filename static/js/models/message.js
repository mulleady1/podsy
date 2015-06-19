define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Message = Backbone.Model.extend({
        defaults: function() {
            return {
                id: '',
                fromUser: {},
                toUser: {},
                created: '',
                text: '',
                preview: ''
            };
        }
    });

    return Message;
});
