define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        template: _.template($('#view-header-template').html()),
        className: 'container view',
        render: function(data) {
            this.$el.html(this.template(data));
            this.$el.show();
            return this;
        },
        show: function(data) {
            this.render(data);
            this.$el.insertBefore('#pods-view');
        }
    });

    return HeaderView;
});
