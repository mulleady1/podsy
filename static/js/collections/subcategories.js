'use strict';

var Backbone = require('backbone'),
    Subcategory = require('../models/subcategory');

var Subcategories = Backbone.Collection.extend({
    model: Subcategory,
    url: '/subcategories/'
});

module.exports = Subcategories;
