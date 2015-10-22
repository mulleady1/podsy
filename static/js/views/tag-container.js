'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Tags = require('../collections/tags'),
    TagView = require('./tag');

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
        this.$el.show();
        this.data = data;
        this.tags.reset(data);
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
        var val = e.target.value.trim();
        if (val == '') {
            this.tags.reset(this.data);
        } else {
            var filteredTags = this.data.filter(function(tag) {
                return tag.name.indexOf(val) > -1;
            });
            this.tags.reset(filteredTags);
        }
    }
});

module.exports = TagContainer;
