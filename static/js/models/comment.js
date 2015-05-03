define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Comment = Backbone.Model.extend({
        defaults: function() {
            return {
                children: []
            }
        }
    });

    return Comment;
});
