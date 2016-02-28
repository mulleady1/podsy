'use strict';

var Backbone = require('backbone'),
    Tags = require('../collections/tags'),
    TagView = require('./tag'),
    util = require('../util');

var TagContainer = Backbone.View.extend({
    el: '#tags-view',
    events: {
        'keyup input[name="tag-search"]': 'onKeyUp'
    },
    initialize: function() {
        this.tags = new Tags();
        this.listenTo(this.tags, 'reset', this.addTags);
    },
    show: function(data) {
        this.focusedTagIndex = -1;
        this.$el.show();
        this.data = data;
        this.tags.reset(data);
        var onKeyDown = this.onKeyDown.bind(this);
        $(document).on('keydown', onKeyDown);
        app.router.once('route', function(e) {
            $(document).off('keydown', onKeyDown);
        });
    },
    addTag: function(tag) {
        var tagView = new TagView({ model: tag });
        this.$('#tags-list').append(tagView.render().el);
    },
    addTags: function() {
        this.$('#tags-list').html('');
        this.tags.each(this.addTag, this);
    },
    onKeyDown: function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.which === 38) {
            this.focusTag(false);
        } else if (e.which === 40) {
            this.focusTag(true);
        } else if (e.which === 13 && this.focusedTagIndex > -1) {
            var tag = this.tags.at(this.focusedTagIndex);
            var url = '#/pods/tags/{tagName}/'.replace('{tagName}', tag.get('name'));
            app.router.navigate(url, { trigger: true });
        }
    },
    onKeyUp: function(e) {
        var val = e.target.value.trim();
        if (val.trim().length > 0) {
            this.filteredTags = this.data.filter(function(tag) {
                return tag.name.indexOf(val) > -1;
            });
            this.tags.reset(this.filteredTags);
        } else if (this.filteredTags) {
            this.filteredTags = null;
            this.tags.reset(this.data);
        }
    },
    focusTag: function(isNext) {
        var index,
            tagsList = this.$('#tags-list > li'),
            len = tagsList.length;

        if (this.focusedTagIndex === -1) {
            index = 0;
        } else {
            index = this.focusedTagIndex + (isNext ? 1 : -1);
            if (index < 0) {
                index = 0;
            } else if (index >= len) {
                index = len - 1;
            }
        }

        this.focusedTagIndex = index;
        tagsList.removeClass('focused');
        var focusedTagView = tagsList.get(index);
        $(focusedTagView).addClass('focused');
        if (!util.isElementInViewport(focusedTagView)) {
            if (index === 0) {
                document.body.scrollTop = 0;
            } else {
                focusedTagView.scrollIntoViewIfNeeded();
            }
        }
    }
});

module.exports = TagContainer;
