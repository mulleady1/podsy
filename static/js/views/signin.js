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
            'click button.submit': 'submit',
            'focus input': 'removeErrorMessage',
            'shown.bs.modal': 'show',
            'hide.bs.modal': 'hide'
        },
        submit: function() {
            var self = this,
                formData = this.$el.find('form').serialize();
            $.post('/signin/', formData).then(function(data) {
                if (data.success) {
                    location.hash = '';
                    location.reload();
                } else {
                    self.$el.find('.modal-body').prepend('<p class="text-warning">Invalid username/password.</p>');
                }
            });
        },
        removeErrorMessage: function() {
            this.$el.find('.text-warning').remove();
        },
        show: function() {
            this.$el.find('input[name="email"]').focus();
        },
        hide: function() {
            history.back();
        }
    });

    return SigninView;
});
