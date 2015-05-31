define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var CategoryForm = Backbone.View.extend({
        el: '#category-view',
        events: {
            'click button.submit': 'submit',
            'hide.bs.modal': 'hide'
        },
        submit: function() {
            var formData = this.$el.find('form').serialize();
            $.post('/categories/', formData).then(function(data) {
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

    return CategoryForm;
});
