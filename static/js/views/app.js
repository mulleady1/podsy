define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'views/pod-detail',
    'models/pod',
    'collections/pods',
    'collections/tags',
    'collections/categories',
    'collections/subcategories',
    'views/signin',
    'views/signup',
    'forms/pod',
    'views/category',
    'views/header',
    'forms/category',
    'jquery-ui'
], function($, _, Backbone, Bootstrap, Router, PodView, PodDetailView, Pod, Pods, Tags, Categories, Subcategories, SigninView, SignupView, PodFormView, CategoryView, HeaderView, CategoryForm) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        events: {
            'click .pagination .next': 'nextPage',
            'click .pagination .prev': 'prevPage'
        },
        nextPage: function(e) {
            e.preventDefault();
            this.pageChange(1);
        },
        prevPage: function(e) {
            e.preventDefault();
            this.pageChange(-1);
        },
        pageChange: function(newNum) {
            var tokens = location.hash.split('/'),
                index = tokens.indexOf('page'),
                url;

            if (!location.hash || location.hash == '#/') {
                url = '#/pods/';
            } else {
                url = location.hash;
            }

            if (index == -1) {
                if (newNum == -1) return;
                url += 'page/2/';
                app.router.navigate(url, { trigger: true });
            } else {
                var num = parseInt(tokens[index+1], 10);
                if (isNaN(num)) {
                    num = 2;
                } else {
                    num += newNum;
                }

                if (num >= 1) {
                    tokens[index+1] = num;
                    url = tokens.join('/');
                    app.router.navigate(url, { trigger: true });
                }
            }

        },
        initialize: function() {
            // Listen to application-level events.
            _.extend(app, Backbone.Events);

            // Utility functions.
            app.toJs = this.toJs;
            app.toJson = this.toJson;
            app.isMobile = this.isMobile;
            app.getFormData = this.getFormData;
            app.getFormattedDate = this.getFormattedDate;

            // Views.
            app.signinView = new SigninView();
            app.signupView = new SignupView();
            app.podFormView = new PodFormView();
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
            this.listenTo(app.categories, 'reset', this.addCategories);
            app.on('pageChange', this.showNavButtons);

            // Initializers.
            this.addAjaxToken();

            // Router.
            app.router = new Router();
            app.router.on('route', app.router.afterExecute);
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
        addCategory: function(category) {
            var categoryView = new CategoryView({ model: category });
            this.$('#categories-list').append(categoryView.render().el);
        },
        addCategories: function() {
            this.$('#categories-list').html('');
            app.categories.each(this.addCategory, this);
        },
        showNavButtons: function(opts) {
            var prev = $('.pagination .prev'),
                next = $('.pagination .next');

            prev[opts.hasPrev ? 'removeClass' : 'addClass']('hidden');
            next[opts.hasNext ? 'removeClass' : 'addClass']('hidden');
            $('body').scrollTop(0);
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
            form.find('input, select, textarea').each(function(i, el) {
                var name = $(el).prop('name');
                var val = $(el).val();
                if (this.type == 'checkbox') {
                    data[name] = this.value != 'on' ? this.value : this.checked;
                }
                else if (name && val) {
                    data[name] = val;
                }
            });
            return data;
        },
        getFormattedDate: function(date) {
            date = date || new Date();
            return '%b %d'.replace('%b', app.monthNames[date.getMonth()]).replace('%d', date.getDate());
        },
        isMobile: function() {
            //return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            return window.innerWidth < 700;
        }
    });

    return AppView;
});
