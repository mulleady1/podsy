'use strict';

var Backbone = require('backbone');

var Pod = Backbone.Model.extend({
    urlRoot: '/pods/',
    defaults: function() {
        return {
            fav: false,
            upToggled: false,
            downToggled: false,
            upToggleRemoved: false,
            downToggleRemoved: false,
            tags: [],
            points: 0,
            user: null
        }
    },
    toggleUpvote: function() {
        var points = this.get('points');
        if (this.get('upToggled')) {
            this.set('upToggled', false);
            this.set('upToggleRemoved', true);
            this.set('points', --points);
        } else {
            this.set('upToggled', true);
            this.set('upToggleRemoved', false);
            this.set('points', ++points);
        }

        if (this.get('downToggled')) {
            this.set('downToggled', false);
            this.set('downToggleRemoved', true);
            this.set('points', ++points);
        }

        this.save();

        // Reset for next time.
        this.set('upToggleRemoved', false);
        this.set('downToggleRemoved', false);
    },
    toggleDownvote: function() {
        var points = this.get('points');
        if (this.get('downToggled')) {
            this.set('downToggled', false);
            this.set('downToggleRemoved', true);
            this.set('points', ++points);
        } else {
            this.set('downToggled', true);
            this.set('downToggleRemoved', false);
            this.set('points', --points);
        }

        if (this.get('upToggled')) {
            this.set('upToggled', false);
            this.set('upToggleRemoved', true);
            this.set('points', --points);
        }

        this.save();

        // Reset for next time.
        this.set('upToggleRemoved', false);
        this.set('downToggleRemoved', false);
    },
    toggleFavorite: function() {
        this.set('fav', !this.get('fav'));
        this.save();
    },
    listen: function() {
        this.trigger('listen');
    }
});

module.exports = Pod;
