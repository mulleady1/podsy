requirejs.config({
  shim: {
    bootstrap: {
      deps: [ 'jquery' ]
    }
  }
});

require([
    'backbone',
    'views/app'
], function(Backbone, AppView) {
    'use strict';
    app.appView = new AppView();
});
