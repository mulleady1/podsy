define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var TagView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#tag-template').html()),
        events: {
            'click .glyphicon.fav': 'toggleFavorite'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            $('input[name="tag-search"]').autocomplete({
                source: app.tagsData,
                select: function(event, ui) {
                    var tag = ui.item.value;
                    location.hash = '#/pods/tags/{tag}/'.replace('{tag}', tag);
                },
                response: function(event, ui) {

                }
             });
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleFavorite: function() {
            if (!app.loggedIn) return;
            this.model.toggleFavorite();
        }
    });

    return TagView;
});
