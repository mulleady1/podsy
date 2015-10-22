'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Message = require('../models/message');

var AccountView = Backbone.View.extend({
    el: '#account-view',
    show: function() {
        this.$el.show();
    }

});

module.exports = AccountView;
