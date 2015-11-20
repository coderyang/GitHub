;(function($){

	var $w = $(window),
			timeid = 0,
			lastScrollTop = 0,
			guid = Math.random().toString().substr(2, 8);

	function ScrollNavBar(elem, options) {

		this.$elem = $(elem);

		var defaults = {
			inverse: false,
			threshold: $w.height() / 3 * 2,
			duration: 400
		};

		this.opts = $.extend({}, defaults, options);

		this.$wrapper = $("<div class='navbar-wrapper'></div>");

		this.init();

	}

	var _isActive = function(elem) {

		var $elem = $.isJQueryObj(elem) ? elem : $(elem);

		return $elem.hasClass("active");

	};


	ScrollNavBar.prototype = {

		constructor: ScrollNavBar,

		_readyToShow: function(callback) {
			var self = this;

			if (self.$wrapper.css("position") != "fixed") {
				self.$wrapper.css({
					position: "fixed",
					top: -self.$wrapper.outerHeight(),
					zIndex: 1000
				});
				callback.call(self);
			}

		},

		_scrollInverse: function(scrollTop) {
			
			var self = this;

			if (!this.opts.inverse) {
				return ;
			}

			if (scrollTop < lastScrollTop) {

				if (!_isActive(self.$wrapper) && !self.$wrapper.hasClass("scrolling")) {

					self._readyToShow(self.scrollDown);

				}

			} else {
				if (_isActive(self.$wrapper) && $.isInViewPort(self.$wrapper)) {
					self.scrollUp();
				}
			}

		},

		scrollDown: function() {

			var self = this;

			self.$wrapper.addClass("scrolling");

			self.$wrapper.animate({ top: 0 }, self.opts.duration, function(){
				self.$wrapper.addClass("active");
				self.$wrapper.removeClass("scrolling");
			});

			return self;

		},

		scrollUp: function() {

			var self = this;

			self.$wrapper.removeClass("active").addClass("scrolling");

			self.$wrapper.animate({ top: -self.$wrapper.outerHeight() }, self.opts.duration, function(){

				self.$wrapper.css({
					position: "",
					top: ""
				}).removeClass("scrolling");

			});
		},


		init: function() {


			var self = this,
					topOfElem = 0;
					val = 0;

			if ($(".navbar-wrapper").length > 0) {
				self.$wrapper.attr("class", function(index, className){
					return className + "-" + guid;
				});
			}

			self.$wrapper = self.$elem.wrap(self.$wrapper).parent();

			topOfElem = self.$wrapper.offset().top;

			val = self.$wrapper.outerHeight() + topOfElem + self.opts.threshold,

			$w.on("scroll", function(){

				var scrollTop = $w.scrollTop();

				if (scrollTop < val) {
					if (_isActive(self.$wrapper) && !self.opts.inverse) {
						self.scrollUp();
					}
					return ;
				}

				if (self.opts.inverse) {
					self._scrollInverse(scrollTop);
				} else {

					if ($.isInViewPort(self.$elem)) {
						return ;
					}

					self._readyToShow(self.scrollDown);

				}

				lastScrollTop = scrollTop;
				
			});

			lastScrollTop = $w.scrollTop();

		},

	}

	$.fn.scrollbar = function(opts) {
		return this.each(function(index, elem){
			return new ScrollNavBar(elem, opts);
		});
	}

})(jQuery);