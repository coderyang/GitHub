require.config({

	paths: {
		jquery: "lib/jquery.min",
		utils: "lib/utils"
	},

	shim: {
		utils: {
			deps: ['jquery']
		},

		"jquery.scroll-navbar": {
			deps: ['jquery']
		}

	}

});

require(['jquery', 'utils', 'jquery.scroll-navbar'], function(jQuery) {
	var $ = jQuery;
	$(function(){
		$("nav").scrollbar({ inverse: true});
	});
});