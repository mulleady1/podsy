define([
    'jquery',
    'underscore',
    'backbone',
    'models/message'
], function($, _, Backbone, Message) {
    var AccountView = Backbone.View.extend({
        el: '#account-view',
        show: function() {
            this.$el.show();
        }

    });

    return AccountView;
});
