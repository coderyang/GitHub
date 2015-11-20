;(function($){

  $.addLoadEvent = function(func) {
    var old = window.onload;
    if (typeof window.onload !== 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (typeof old === 'function') {
          old();
        }
        func();
      };
    }
  };

  $.isJQueryObj = function(elem) {
    return typeof jQuery == "function" && elem instanceof jQuery;
  };

  $.isInViewPort = function(elem) {
    var $elem = null,
        rect = null;
        $w = $(window);

    if (elem.nodeType == 1) {
      $elem = $(elem);
    }

    if ($.isJQueryObj(elem)) {
      $elem = elem;
    }

    if ($elem[0].getBoundingClientRect) {
      rect = $elem[0].getBoundingClientRect();
      return !((rect.bottom < 0) || (rect.top > $w.height()));
    }

    var topOfElem = $elem.offset().top,
        bottomOfElem = $elem.offset().top + $elem.outerHeight(),
        scrollTop = $w.scrollTop();

    return (scrollTop >= topOfElem && scrollTop < bottomOfElem ) ||
           (scrollTop < topOfElem && scrollTop + $w.height() >= bottomOfElem) ||
           (scrollTop + $w.height() >= topOfElem && scrollTop + $w.height() < bottomOfElem);
  };

  $.isFullInViewPort = function(elem) {
    var $elem = null,
        rect = null;
    if (elem.nodeType == 1) {
      $elem = $(elem);
    }

    if ($.isJQueryObj(elem)) {
      $elem = elem;
    }

    if ($elem[0].getBoundingClientRect) {
      rect = $elem[0].getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= $(window).height(); 
    } else {
      var topOfElem = $elem.offset().top,
          bottomOfElem = $elem.offset().top + $elem.outerHeight(),
          $w = $(window),
          scrollTop = $w.scrollTop();
      return (scrollTop <= topOfElem && scrollTop + $w.height() >= bottomOfElem);
    }
  }

})(jQuery);

