define([
    'backbone',
], function(Backbone) {
    var ContactForm = Backbone.View.extend({
        el: '#contact-view',
        events: {
            'submit': 'submit',
            'focus input': 'removeErrorMessage'
        },
        show: function() {
            this.$el.show();
        },
        submit: function(e) {
            e.preventDefault();
            this.removeErrorMessage();
            var form = this.$el.find('form'),
                formData = app.getFormData(form),
                json = app.toJson(formData);

            $.post('/contact/', json).then(function(data) {
                if (data.success) {
                    form[0].reset();
                    location.hash = '#/thanks/';
                } else {
                    var msg = data.message || 'Something went wrong';
                    form.prepend('<p class="text-warning">{msg}</p>'.replace('{msg}', msg));
                }
            });
        },
        removeErrorMessage: function() {
            this.$el.find('.text-warning').remove();
        }
    });

    return ContactForm;
});
