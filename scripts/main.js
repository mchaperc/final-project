import router from './router';

(function(){
  'use strict';

  $(document).ready(function(){

  	Backbone.history.start();

    $('body').prepend(JST.application());

    $('.fa-close').on('click', function() {
    	$('.fa-close').hide();
    	$('.site-nav-item-branding').fadeOut(100);
    	$('.site-nav-item-description').fadeOut(100);
    	$('.site-nav-item:nth-child(2)').css({'width': '2.5%'});	
    })

    $('.site-nav-item:nth-child(2)').on('mouseenter', function() {
    	if ($('.site-nav-item:nth-child(2)').width() < 100) {
    		$('.site-nav-item:nth-child(2)').css({'width': '100%'});
    		$('.fa-close').fadeIn(1000);
	    	$('.site-nav-item-branding').fadeIn(1000);
	    	$('.site-nav-item-description').fadeIn(1000);
    	}
    })

  });
})();
