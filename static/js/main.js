require([
    'backbone',
    'views/app'
], function(Backbone, AppView) {
    'use strict';

    Backbone.history.start();
    new AppView();
});
