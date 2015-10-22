'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Conversation = require('../models/conversation');

var ConversationListView = Backbone.View.extend({
    tagName: 'li',
    className: 'conversation',
    template: _.template($('#conversation-list-template').html()),
    events: {
        'click': 'onClick'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    onClick: function(e) {
        if (e.target.tagName.toLowerCase() == 'a') {
            return;
        }
        app.router.navigate('#/conversations/{id}/'.replace('{id}', this.model.get('id')));
    }
});

module.exports = ConversationListView;
