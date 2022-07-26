// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });

  $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
    if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

    e.preventDefault();
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);
  var $body = $("html");

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.addClass("show");

      return;
    }

    $moveTop.removeClass("show");
  });

  $moveTop.on("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper('.product-slider', {
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    navigation: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
        slidesPerView: 3
      },
      992: {
        spaceBetween: 16,
        slidesPerView: 4
      },
      1200: {
        spaceBetween: 16,
        slidesPerView: 5
      }
    }
  });
});

$(function () {
  addSwiper('.intro-slider', {
    speed: 600,
    loop: true,
    navigation: true,
    pagination: true,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  })[0];
});

$(function () {
  addSwiper('.banner-slider', {
    speed: 800,
    loop: true,
    navigation: true,
    pagination: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  })[0];
});

$(function () {

  const $search = $('.search');

  $('.btn-search').on('click', function () {

    $search.addClass('show');
  });

  $('.search__close').on('click', function () {

    $search.removeClass('show');
  });
});

$(function () {

  const $window = $(window);

  const $content = $('.intro-slider__content');

  const $frame = $('.intro-slider__frame');

  if (!$frame.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {

    const windowHeight = $window.height();

    const scrollTop = $window.scrollTop();

    const framePos = $frame.offset().top - windowHeight * 2 / 3 - scrollTop + $frame.outerHeight() / 2;

    const contentPos = $content.offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 2;

    $content.css('transform', `translateX(-${contentPos > 0 ? Math.floor(contentPos / 2) : 0}px)`);

    $frame.css('transform', `translateX(${framePos > 0 ? Math.floor(framePos / 2) : 0}px)`);
  }
});

$(function () {

  const $window = $(window);

  const $content = $('.parallax-1');

  if (!$content.length || $window.width() < 992) return;

  $window.on('scroll', calcPos);

  function calcPos() {

    const windowHeight = $window.height();

    const scrollTop = $window.scrollTop();

    $content.each(function () {

      const contentPos = $(this).offset().top - windowHeight * 2 / 3 - scrollTop + $content.outerHeight() / 3;

      $(this).css('transform', `translateY(${contentPos > 0 ? Math.floor(contentPos / 5) : 0}px)`);
    });
  }
});

$(function () {

  new WOW().init();

  floating();
});

// floating

function floating() {

  $(".floating").each(function () {

    var $floating = $(this),
        width = $floating.width(),
        offsetLeft = $floating.offset().left,
        offsetTop = $floating.offset().top;

    $floating.data("offsetLeft", offsetLeft).data("offsetTop", offsetTop).css({

      width: width

    });
  });

  if ($(window).width() < 992) {

    return;
  }

  $(window).on("scroll", function () {

    $(".floating").each(function () {

      var $floating = $(this),
          offsetTop = $floating.data("offsetTop"),
          offsetLeft = $floating.data("offsetLeft"),
          height = $floating.outerHeight(),
          outerHeight = $floating.outerHeight(true),
          $container = $floating.closest(".floating-container"),
          dataTop = $floating.data("top"),
          top = dataTop !== undefined ? parseInt(dataTop) : 70,
          containerHeight = $container.outerHeight(),
          containerOffsetTop = $container.offset().top,
          scrollTop = $(window).scrollTop(),
          paddingLeft = $container.css('padding-left');

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {

        return;
      } else if (scrollTop + top <= offsetTop) {

        $(this).css({

          position: "static"

        });
      } else if (scrollTop + height + top > containerHeight + containerOffsetTop) {

        $(this).css({

          position: "absolute",

          zIndex: 2,

          top: "auto",

          bottom: 0,

          left: paddingLeft || 0

        });
      } else {

        $(this).css({

          position: "fixed",

          zIndex: 2,

          top: top,

          left: offsetLeft,

          bottom: "auto"

        });
      }
    });
  });
}