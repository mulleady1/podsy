'use strict';

var Backbone = require('backbone'),
    Category = require('../models/category');

var Categories = Backbone.Collection.extend({
    model: Category,
    url: '/categories/'
});

module.exports = Categories;
