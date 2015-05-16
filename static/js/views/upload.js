define([
    'backbone',
    'jquery-ui'
], function(Backbone) {
    var UploadView = Backbone.View.extend({
        el: '#upload',
        events: {
            'click button.submit': 'submit',
            'shown.bs.modal': 'show',
            'hide.bs.modal': 'hide',
            'click .tags-container': 'focusTagElement',
            'keypress input.tag': 'keypress',
            'click span.tag .glyphicon-remove': 'removeTag'
        },
        show: function() {
            this.$el.find('input.tag').autocomplete({
                source: app.tagsData,
                select: function(event, ui) {
                    debugger;
                }
            });
        },
        submit: function() {
            if (this.$el.find('.tab-pane.active form').hasClass('file')) {
                this.submitFile();
            } else {
                this.submitNoFile();
            }
        },
        submitFile: function() {
            var tags = [],
                formData = new FormData(this.$el.find('.tab-pane.active form')[0]);

            this.$el.find('span.tag-value').each(function(span) {
                tags.push($(this).html());
            });

            formData.append('tags', tags);

            var settings = {
                url: '/pods/',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            };

            $.ajax(settings).then(function(data) {
                debugger;
                if (data.success) {
                    location.hash = '';
                    location.reload();
                }
            });
        },
        submitNoFile: function() {
            var tags = [],
                formData = app.toJs(this.$el.find('.tab-pane.active form').serialize()),
                json;

            this.$el.find('span.tag-value').each(function(span) {
                tags.push($(this).html());
            });

            formData.tags = tags;
            json = app.toJson(formData);

            $.post('/pods/', json).then(function(data) {
                if (data.success) {
                    location.hash = '';
                    location.reload();
                }
            });
        },
        hide: function() {
            history.back();
        },
        focusTagElement: function(e) {
            this.$el.find('input.tag').focus();
        },
        keypress: function(e) {
            if (e.keyCode != 13) {
                return;
            }
            var input = e.target;
            $('<span class="tag"><span class="tag-value">{val}</span><span class="glyphicon glyphicon-remove"></span></span>'.replace('{val}', input.value)).insertBefore(this.$el.find('input.tag'));
            input.value = '';
            input.removeAttribute('placeholder');
        },
        removeTag: function(e) {
            var span = $(e.target).closest('span.tag'),
                input = span.parent().find('input.tag');

            span.remove();

            if (this.$el.find('span.tag').length == 0) {
                input.attr('placeholder', 'Tags');
            }
        }
    });

    return UploadView;
});
