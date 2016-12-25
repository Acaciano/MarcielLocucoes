'use strict';
angular.module('app').controller('HomeController', function ($scope) {
    if ($('.boxed .fullscreen-bg').length > 0) {
        $("body").addClass("transparent-page-wrapper");
    };

    $(window).load(function () {
        $("body").removeClass("no-trans");
    });
    // Enable Smooth Scroll only on Chrome and only on Win and Linux Systems
    var platform = navigator.platform.toLowerCase();
    if ((platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) && !Modernizr.touch) {
        if ($.browser.webkit) {
            $.webkitSmoothScroll();
            console.log("hello webkit");
        }
    };
    //Show dropdown on hover only for desktop devices
    //-----------------------------------------------
    var delay = 0, setTimeoutConst;
    if ((Modernizr.mq('only all and (min-width: 768px)') && !Modernizr.touch) || $("html.ie8").length > 0) {
        $('.main-navigation:not(.onclick) .navbar-nav>li.dropdown, .main-navigation:not(.onclick) li.dropdown>ul>li.dropdown').hover(
        function () {
            var $this = $(this);
            setTimeoutConst = setTimeout(function () {
                $this.addClass('open').slideDown();
                $this.find('.dropdown-toggle').addClass('disabled');
            }, delay);

        }, function () {
            clearTimeout(setTimeoutConst);
            $(this).removeClass('open');
            $(this).find('.dropdown-toggle').removeClass('disabled');
        });
    };

    //Show dropdown on click only for mobile devices
    //-----------------------------------------------
    if (Modernizr.mq('only all and (max-width: 767px)') || Modernizr.touch || $(".main-navigation.onclick").length > 0) {
        $('.main-navigation [data-toggle=dropdown], .header-top [data-toggle=dropdown]').on('click', function (event) {
            // Avoid following the href location when clicking
            event.preventDefault();
            // Avoid having the menu to close when clicking
            event.stopPropagation();
            // close all the siblings
            $(this).parent().siblings().removeClass('open');
            // close all the submenus of siblings
            $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
            // opening the one you clicked on
            $(this).parent().toggleClass('open');
        });
    };

    //Transparent Header Calculations
    var timer_tr;
    if ($(".transparent-header").length > 0) {
        $(window).load(function () {
            trHeaderHeight = $("header.header").outerHeight();
            $(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
        });
        $(window).resize(function () {
            if ($(this).scrollTop() < headerTopHeight + headerHeight - 5) {
                trHeaderHeight = $("header.header").outerHeight();
                $(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
            }
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() == 0) {
                if (timer_tr) {
                    window.clearTimeout(timer_tr);
                };
                timer_tr = window.setTimeout(function () {
                    trHeaderHeight = $("header.header").outerHeight();
                    $(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
                }, 300);
            };
        });
    }

    if ($(".transparent-header .slideshow").length > 0) {
        $(".header-container header.header").addClass("transparent-header-on");
    } else {
        $(".header-container header.header").removeClass("transparent-header-on");
    }

    //Full Width Slider with Transparent Header Calculations
    if ($(".transparent-header .slider-banner-fullwidth-big-height").length > 0) {
        if (Modernizr.mq('only all and (max-width: 991px)')) {
            $("body").removeClass("transparent-header");
            $(".header-container header.header").removeClass("transparent-header-on");
            $(".tp-bannertimer").css("marginTop", "0px");
            $("body").addClass("slider-banner-fullwidth-big-height-removed");
        } else {
            $("body").addClass("transparent-header");
            $(".header-container header.header").addClass("transparent-header-on");
            $("body").removeClass("slider-banner-fullwidth-big-height-removed");
        }
    };

    if ($(".transparent-header .slider-banner-fullwidth-big-height").length > 0 || $(".slider-banner-fullwidth-big-height-removed").length > 0) {
        $(window).resize(function () {
            if (Modernizr.mq('only all and (max-width: 991px)')) {
                $("body").removeClass("transparent-header");
                $(".header-container header.header").removeClass("transparent-header-on");
                $(".tp-bannertimer").css("marginTop", "0px");
            } else {
                $("body").addClass("transparent-header");
                $(".header-container header.header").addClass("transparent-header-on");
            }
        });
    };

    //Revolution Slider 4
    if ($(".slider-banner-container").length > 0) {

        $(".tp-bannertimer").show();

        $('body:not(.transparent-header) .slider-banner-container .slider-banner-fullscreen').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 520,
            fullWidth: "off",
            fullScreen: "on",
            fullScreenOffsetContainer: ".header-container",
            fullScreenOffset: "0",

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            spinner: "spinner2",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",
            hideTimerBar: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });
        $('.transparent-header .slider-banner-container .slider-banner-fullscreen').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 520,
            fullWidth: "off",
            fullScreen: "on",
            fullScreenOffsetContainer: ".header-top",
            fullScreenOffset: "",

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            spinner: "spinner2",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",
            hideTimerBar: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.slider-banner-container .slider-banner-fullwidth').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "on",

            spinner: "spinner2",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.slider-banner-container .slider-banner-fullwidth-big-height').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 650,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "on",

            spinner: "spinner2",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.banner:not(.dark-bg) .slider-banner-container .slider-banner-boxedwidth').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "off",

            spinner: "spinner2",
            shadow: 1,

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.banner.dark-bg .slider-banner-container .slider-banner-boxedwidth').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "off",

            spinner: "spinner2",
            shadow: 3,

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.slider-banner-container .slider-banner-boxedwidth-no-shadow').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "off",

            spinner: "spinner2",
            shadow: 0,

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.banner:not(.dark-bg) .slider-banner-container .slider-banner-boxedwidth-stopped').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "off",

            spinner: "spinner2",
            shadow: 1,

            stopLoop: "off",
            stopAfterLoops: 0,
            stopAtSlide: 1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

        $('.banner.dark-bg .slider-banner-container .slider-banner-boxedwidth-stopped').show().revolution({
            delay: 8000,
            startwidth: 1140,
            startheight: 450,

            navigationArrows: "solo",

            navigationStyle: "preview2",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 0,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 0,
            soloArrowRightVOffset: 0,

            fullWidth: "off",

            spinner: "spinner2",
            shadow: 3,

            stopLoop: "off",
            stopAfterLoops: 0,
            stopAtSlide: 1,
            onHoverStop: "off",

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });

    };

    //Revolution Slider 5
    if ($(".slider-revolution-5-container").length > 0) {
        $(".tp-bannertimer").show();

        $('body:not(.transparent-header) .slider-revolution-5-container .slider-banner-fullscreen').revolution({
            sliderType: "standard",
            sliderLayout: "fullscreen",
            delay: 9000,
            autoHeight: "on",
            responsiveLevels: [1199, 991, 767, 480],
            fullScreenOffsetContainer: ".header-container, .offset-container",
            navigation: {
                onHoverStop: "off",
                arrows: {
                    style: "hebe",
                    enable: true,
                    tmp: '<div class="tp-title-wrap"><span class="tp-arr-titleholder">{{title}}</span></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0,
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: "",
                    enable: true,
                    hide_onleave: true,
                    direction: "horizontal",
                    space: 3,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20
                }
            },
            gridwidth: 1140,
            gridheight: 750
        });
        $('.transparent-header .slider-revolution-5-container .slider-banner-fullscreen').revolution({
            sliderType: "standard",
            sliderLayout: "fullscreen",
            delay: 9000,
            autoHeight: "on",
            responsiveLevels: [1199, 991, 767, 480],
            fullScreenOffsetContainer: ".header-top, .offset-container",
            navigation: {
                onHoverStop: "off",
                arrows: {
                    style: "hebe",
                    enable: true,
                    tmp: '<div class="tp-title-wrap"><span class="tp-arr-titleholder">{{title}}</span></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0,
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: "",
                    enable: true,
                    hide_onleave: true,
                    direction: "horizontal",
                    space: 3,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20
                }
            },
            gridwidth: 1140,
            gridheight: 750
        });
        $('.slider-revolution-5-container .slider-banner-fullwidth').revolution({
            sliderType: "standard",
            sliderLayout: "fullwidth",
            delay: 8000,
            gridwidth: 1140,
            gridheight: 450,
            responsiveLevels: [1199, 991, 767, 480],
            navigation: {
                onHoverStop: "off",
                arrows: {
                    style: "hebe",
                    enable: true,
                    tmp: '<div class="tp-title-wrap"><span class="tp-arr-titleholder">{{title}}</span></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0,
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: "",
                    enable: true,
                    hide_onleave: true,
                    direction: "horizontal",
                    space: 3,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20
                }
            }
        });
        $('.slider-revolution-5-container .slider-banner-fullwidth-big-height').revolution({
            sliderType: "standard",
            sliderLayout: "fullwidth",
            delay: 8000,
            gridwidth: 1140,
            gridheight: 650,
            responsiveLevels: [1199, 991, 767, 480],
            navigation: {
                onHoverStop: "off",
                arrows: {
                    style: "hebe",
                    enable: true,
                    tmp: '<div class="tp-title-wrap"><span class="tp-arr-titleholder">{{title}}</span></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0,
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: "",
                    enable: true,
                    hide_onleave: true,
                    direction: "horizontal",
                    space: 3,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20
                }
            }
        });
        $('.slider-revolution-5-container .slider-banner-boxedwidth').revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            delay: 8000,
            gridwidth: 1140,
            gridheight: 450,
            responsiveLevels: [1199, 991, 767, 480],
            shadow: 1,
            navigation: {
                onHoverStop: "off",
                arrows: {
                    style: "hebe",
                    enable: true,
                    tmp: '<div class="tp-title-wrap"><span class="tp-arr-titleholder">{{title}}</span></div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0,
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: "",
                    enable: true,
                    hide_onleave: true,
                    direction: "horizontal",
                    space: 3,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20
                }
            }
        });
        $('.slider-revolution-5-container .slider-banner-fullscreen-hero:not(.dotted)').revolution({
            sliderType: "hero",
            sliderLayout: "fullscreen",
            autoHeight: "on",
            gridwidth: 1140,
            gridheight: 650,
            responsiveLevels: [1199, 991, 767, 480],
            delay: 9000,
            fullScreenOffsetContainer: ".header-top, .offset-container"
        });
        $('.slider-revolution-5-container .slider-banner-fullscreen-hero.dotted').revolution({
            sliderType: "hero",
            sliderLayout: "fullscreen",
            autoHeight: "on",
            gridwidth: 1140,
            gridheight: 650,
            dottedOverlay: "twoxtwo",
            delay: 9000,
            responsiveLevels: [1199, 991, 767, 480],
            fullScreenOffsetContainer: ".header-top, .offset-container"
        });
        $('.slider-revolution-5-container .slider-banner-fullwidth-hero:not(.dotted)').revolution({
            sliderType: "hero",
            sliderLayout: "fullwidth",
            gridwidth: 1140,
            gridheight: 650,
            responsiveLevels: [1199, 991, 767, 480],
            delay: 9000
        });
        $('.slider-revolution-5-container .slider-banner-fullwidth-hero.dotted').revolution({
            sliderType: "hero",
            sliderLayout: "fullwidth",
            gridwidth: 1140,
            gridheight: 650,
            responsiveLevels: [1199, 991, 767, 480],
            delay: 9000,
            dottedOverlay: "twoxtwo"
        });
    };

    //Full Page
    if ($(".fullpage-site").length > 0 || $(".fullpage-site-with-menu").length > 0) {
        $('.fullpage-site').fullpage({
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Intro', 'About', 'Portfolio', 'Clients', 'Contact Us'],
            fixedElements: '.header-container, .subfooter',
            responsiveWidth: 992,
            responsiveHeight: 600
        });
        $('.fullpage-site-with-menu').fullpage({
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Intro', 'About', 'Menu', 'Reviews', 'Contact Us'],
            fixedElements: '.header-container, .subfooter',
            responsiveWidth: 992,
            responsiveHeight: 600,
            menu: '#fullpage-menu',
        });
    };
});

