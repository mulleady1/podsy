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
    'collections/categories',
    'collections/subcategories',
    'views/listen',
    'views/signin',
    'views/upload',
    'views/category',
    'views/categorydetail',
    'forms/category'
], function($, _, Backbone, Bootstrap, Router, PodView, PodDetailView, Pod, Pods, Categories, Subcategories, ListenView, SigninView, UploadView, CategoryView, CategoryDetailView, CategoryForm) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            var self = this;
            app.router = new Router();
            app.signinView = new SigninView();
            app.uploadView = new UploadView();
            app.categoryView = new CategoryView();
            app.podDetailView = new PodDetailView();
            app.categoryDetailView = new CategoryDetailView();
            app.categoryForm = new CategoryForm();

            app.loadInitialPods = function() {
              var pods = [];
              _.each(app.podsData, function(podData) {
                  pods.push(new Pod(podData));
              });
              app.pods = new Pods();
              self.listenTo(app.pods, 'reset', self.addPods);
              app.pods.reset(pods);
            };

            app.toJs = this.toJs;
            app.toJson = this.toJson;

            app.loadInitialPods();

            app.categories = new Categories();
            app.subcategories = new Subcategories();

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
        toJson: function(o) {
            return JSON.stringify(o, null, 4);
        }
    });

    return AppView;
});
