define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var UploadView = Backbone.View.extend({
        el: '#upload',
        events: {
            'click button.submit': 'submit',
            'hide.bs.modal': 'hide'
        },
        submit: function() {
            var formData = this.$el.find('.tab-pane.active form').serialize();
            $.post('/pods/', formData).then(function(data) {
                if (data.success) {
                    location.hash = '';
                    location.reload();
                }
            });
        },
        hide: function() {
            history.back();
        }
    });

    return UploadView;
});
