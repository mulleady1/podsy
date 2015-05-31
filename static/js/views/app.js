define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'views/poddetail',
    'models/pod',
    'collections/pods',
    'collections/tags',
    'collections/categories',
    'collections/subcategories',
    'views/signin',
    'views/signup',
    'views/upload',
    'views/category',
    'views/header',
    'views/tag',
    'forms/category',
    'jquery-ui'
], function($, _, Backbone, Bootstrap, Router, PodView, PodDetailView, Pod, Pods, Tags, Categories, Subcategories, SigninView, SignupView, UploadView, CategoryView, HeaderView, TagView, CategoryForm) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            // Utility functions.
            app.toJs = this.toJs;
            app.toJson = this.toJson;
            app.getFormData = this.getFormData;
            app.loadInitialPods = this.loadInitialPods;

            // Views.
            app.signinView = new SigninView();
            app.signupView = new SignupView();
            app.uploadView = new UploadView();
            app.categoryView = new CategoryView();
            app.podDetailView = new PodDetailView();
            app.headerView = new HeaderView();
            app.categoryForm = new CategoryForm();

            // Collections.
            app.pods = new Pods();
            app.tags = new Tags();
            app.categories = new Categories();
            app.subcategories = new Subcategories();

            // Listeners.
            this.listenTo(app.pods, 'reset', this.addPods);
            this.listenTo(app.pods, 'add', this.addPodToFront);
            this.listenTo(app.tags, 'reset', this.addTags);
            this.listenTo(app.categories, 'reset', this.addCategories);

            // Initializers.
            app.loadInitialPods();
            this.addAjaxToken();

            // Router.
            app.router = new Router();
            Backbone.history.start();
        },
        addPod: function(pod) {
            var podView = new PodView({ model: pod });
            this.$('#pods-list').append(podView.render().el);
        },
        addPodToFront: function(pod) {
            var podView = new PodView({ model: pod });
            $('#pods-list').prepend(podView.render().el);
        },
        addPods: function() {
            this.$('#pods-list').html('');
            app.pods.each(this.addPod, this);
        },
        addTag: function(tag) {
            var tagView = new TagView({ model: tag });
            this.$('#tags-list').append(tagView.render().el);
        },
        addTags: function() {
            this.$('#tags-list').html('');
            app.tags.each(this.addTag, this);
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
                    if (settings.url.charAt(settings.url.length - 1) != '/') {
                        settings.url += '/';
                    }
                }
            });
        },
        toJs: function(s) {
            var o = {},
                kvs = s.split('&');

            _.each(kvs, function(kv) {
                var tokens = kv.split('='),
                    k = tokens[0],
                    v = tokens[1];

                if (o.hasOwnProperty(k)) {
                    if (typeof o[k] == 'string') {
                        o[k] = [o[k], v];
                    } else if (o[k] instanceof Array) {
                        o[k].push(v);
                    }
                } else {
                    o[k] = v;
                }
            });

            return o;
        },
        toJson: function(data) {
            if (typeof data == 'string') {
                data = this.toJs(data);
            }
            if (typeof data != 'object') {
                return null;
            }

            return JSON.stringify(data, null, 4);
        },
        getFormData: function(form) {
            var data = {};
            form.find('input, select').each(function(i, el) {
                var name = $(el).prop('name');
                var val = $(el).val();
                if (name && val) {
                    data[name] = val;
                }
            });
            return data;
        },
        loadInitialPods: function() {
            var pods = [];
            _.each(app.podsData, function(podData) {
                pods.push(new Pod(podData));
            });
            app.pods.reset(pods);
        }
    });

    return AppView;
});
