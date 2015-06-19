define([
    'jquery',
    'underscore',
    'backbone',
    'models/message',
    'views/message',
], function($, _, Backbone, Message, MessageView) {
    var AccountView = Backbone.View.extend({
        el: '#account-view',
        show: function() {
            var self = this;
            this.$el.show();
            var $el = this.$el.find('.messages-container');
            if (!this.messages) {
                this.messages = [];
                $.get('/messages/').then(function(data) {
                    _.each(data, function(messageData) {
                        var message = new Message(messageData);
                        var messageView = new MessageView({ model: message });
                        self.messages.push(messageView);
                        $el.append(messageView.render().el);
                    });
                });
            }
        }

    });

    return AccountView;
});
