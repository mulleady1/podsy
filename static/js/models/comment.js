'use strict';

var Backbone = require('backbone');

var Comment = Backbone.Model.extend({
    defaults: function() {
        return {
            children: []
        }
    }
});

module.exports = Comment;
