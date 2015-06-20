define([
    'backbone',
    'models/conversation'
], function(Backbone, Conversation) {
    var ConversationListView = Backbone.View.extend({
        className: 'conversation',
        template: _.template($('#conversation-list-template').html()),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ConversationListView;
});
