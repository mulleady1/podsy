'use strict';

var Backbone = require('backbone'),
    Pod = require('../models/pod');

var Pods = Backbone.Collection.extend({
    model: Pod,
    url: '/pods/'
});

module.exports = Pods;
