(function($) {
  "use strict";

  function onScroll() {
    const isBottom =
      $(window).scrollTop() + $(window).height() == $(document).height();

    if (!isBottom) {
      const currentScrollPos = $(document).scrollTop() + 2;
      $(".navbar ul li a#contacts").removeClass("active");

      $(".navbar ul li a").each(function(i) {
        const curLink = $(this);
        const refElem = $(curLink.attr("href"));

        if (
          refElem.position().top <= currentScrollPos &&
          refElem.position().top + refElem.height() > currentScrollPos
        ) {
          $(".navbar ul li a").removeClass("active");
          curLink.addClass("active");
        } else {
          curLink.removeClass("active");
        }
      });
    } else {
      /**
       * hard dengarous code
       *
       * быстрый фикс бага с отсутствием подсветки активной ссылки для секции контактов
       * в данном случае подсветка контаков выполняется по достижению низа страницы
       * если контакты будут не последней секцией, следует убрать эту логику
       */
      $(".navbar ul li a").removeClass("active");
      $(".navbar ul li a[href='#contacts'").addClass("active");
    }
  }

  function toggleNavigation() {
    $(".navbar").toggleClass("is-opened");
    $(".navbar-toggler").toggleClass("open");
  }

  function init() {
    const owl = $(".owl-carousel");

    owl.owlCarousel({
      items: 1,
      center: true,
      nav: true,
      loop: true,
      mouseDrag: false,
      navText: [
        '<img class="arrow arrow-left" src="images/strelka.svg"/>',
        '<img class="arrow arrow-right" src="images/strelka.svg"/>'
      ],
      navClass: ["owl-prev", "owl-next"]
    });

    $('a[href^="#"]').click(function() {
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top
        },
        850,
        "easeInOutExpo"
      );

      toggleNavigation();

      return false;
    });

    $(".navbar-toggler").click(toggleNavigation);

    $(window)
      .scroll(onScroll)
      .scroll();
  }

  $(document).ready(init);
})(jQuery);
