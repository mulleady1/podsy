'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Pod = require('../models/pod');

var PodForm = Backbone.View.extend({
    el: '#pod-form-view',
    events: {
        'click button.submit': 'submit',
        'focus input': 'removeErrorMessage',
        'click .tags-container': 'focusTagElement',
        'keypress input.tag': 'keypress',
        'click span.tag .glyphicon-remove': 'removeTag'
    },
    initialize: function() {
        var self = this;
        this.$el.find('input.tag').autocomplete({
            source: app.tagsData,
            select: function(event, ui) {
                event.preventDefault();
                self.addTagSpan(ui.item.value);
            }
        });
    },
    submit: function() {
        this.removeErrorMessage();
        if (this.$el.find('.tab-pane.active form').hasClass('file')) {
            this.submitFile();
        } else {
            this.submitNoFile();
        }
    },
    submitFile: function() {
        var self = this,
            tags = [],
            form = this.$el.find('.tab-pane.active form'),
            formData = new FormData(form[0]);

        this.$el.find('.tab-pane.active span.tag-value').each(function(span) {
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
            if (data.success) {
                var pod = new Pod(data.pod);
                app.pods.unshift(pod);
                app.podsData.unshift(data.pod);
                self.clearForm();
                location.hash = '#/pods/{id}/'.replace('{id}', pod.get('id'));
            } else {
                form.prepend('<p class="text-warning">Something went wrong.</p>');
            }
        });
    },
    submitNoFile: function() {
        var self = this,
            tags = [],
            form = this.$el.find('.tab-pane.active form'),
            formData = app.getFormData(form),
            button = this.$el.find('.tab-pane.active button.submit'),
            json;

        button.prop('disabled', true);
        button.html('Verifying...');
        this.verifyAudio(formData.audio_url).then(function() {
            button.html('Submit');
            button.prop('disabled', false);
            self.$el.find('.tab-pane.active span.tag-value').each(function() {
                tags.push($(this).html());
            });

            formData.tags = tags;
            json = app.toJson(formData);

            $.post('/pods/', json).then(function(data) {
                if (data.success) {
                    var pod = new Pod(data.pod);
                    app.pods.unshift(pod);
                    app.podsData.unshift(data.pod);
                    self.clearForm();
                    location.hash = '#/pods/{id}/'.replace('{id}', pod.get('id'));
                } else {
                    form.prepend('<p class="text-warning">Something went wrong.</p>');
                }
            });
        }, function() {
            button.html('Submit');
            button.prop('disabled', false);
            form.prepend('<p class="text-warning">That doesn\'t seem to be a URL to a valid audio file. If you\'re sure it\'s correct, click Submit again.</p>');
            self.previousFormData = formData;
            return;
        });
    },
    focusTagElement: function(e) {
        this.$el.find('input.tag').focus();
    },
    keypress: function(e) {
        var input = e.target;
        if (e.keyCode != 13 || input.value.trim() == '') {
            return;
        }
        this.addTagSpan(input.value);
    },
    addTagSpan: function(val) {
        var input = this.$el.find('.tab-pane.active input.tag');
        $('<span class="tag"><span class="tag-value">{val}</span><span class="glyphicon glyphicon-remove"></span></span>'.replace('{val}', val)).insertBefore(input);
        input.val('');
        input.attr('placeholder', '');
    },
    removeTag: function(e) {
        var span = $(e.target).closest('span.tag'),
            input = span.parent().find('input.tag');

        span.remove();

        if (this.$el.find('span.tag').length == 0) {
            input.attr('placeholder', 'Tags');
        }
    },
    removeErrorMessage: function() {
        this.$el.find('.text-warning').remove();
    },
    clearForm: function() {
        this.$el.find('form')[0].reset();
        this.$el.find('form .tags-container span').remove();
        this.$el.find('form .tags-container input').attr('Placeholder', 'Tags');
    },
    verifyAudio: function(src) {
        var isValid = true,
            audio = document.createElement('audio'),
            deferred = $.Deferred();

        $(audio).on('error', function() {
            deferred.reject();
        });

        if (this.previousFormData && this.previousFormData.audio_url == src) {
            deferred.resolve();
            return deferred.promise();
        }

        audio.muted = true;
        audio.src = src;
        audio.load();

        setTimeout(function() {
            if (audio.networkState == audio.NETWORK_NO_SOURCE) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        }, 1500);

        return deferred.promise();
    }
});

module.exports = PodForm;
