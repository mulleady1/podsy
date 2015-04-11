define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var ListenView = Backbone.View.extend({
        className: 'modal fade',
        template: _.template($('#pod-listen-template').html()),
        events: {
            'hide.bs.modal': 'stop'
        },
        render: function(data) {
            this.$el.html(this.template(data));
            return this;
        },
        show: function(data) {
            this.render(data);
            this.$el.modal();
        },
        stop: function() {
            this.$el.html('');
            history.back();
        }
    });

    return ListenView;
});
