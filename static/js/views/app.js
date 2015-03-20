define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods',
    'views/subcategories'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods, SubcategoriesView) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            app.router = this.router = new Router({ pushState: true });
            Backbone.history.start();
            app.pods = new Pods();
            this.listenTo(app.pods, 'reset', this.addPods);
            app.pods.fetch({ reset: true });

            this.subcategoriesView = new SubcategoriesView();
        },
        addPod: function(pod) {
            var podView = new PodView({ model: pod });
            this.$('#pods-list').append(podView.render().el);
        },
        addPods: function() {
            this.$('#pods-list').html('');
            app.pods.each(this.addPod, this);
        }
    });

    return AppView;
});
