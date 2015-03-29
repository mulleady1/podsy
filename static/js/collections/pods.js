define([
    'models/pod'
], function(Pod) {
    'use strict';

    var Pods = Backbone.Collection.extend({
        model: Pod,
        url: '/pods/'
    });

    return Pods;
});
