define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var ListenView = Backbone.View.extend({
        className: 'modal fade',
        template: _.template($('#pod-listen-template').html()),
        render: function(data) {
            this.$el.html(this.template(data));
            return this;
        }
    });

    return ListenView;
});
