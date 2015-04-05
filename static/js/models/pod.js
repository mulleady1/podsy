define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Pod = Backbone.Model.extend({
        defaults: function() {
            return {
                upToggled: false,
                downToggled: false
            }
        },
        toggleUpvote: function() {
            var up = 1,
                upToggled = true;
            if (this.get('upToggled')) {
                up = -1;
                upToggled = false;
            }
            if (this.get('downToggled')) {
                this.set('downToggled', false);
                up++;
            }
            this.set('upvotes', this.get('upvotes') + up);
            this.set('upToggled', upToggled);
            this.save();
        },
        toggleDownvote: function() {
            var down = 1,
                downToggled = true;
            if (this.get('downToggled')) {
                down = -1;
                downToggled = false;
            }
            if (this.get('upToggled')) {
                this.set('upToggled', false);
                down++;
            }
            this.set('downvotes', this.get('downvotes') + down);
            this.set('downToggled', downToggled);
            this.save();
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
