var Pod = Backbone.Model.extend({
    toggleUpvote: function() {
        console.log('pod.toggleUpvote');    
    },
    toggleDownvote: function() {
        console.log('pod.toggleDownvote');    
    }
});

var Pods = Backbone.Collection.extend({
    model: Pod,
    url: '/pods/'
});

var PodView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#pod-template').html()),
    events: {
        'click .upvote': 'toggleUpvote',
        'click .downvote': 'toggleDownvote'
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    initialize: function() {
        this.render();
    },
    toggleUpvote: function() { 
        console.log('toggleUpvote');    
    },
    toggleDownvote: function() {
        console.log('toggleDowvote');    
    }
});

var PodListView = Backbone.View.extend({
    podViews: [],
    add: function(podView) {
        this.podViews.push(podView);
        this.$el.append(podView.$el);
    },
    remove: function(podView) {
    }
});

$(document).ready(function() {
    var pods        = new Pods(),
        podListView = new PodListView({ el: $('#pods-list')[0] });
    pods.fetch({
        success: function(collection, response, options) {
            console.log('pods.fetch.success.response: ' + response);
            for (var i = 0; i < collection.models.length; i++) {
                var model = collection.models[i];
                var podView = new PodView({ model: model });
                podListView.add(podView);
            }
        }
    });
});
