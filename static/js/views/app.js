define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'views/pod',
    'collections/pods'
], function($, _, Backbone, Bootstrap, Router, PodView, Pods) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            this.router = new Router({ pushState: true });
            Backbone.history.start();
            this.pods = new Pods();
            this.listenTo(this.pods, 'reset', this.addPods);
            this.pods.fetch({ reset: true });
        },
        events: {
            'click .dropdown-menu a': 'subcategoryClicked'
        },
        addPod: function(pod) {
            var podView = new PodView({ model: pod });
            this.$('#pods-list').append(podView.render().el);
        },
        addPods: function() {
            this.$('#pods-list').html('');
            this.pods.each(this.addPod, this);
        },
        subcategoryClicked: function() {
          alert();
          var args = arguments;
          this.router.navigate('/subcategories');
        }
    });

    return AppView;
});
