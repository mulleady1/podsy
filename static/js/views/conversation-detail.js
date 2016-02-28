'use strict';

var Backbone = require('backbone'),
    Conversation = require('../models/conversation');

var ConversationDetailView = Backbone.View.extend({
    el: '#conversation-detail-view',
    template: _.template($('#conversation-detail-template').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    show: function(conv) {
        this.model = conv;
        this.model.on('all', this.render.bind(this));
        this.$el.show();
        this.trigger('show');
        return this.render();
    },
    hide: function() {
        this.$el.hide();
    }
});

module.exports = ConversationDetailView;
