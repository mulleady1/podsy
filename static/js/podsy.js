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
    url: '/pods'
});

var PodView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#pod-template').html()),
    events: {
        'click .upvote': 'toggleUpvote',
        'click .downvote': 'toggleDownvote'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleUpvote: function() { 
        this.model.toggleUpvote();    
    },
    toggleDownvote: function() {
        this.model.toggleDownvote();    
    }
});

var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function() {
        this.pods = new Pods();
        this.listenTo(this.pods, 'reset', this.addAll);
        this.pods.fetch({ reset: true });
    },
    addOne: function(pod) {
        var podView = new PodView({ model: pod });
        this.$('#pods-list').append(podView.render().el);
    },
    addAll: function() {
        this.$('#pods-list').html('');
        this.pods.each(this.addOne, this);
    }
});

function main() {
    var app = new AppView();
}

main();
