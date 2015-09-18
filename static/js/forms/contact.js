define([
    'backbone',
], function(Backbone) {
    var ContactForm = Backbone.View.extend({
        el: '#contact-view',
        events: {
            'submit': 'submit'
        },
        show: function() {
            this.$el.show();
        },
        submit: function(e) {
            e.preventDefault();
            var form = this.$el.find('form'),
                formData = app.getFormData(form),
                json = app.toJson(formData);

            $.post('/contact/', json).then(function(data) {
                alert(data);
            });
        }
    });

    return ContactForm;
});
