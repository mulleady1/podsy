define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {
    'use strict';

    var CategoryDetailView = Backbone.View.extend({
        template: _.template($('#category-detail-template').html()),
        className: 'container card',
        render: function(data) {
            this.$el.html(this.template(data));
            this.$el.show();
            return this;
        },
        show: function(data) {
            this.render(data);
            this.$el.insertBefore('#pods-container');
        }
    });

    return CategoryDetailView;
});
