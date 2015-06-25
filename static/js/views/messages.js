define([
    'jquery',
    'underscore',
    'backbone',
    'models/message',
    'models/conversation',
    'models/user',
    'collections/messages',
    'collections/conversations',
    'views/conversation-list',
    'views/conversation-detail'
], function($, _, Backbone, Message, Conversation, User, Messages, Conversations, ConversationListView, ConversationDetailView) {
    var MessagesView = Backbone.View.extend({
        el: '#messages-view',
        events: {
            'click button.create-message': 'createMessage'
        },
        show: function() {
            var self = this;
            this.$el.show();
            var $el = this.$el.find('.conversations-container');
            $el.show();
            if (this.conversationDetailView) {
                this.conversationDetailView.hide();
            }
            if (!this.conversations) {
                this.conversations = new Conversations();
                this.listenTo(this.conversations, 'reset', this.showConversationList);
                this.conversations.fetch({ reset: true });
            }
        },
        showConversationList: function() {
            var $el = this.$el.find('.conversations-container');
            this.conversations.each(function(conversation) {
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
            }
            this.conversationDetailView.show(this.conversation);
        },
        createMessage: function(e) {
            e.preventDefault();
            var text = this.$el.find('textarea.message-text').val().trim();
            if (!text) return;
            var messageData = {
                text: text,
                conversation_id: this.conversation.get('id'),
                created: app.getFormattedDate(),
                user: {
                    username: app.username
                }
            };
            var messagesData = this.conversation.get('messages');
            var messages = new Messages(messagesData);
            messages.setConversationId(this.conversation.get('id'));
            messages.create(messageData);
            this.conversation.set('messages', messages.toJSON());
        }
    });

    return MessagesView;
});
