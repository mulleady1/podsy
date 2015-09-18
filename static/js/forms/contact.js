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
                console.log(data);
                form[0].reset();
            });
        }
    });

    return ContactForm;
});
