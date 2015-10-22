'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Conversation = require('../models/conversation'),
    Message = require('../models/message'),
    User = require('../models/user'),
    Conversations= require('../collections/conversations'),
    Message = require('../collections/messages'),
    ConversationListView = require('./conversation-list'),
    ConversationDetailView = require('./conversation-detail');

var MessagesView = Backbone.View.extend({
    el: '#messages-view',
    events: {
        'click button.create-message': 'createMessage'
    },
    initialize: function() {
        this.conversationListViewContainer = this.$el.find('.conversations-container');
        this.conversationDetailView = new ConversationDetailView();
        this.conversationDetailView.on('show', this.onConversationDetailViewShow.bind(this));
    },
    show: function() {
        var self = this;
        this.$el.show();
        var $el = this.$el.find('.conversations-container');
        $el.show();
        this.conversationDetailView.hide();
        if (!this.conversations) {
            this.conversations = new Conversations();
            this.listenTo(this.conversations, 'all', this.showConversationList);
            this.conversations.fetch({ reset: true });
        }
    },
    showConversationList: function() {
        var $el = this.$el.find('.conversations-container');
        this.conversationListViewContainer = $el;
        $el.html('');
        this.conversations.each(function(conversation) {
            $el.addClass('not-empty');
            var view = new ConversationListView({ model: conversation });
            $el.append(view.render().el);
        });
    },
    showConversation: function(id) {
        var self = this;
        if (this.conversations.length == 0) {
           this.timer = setTimeout(function() {
              self.showConversation(id);
           }, 500);
           return;
        } else {
            clearTimeout(this.timer);
        }
        var $el = this.$el.find('.conversations-container');
        if (app.isMobile()) {
            $el.hide();
        }
        this.conversation = this.conversations.get(id);
        if (!this.conversationDetailView) {
            this.conversationDetailView = new ConversationDetailView();
            this.conversationDetailView.on('show', this.onConversationDetailViewShow);
        }
        this.conversationDetailView.show(this.conversation);
    },
    showConversationOrStartNew: function(username) {
        var self = this,
            conversation;

        if (!this.attempts) {
            this.attempts = 0;
        }

        if (this.conversations.length == 0) {
            this.attempts++;
            if (this.attempts >= 2) {
                this.attempts = 0;
            } else {
                this.timer = setTimeout(function() {
                    self.showConversationOrStartNew(username);
                }, 500);
                return;
            }
        } else {
            clearTimeout(this.timer);
            var conversation = this.conversations.reduce(function(memo, conv) {
                var members = conv.get('members');
                if (members.length == 2 && (members[0].username == username || members[1].username == username)) {
                    return conv;
                }
            });
        }

        if (conversation) {
            return this.showConversation(conversation.get('id'));
        }

        this.conversation = new Conversation({
            members: [{
                username: username
            }]
        });
        this.conversationDetailView.show(this.conversation);
    },
    createMessage: function(e) {
        e.preventDefault();
        var self = this,
            text = this.$el.find('textarea.message-text').val().trim();

        if (!text) return;
        var messageData = {
            text: text,
            conversation_id: this.conversation.get('id'),
            created: app.getFormattedDate(),
            user: {
                username: app.username
            }
        };

        if (this.conversation.id) {
            this.saveMessage(messageData);
        } else {
            this.conversations.add(this.conversation);
            this.conversation.save().then(function() {
                self.saveMessage.call(self, messageData);
            });
        }
    },
    saveMessage: function(messageData) {
        var messagesData = this.conversation.get('messages');
        var messages = new Messages(messagesData);
        messages.setConversationId(this.conversation.get('id'));
        messages.create(messageData);
        this.conversation.set('messages', messages.toJSON());
    },
    onConversationDetailViewShow: function() {
        if (app.isMobile()) {
            this.conversationListViewContainer.hide();
        }
    }
});

module.exports = MessagesView;
