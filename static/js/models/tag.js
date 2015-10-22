'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var Tag = Backbone.Model.extend({
    url: '/tags/',
    defaults: function() {
        return {
            name: '',
            description: '',
            pods: [],
            fav: false
        }
    },
    toggleFavorite: function() {
        this.set('fav', !this.get('fav'));
        this.save();
    }
});

module.exports = Tag;
