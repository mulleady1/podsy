'use strict';

var Backbone = require('backbone'),
    Subcategory = require('../models/Subcategory');

var Subcategories = Backbone.Collection.extend({
    model: Subcategory,
    url: '/subcategories/'
});

module.exports = Subcategories;
