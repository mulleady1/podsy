define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods',
    'collections/categories',
    'views/listen',
    'views/signin',
    'views/upload',
    'views/category',
    'forms/category'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods, Categories, ListenView, SigninView, UploadView, CategoryView, CategoryForm) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            app.router = new Router();
            app.listenView = new ListenView();
            app.signinView = new SigninView();
            app.uploadView = new UploadView();
            app.categoryView = new CategoryView();
            app.categoryForm = new CategoryForm();

            app.pods = new Pods();
            app.categories = new Categories();

            this.listenTo(app.pods, 'reset', this.addPods);
            this.listenTo(app.categories, 'reset', this.addCategories);

            Backbone.history.start();
        },
        addPod: function(pod) {
            var podView = new PodView({ model: pod });
            this.$('#pods-list').append(podView.render().el);
        },
        addPods: function() {
            this.$('#pods-list').html('');
            app.pods.each(this.addPod, this);
        },
        addCategory: function(category) {
            var categoryView = new CategoryView({ model: category });
            this.$('#categories-list').append(categoryView.render().el);
        },
        addCategories: function() {
            this.$('#categories-list').html('');
            this.$('#categories-container').show();
            this.$('#pods-container').hide();
            app.categories.each(this.addCategory, this);
        }
    });

    return AppView;
});
