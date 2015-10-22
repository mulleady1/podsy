'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var ListenView = Backbone.View.extend({
    className: 'modal fade',
    template: _.template($('#pod-listen-template').html()),
    render: function(data) {
        this.$el.html(this.template(data));
        return this;
    }
});

module.exports = ListenView;
