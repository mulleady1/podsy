define([
    'backbone',
    'jquery-ui'
], function(Backbone) {
    var UploadView = Backbone.View.extend({
        el: '#upload',
        events: {
            'click button.submit': 'submit',
            'shown.bs.modal': 'show',
            'hide.bs.modal': 'hide'
        },
        show: function() {
            this.$el.find('[name="tags"]').autocomplete({
                source: app.tagsData,
                select: function(event, ui) {
                    debugger;
                }
            })
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
