define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var CategoryForm = Backbone.View.extend({
        el: '#category-view',
        events: {
            'click button.submit': 'submit'
        },
        submit: function() {
            var formData = app.toJson(this.$el.find('form').serialize());
            $.post('/categories/', formData).then(function(data) {
                if (data.success) {
                    location.hash = '';
                    location.reload();
                }
            });
        }
    });

    return CategoryForm;
});
