define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Pod = Backbone.Model.extend({
        defaults: function() {
            return {
                upToggled: false,
                downToggled: false,
                upToggleRemoved: false,
                downToggleRemoved: false,
                tags: []
            }
        },
        toggleUpvote: function() {
            if (this.get('upToggled')) {
                this.set('upToggled', false);
                this.set('upToggleRemoved', true);
            } else {
                this.set('upToggled', true);
                this.set('upToggleRemoved', false);
            }

            if (this.get('downToggled')) {
                this.set('downToggled', false);
                this.set('downToggleRemoved', true);
            }

            this.save();

            // Reset for next time.
            this.set('upToggleRemoved', false);
            this.set('downToggleRemoved', false);
        },
        toggleDownvote: function() {
            if (this.get('downToggled')) {
                this.set('downToggled', false);
                this.set('downToggleRemoved', true);
            } else {
                this.set('downToggled', true);
                this.set('downToggleRemoved', false);
            }

            if (this.get('upToggled')) {
                this.set('upToggled', false);
                this.set('upToggleRemoved', true);
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

    return Pod;
});
