(function(){
  'use strict';

  $(document).ready(function(){
    $('body').prepend(JST.application());

    $('.fa-close').on('click', function() {
    	$('.fa-close').hide();
    	$('.site-nav-item-branding').fadeOut(100);
    	$('.site-nav-item-description').fadeOut(100);
    	$('.site-nav-item:nth-child(2)').css({'width': '1.5%'});	
    })

    $('.site-nav-item:nth-child(2)').on('mouseenter', function() {
    	if ($('.site-nav-item:nth-child(2)').width() < 100) {
    		$('.site-nav-item:nth-child(2)').css({'width': '100%'});
    		$('.fa-close').fadeIn(1000);
	    	$('.site-nav-item-branding').fadeIn(1000);
	    	$('.site-nav-item-description').fadeIn(1000);
    	}
    })

    $('.fa-arrows-h').on('click', function() {
    	if ($('.filter-form').width() > $('.site-nav-item:first-child').width()) {
    		$('.site-nav-item-filter-form').fadeOut(100);
    		$('.filter-form').css({'width': '1.5%'});	
    	} else {
    		$('.filter-form').css({'width': '100%'});
    		$('.site-nav-item-filter-form').delay(1000).fadeIn(1000);
    	}
    })

  });
})();
