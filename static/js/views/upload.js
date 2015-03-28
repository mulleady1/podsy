define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var UploadView = Backbone.View.extend({
        el: '#upload',
        events: {
            'click button.submit': 'submit',
            'hide.bs.modal': 'close'
        },
        submit: function() {
            this.$el.find('form').submit();
        },
        close: function() {
            history.back();
        }
    });

    return UploadView;
});
