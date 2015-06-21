define([
    'jquery',
    'underscore',
    'backbone',
    'models/conversation',
    'collections/conversations',
    'views/conversation-list',
    'views/conversation-detail'
], function($, _, Backbone, Conversation, Conversations, ConversationListView, ConversationDetailView) {
    var MessagesView = Backbone.View.extend({
        el: '#messages-view',
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
            var conv = this.conversations.get(id);
            if (!this.conversationDetailView) {
                this.conversationDetailView = new ConversationDetailView();
            }
            this.conversationDetailView.show(conv);
        }
    });

    return MessagesView;
});
