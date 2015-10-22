'use strict';

var Backbone = require('backbone'),
    Category = require('../models/Category');

var Categories = Backbone.Collection.extend({
    model: Category,
    url: '/categories/'
});

module.exports = Categories;
