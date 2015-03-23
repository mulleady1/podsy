define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {
    'use strict';

    var SigninView = Backbone.View.extend({
        el: '#signin',
        events: {
            'click button.submit': 'submit'
        },
        submit: function() {
            this.$el.find('form').submit();
        }
    });

    return SigninView;
});
