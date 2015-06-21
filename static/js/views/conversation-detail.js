define([
    'backbone',
    'models/conversation'
], function(Backbone, Conversation) {
    var ConversationDetailView = Backbone.View.extend({
        el: '#conversation-detail-view',
        template: _.template($('#conversation-detail-template').html()),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        show: function(conv) {
            this.model = conv;
            return this.render();
        }
    });

    return ConversationDetailView;
});
