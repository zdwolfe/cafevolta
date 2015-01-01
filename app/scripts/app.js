(function(window, document, undefined) {
  'use strict';

  // Select auto-binding template and use as the top level of our app
  var app = document.querySelector('#app');
  app.addEventListener('template-bound', function() {
    var pages = document.querySelector('#pages');
    var cafeVoltaPage = document.querySelector('cafe-volta-page');

    // Setup routing
    var DEFAULT_ROUTE = '';

    var labels = function(label) {
      if (!app.posts) {
        return app.router.setRoute(DEFAULT_ROUTE);
      }
      cafeVoltaPage.label = label;
      pages.selected = 0;
    };

    var routes = {
      '/labels/:label': labels,
    };

    var router = app.router = Router(routes);
    router.configure({html5history: true});
    router.init(DEFAULT_ROUTE);
    // Listen for pages to fire their change-route event
    // Instead of letting them change the route directly,
    // handle the event here and change the route for them
    document.addEventListener('change-route', function(e) {
      if (e.detail) {
        router.setRoute(e.detail);
      }
    });
    // Similar to change-route, listen for when a page wants to go
    // back to the previous state and change the route for them
    document.addEventListener('change-route-back', function() {
      history.back();
    });

    // Handle page transitions
    pages.addEventListener('core-animated-pages-transition-prepare', function() {
      pages.selectedItem.querySelector('.page').willPrepare();
    });

    // Set duration for core-animated-pages transitions
    CoreStyle.g.transitions.duration = '0.2s';
  });

})(window, document);
