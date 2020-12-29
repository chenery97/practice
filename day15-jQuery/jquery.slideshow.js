;
(function ($) {
  $.fn.extend({
    slideshow: function (index) {
      $(this).eq(index).fadeIn(500).siblings('div').fadeOut(500)
      return $(this)
    }
  })
})(jQuery);