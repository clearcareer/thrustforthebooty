/*
Template Name: Event
Author: TrendyTheme
Version: 1.0
*/

;(function () {

    "use strict"; // use strict to start
    
    var scrollDirection, $ = jQuery;

    $(document).ready(function () {


        /* === Preloader === */
        $(window).on('load', function() {
            $("body").imagesLoaded(function(){
                $(".tt-preloader-wave").fadeOut();
                $("#tt-preloader").delay(200).fadeOut("slow").remove();
            });
        });


        // for scrolling to targeted sections

        (function($){
            $.fn.scrollingTo = function( opts ) {
                var defaults = {
                    animationTime : 1000,
                    easing : '',
                    topSpace : 0,
                    callbackBeforeTransition : function(){},
                    callbackAfterTransition : function(){}
                };

                var config = $.extend( {}, defaults, opts );

                $(this).on('click', function(e){
                    var eventVal = e;
                    e.preventDefault();

                    var $section = $(document).find( $(this).data('section') );
                    if ( $section.length < 1 ) {
                        return false;
                    }

                    if ( $('html, body').is(':animated') ) {
                        $('html, body').stop( true, true );
                    }

                    var scrollPos = $section.offset().top;

                    if ( $(window).scrollTop() == ( scrollPos + config.topSpace ) ) {
                        return false;
                    }

                    config.callbackBeforeTransition(eventVal, $section);

                    var newScrollPos = (scrollPos - config.topSpace);

                    $('html, body').animate({
                        'scrollTop' : ( newScrollPos+'px' )
                    }, config.animationTime, config.easing, function(){
                        config.callbackAfterTransition(eventVal, $section);
                    });

                    return $(this);
                });

                $(this).data('scrollOps', config);
                return $(this);
            };
        }(jQuery));




        $('.menu-smooth-scroll').scrollingTo({
            easing : 'easeOutQuart',
            animationTime : 1800,
            callbackBeforeTransition : function(e){
                if (e.currentTarget.hash !== "") {
                    if ( e.currentTarget.hash !== '#home' ) {
                        $(e.currentTarget).parent().addClass('current').siblings().removeClass('current');
                    }
                }

                $('.button-collapse').sideNav('hide');
            },
            callbackAfterTransition : function(e){
                if (e.currentTarget.hash !== "") {
                    if ( e.currentTarget.hash === '#home' ) {
                        window.location.hash = '';
                    } else {
                        window.location.hash = e.currentTarget.hash;
                    }

                }
            }
        });



        $(".primary-nav .button-collapse").sideNav();



        // Menu animations plugin
        (function(){
            function Menu($element, options){

                var handler,
                defaults = {
                    domObj : $element,
                    className : 'small-menu',
                    position : '100px',
                    onIntellingenceMenu : function(){},
                    onNormalMenu : function(){}
                },
                config = $.extend({}, defaults, options),
                coreFuns = {
                    displayMenu : function(){
                        if ( config.domObj.hasClass(config.className) ) {
                            config.domObj.removeClass(config.className);
                        }
                    },
                    hideMenu : function(){
                        if ( !config.domObj.hasClass(config.className) ) {
                            config.domObj.addClass(config.className);
                        }
                    }
                },
                publicFuns = {
                    intelligent_menu : function(){

                        var lastScrollTop = 0, direction;

                        if ( handler != undefined ) {
                            $(window).unbind('scroll', handler);
                        }

                        handler = function(e){
                            if (e.currentTarget.scrollY > lastScrollTop){
                                direction = 'down';
                            } else {
                                direction = 'up';
                            }
                            lastScrollTop = e.currentTarget.scrollY;

                            // check is user scrolling to up or down?
                            if ( direction == 'up' ) {
                            // so you are scrolling to up...

                                // lets display menu
                                coreFuns.displayMenu();

                            } else {
                            // so you are scrolling to down...

                                // se we have to hide only the small menu because the normal menu isn't sticky!
                                coreFuns.hideMenu();
                            }
                        };
                        $(window).bind('scroll', handler);

                        config.onNormalMenu();
                    },
                    fixed_menu : function(){
                        if ( handler != undefined ) {
                            $(window).unbind('scroll', handler);
                        }

                        handler = function(e){
                            // check have we display small menu or normal menu ?
                            coreFuns.displayMenu();
                        };

                        $(window).bind('scroll', handler);

                        config.onNormalMenu();
                    }
                };

                return publicFuns;
            }

            $.fn.menu = function( options ){
                var $element = this.first();
                var menuFuns = new Menu( $element, options );
                return menuFuns;
            };

        })();


        // call to Menu plugin
        var menuFun = $('header').menu({
            className : 'hide-menu',
            position : '100px'
        });

        window.menuFun = menuFun;


        /* Choose your navigation style */

        menuFun.intelligent_menu(); // Hide intelligently
        // menuFun.fixed_menu(); // Always fixed



        // window scroll Sections scrolling

        (function(){
            var sections = $(".scroll-section");

            function getActiveSectionLength(section, sections) {
                return sections.index(section);
            }
            
            if ( sections.length > 0 ) {


                sections.waypoint({
                    handler: function(event, direction) {
                        var active_section, active_section_index, prev_section_index;
                        active_section = $(this);
                        active_section_index = getActiveSectionLength($(this), sections);
                        prev_section_index = ( active_section_index - 1 );

                        if (direction === "up") {
                            scrollDirection = "up";
                            if ( prev_section_index < 0 ) {
                                active_section = active_section;
                            } else {
                                active_section = sections.eq(prev_section_index);
                            }
                        } else {
                            scrollDirection = "Down";
                        }


                        if ( active_section.attr('id') != 'home' ) {
                            var active_link = $('.menu-smooth-scroll[href="#' + active_section.attr("id") + '"]');
                            active_link.parent('li').addClass("current").siblings().removeClass("current");
                        } else {
                            $('.menu-smooth-scroll').parent('li').removeClass('current');
                        }
                    },
                    offset: '35%'
                });
            }

        }());




        /* === Tab to Collapse === */
        if ($('.nav-tabs').length > 0) {
           $('.nav-tabs').tabCollapse();
        }



        /* === Init WOW js === */
        (function () {

            new WOW({
                mobile:  false
            }).init();

        }());



        /* === Detect IE version === */
        (function () {
            
            function getIEVersion() {
                var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
                return match ? parseInt(match[1], 10) : false;
            }

            if( getIEVersion() ){
                $('html').addClass('ie'+getIEVersion());
            }

        }());



        /* === CountDown === */
        if ($('.countdown').length > 0) {

            var ttCountdown = $(this).find('.countdown');

            var ttDate = ttCountdown.attr('data-date');

            ttCountdown.countdown({
                date: ttDate,
                format: "on"
            });
        }


        /* === Gallery Thumb Carousel === */
        if ($('.gallery-thumb').length > 0) {
            $('.gallery-thumb').flexslider({
                animation: "slide",
                controlNav: "thumbnails",
            });

        }


        /* ======= Contact Form ======= */
        $('#contactForm').on('submit',function(e){

            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post( $action, $data, function( data ) {

                if( data.response=='error' ){

                    $this.before( '<div class="alert danger-border"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <i class="fa fa-times-circle"></i> '+data.message+'</div>' );
                }

                if( data.response=='success' ){

                    $this.before( '<div class="alert success-border"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><i class="fa fa-thumbs-o-up"></i> '+data.message+'</div>' );
                    $this.find('input, textarea').val('');
                }

            }, "json");

        });


        if ($('.parallax-bg').length > 0) {
            $('.parallax-bg').imagesLoaded( function() {

            	$(window).stellar({
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0,
                    responsive: true,
                    hideDistantElements: true
                });
            });
        }

    });


})(jQuery);

