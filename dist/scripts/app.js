require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

(function () {
  'use strict';

  $(document).ready(function () {

    Backbone.history.start();

    $('body').prepend(JST.application());

    $('.fa-close').on('click', function () {
      $('.fa-close').hide();
      $('.site-nav-item-branding').fadeOut(100);
      $('.site-nav-item-description').fadeOut(100);
      $('.site-nav-item:nth-child(2)').css({ 'width': '2.5%' });
    });

    $('.site-nav-item:nth-child(2)').on('mouseenter', function () {
      if ($('.site-nav-item:nth-child(2)').width() < 100) {
        $('.site-nav-item:nth-child(2)').css({ 'width': '100%' });
        $('.fa-close').fadeIn(1000);
        $('.site-nav-item-branding').fadeIn(1000);
        $('.site-nav-item-description').fadeIn(1000);
      }
    });
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'users/:id': 'users',
		'listing/:id': 'listing'
	},

	initialize: function initialize() {},

	index: function index() {},

	users: function users() {},

	listing: function listing() {}

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map