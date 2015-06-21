define([
    'backbone',
    'models/conversation'
], function(Backbone, Conversation) {
    var ConversationListView = Backbone.View.extend({
        className: 'conversation',
        template: _.template($('#conversation-list-template').html()),
        events: {
            'click': 'onClick'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onClick: function() {
            app.router.navigate('#/conversations/{id}/'.replace('{id}', this.model.get('id')));
        }
    });

    return ConversationListView;
});
