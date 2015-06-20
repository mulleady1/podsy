define([
    'jquery',
    'underscore',
    'backbone',
    'models/conversation',
    'views/conversation-list',
], function($, _, Backbone, Conversation, ConversationListView) {
    var MessagesView = Backbone.View.extend({
        el: '#messages-view',
        events: {
            'click .conversation': 'showConversation'
        },
        show: function() {
            this.$el.show();
            if (!this.conversationListView) {
                this.conversationListView = new ConversationListView();
                var $el = this.$el.find('.conversations-container');
                $.get('/conversations/').then(function(data) {
                    _.each(data, function(convData) {
                        var conv = new Conversation(convData);
                        var convView = new ConversationListView({ model: conv });
                        $el.append(convView.render().el);
                    });
                });
            }
        },
        showConversation: function() {
            debugger;
        }
    });

    return MessagesView;
});
