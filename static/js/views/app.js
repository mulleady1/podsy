define([
    'jquery',
    'underscore',
    'backbone',
    'views/pod',
    'collections/pods'
], function($, _, Backbone, PodView, Pods) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            this.pods = new Pods();
            this.listenTo(this.pods, 'reset', this.addAll);
            this.pods.fetch({ reset: true });
        },
        addOne: function(pod) {
            var podView = new PodView({ model: pod });
            this.$('#pods-list').append(podView.render().el);
        },
        addAll: function() {
            this.$('#pods-list').html('');
            this.pods.each(this.addOne, this);
        }
    });

    return AppView;
});
