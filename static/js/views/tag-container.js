define([
    'jquery',
    'underscore',
    'backbone',
    'views/tag',
    'collections/tags',
], function($, _, Backbone, TagView, Tags) {
    var TagContainer = Backbone.View.extend({
        el: '#tags-view',
        events: {
            'keyup input[name="tag-search"]': 'onKeyUp'
        },
        initialize: function() {
            this.tags = new Tags();
            this.listenTo(this.tags, 'reset', this.addTags);
            this.tags.reset(app.tagsData);
            this.applyAutocomplete();
        },
        applyAutocomplete: function() {
            var self = this;
            this.$el.find('input[name="tag-search"]').autocomplete({
                source: app.tagsData,
                select: function(event, ui) {
                    var tag = ui.item.value;
                    location.hash = '#/pods/tags/{tag}/'.replace('{tag}', tag);
                },
                response: function(event, ui) {
                    self.tags.reset(ui.content);
                    self.applyAutocomplete();
                },
                open: function(event, ui) {
                    $('.ui-autocomplete').hide();
                }
            });
        },
        show: function() {
            this.$el.show();
        },
        addTag: function(tag) {
            var tagView = new TagView({ model: tag });
            this.$('#tags-list').append(tagView.render().el);
        },
        addTags: function() {
            this.$('#tags-list').html('');
            this.tags.each(this.addTag, this);
        },
        onKeyUp: function(e) {
            if (e.target.value.trim() == '') {
                this.tags.reset(app.tagsData);
                this.applyAutocomplete();
            }
        }
    });

    return TagContainer;
});
