requirejs.config({
  shim: {
    bootstrap: {
      deps: [ 'jquery' ]
    }
  },
  paths: {
    'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui'
  }
});

require([
    'backbone',
    'views/app'
], function(Backbone, AppView) {
    'use strict';
    app.appView = new AppView();
});
