define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {
    'use strict';

    var SignupView = Backbone.View.extend({
        el: '#signup-view',
        events: {
            'click button.submit': 'submit',
            'focus input': 'removeErrorMessage'
        },
        submit: function(e) {
            e.preventDefault();
            var self = this,
                formData = app.toJson(this.$el.find('form').serialize());

            $.post('/signup/', formData).then(function(data) {
                if (data.success) {
                    location.hash = '';
                    location.reload();
                } else {
                    self.$el.find('form').prepend('<p class="text-warning">{msg}</p>'.replace('{msg}', data.message));
                }
            });
        },
        removeErrorMessage: function() {
            this.$el.find('.text-warning').remove();
        }
    });

    return SignupView;
});
