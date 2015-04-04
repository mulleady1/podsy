define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods',
    'collections/categories',
    'collections/subcategories',
    'views/listen',
    'views/signin',
    'views/upload',
    'views/category',
    'forms/category'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods, Categories, Subcategories, ListenView, SigninView, UploadView, CategoryView, CategoryForm) {
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
            app.subcategories = new Subcategories();

            this.listenTo(app.pods, 'reset', this.addPods);
            this.listenTo(app.categories, 'reset', this.addCategories);

            this.addAjaxToken();

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
            app.categories.each(this.addCategory, this);
        },
        addAjaxToken: function() {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            function csrfSafeMethod(method) {
                // these HTTP methods do not require CSRF protection
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            }

            var csrftoken = getCookie('csrftoken');

            $.ajaxSetup({
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        }
    });

    return AppView;
});
