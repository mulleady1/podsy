'use strict';

var Backbone = require('backbone');

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

module.exports = SignupView;
