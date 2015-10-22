'use strict';

var Backbone = require('backbone'),
    Tag = require('../models/tag');

var Tags = Backbone.Collection.extend({
    model: Tag,
    url: '/tags/'
});

module.exports = Tags;
