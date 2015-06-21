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
            var conv = this.conversations.get(id);
            if (!this.conversationDetailView) {
                this.conversationDetailView = new ConversationDetailView();
            }
            this.conversationDetailView.show(conv);
        }
    });

    return MessagesView;
});
