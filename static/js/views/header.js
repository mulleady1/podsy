define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        template: _.template($('#view-header-template').html()),
        className: 'container view header-view',
        render: function() {
            this.$el.html(this.template(this.model.attributes || this.model));
            this.$el.show();
            return this;
        },
        show: function(data) {
            if (data) {
                this.model = data;
            }
            this.render();
            this.$el.insertBefore('#pods-view');
        }
    });

    return HeaderView;
});
