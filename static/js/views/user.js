'use strict';

var Backbone = require('backbone');

var UserView = Backbone.View.extend({
    el: '#user-view',
    template: _.template($('#user-template').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    show: function(user) {
        this.model = user;
        this.render();
        this.$el.show();
    }
});

module.exports = UserView;
