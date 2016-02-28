'use strict';

var Backbone = require('backbone');

var SigninView = Backbone.View.extend({
    el: '#signin-view',
    events: {
        'click button.submit': 'submit',
        'focus input': 'removeErrorMessage',
        'shown.bs.modal': 'show',
        'hide.bs.modal': 'hide',
        'keypress input': 'keypress'
    },
    submit: function() {
        var self = this,
            formData = app.toJson(this.$el.find('form').serialize());

        this.removeErrorMessage();
        $.post('/signin/', formData).then(function(data) {
            if (data.success) {
                location.hash = '';
                location.reload();
            } else {
                self.$el.find('form').prepend('<p class="text-warning">Invalid username/password.</p>');
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
    },
    keypress: function(e) {
        if (e.keyCode == 13) {
            this.submit();
        }
    }
});

module.exports = SigninView;
