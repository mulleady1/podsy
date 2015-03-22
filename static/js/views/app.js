define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods',
    'views/subcategories',
    'views/listen'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods, SubcategoriesView, ListenView) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            app.listenView = new ListenView();
            app.pods = new Pods();
            this.listenTo(app.pods, 'reset', this.addPods);
            app.router = new Router();
            Backbone.history.start();
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
