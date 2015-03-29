define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods',
    'views/listen',
    'views/signin',
    'views/upload',
    'views/category'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods, ListenView, SigninView, UploadView, CategoryView) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            app.router = new Router();
            app.listenView = new ListenView();
            app.signinView = new SigninView();
            app.uploadView = new UploadView();
            app.categoryView = new CategoryView();
            app.pods = new Pods();
            this.listenTo(app.pods, 'reset', this.addPods);
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
