function targetWidth(gal)
{
    if ($(window).width() < 722) {
        return 325;
    }
    return gal.width() + parseInt(gal.find('li').css('margin-right'));
}

$(document).ready(function() {
    // Commons
    var navOffset       = $('header .navigation').offset().top;
    var scrollSpyPause  = false;
    
    // Scroll window
    $(window).scroll(function() {
        // Snap navigation bar
        if ($(window).scrollTop() > navOffset) {
            if (!$('header').hasClass('fixed')) {
                $('header').addClass('fixed');
                $('.scroll-to-top').fadeIn(350);
            }
        } else {
            if ($('header').hasClass('fixed')) {
                $('header').removeClass('fixed');
                $('.scroll-to-top').fadeOut(350);
            }
        }
        
        // Scroll spy
        if (!scrollSpyPause) {
            $('header .navigation a[href^="#"]').each(function() {
                var offset = $($(this).attr('href')).offset().top - 120;
                if (Math.abs($(window).scrollTop() - offset) < 100) {
                    $('header .navigation li.active').removeClass('active');
                    $(this).parents('li').addClass('active');
                }
            });
            $('header:not(.fixed) .navigation li.active').removeClass('active');
        }
    });
    
    // Navigation sections
    $('header .navigation a').click(function() {
        $('header .navigation li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        scrollSpyPause = true;
        $.scrollTo({top: $($(this).attr('href')).offset().top - 120, left: 0}, 1000, function() { scrollSpyPause = false; });
        return false;
    });
    
    // Portfolio gallery
    $('.gallery-nav').each(function() {
        // Commons
        var nav     = $(this);
        var gal     = $(nav.attr('data-gallery'));
        var ul      = gal.find('> ul');
        var prv     = nav.find('a.prev');
        var nxt     = nav.find('a.next');
        var min     = nav.find('a.minimize');
        
        // Refresh prev/next buttons, pages & active items
        nav.bind('refresh', function() {
            // Width
            var wid = targetWidth(gal);
            
            // Get number of items & current page
            var liCount = ul.find('> li').length;
            var page    = Math.round(parseInt(ul.css('margin-left')) / -wid);
            
            // Calculate number of pages according to gallery state (open)
            var pages   = gal.hasClass('open') ? liCount - 1 : Math.ceil(liCount * 196 / wid) - 1;
            
            // Set page/pages
            nav.data('pages', pages);
            nav.data('page', page);
            
            // Enable/disable prev/next according to page/pages
            if (page == 0) prv.addClass('inactive'); else prv.removeClass('inactive');
            if (page == pages) nxt.addClass('inactive'); else nxt.removeClass('inactive');
            
            // Set active item & minimized button
            ul.find('> li.active').removeClass('active');
            if (gal.hasClass('open')) {
                ul.find('> li').eq(page).addClass('active');
                min.removeClass('collapsed');
            } else {
                min.addClass('collapsed');
            }
        }).trigger('refresh');
        
        // Previous page button
        prv.bind('click', function() {
            var button = $(this);
            if (!button.hasClass('inactive')) {
                var wid = targetWidth(gal);
                ul.css('margin-left', (parseInt(nav.data('page')) - 1) * -wid);
                clearTimeout(button.data('slide-timeout'));
                button.data('slide-timeout', setTimeout(function() { nav.trigger('refresh'); }, 1000));
            }
            return false;
        });
        
        // Next page button
        nxt.bind('click', function() {
            var button = $(this);
            if (!button.hasClass('inactive')) {
                var wid = targetWidth(gal);
                ul.css('margin-left', (parseInt(nav.data('page')) + 1) * -wid);
                clearTimeout(button.data('slide-timeout'));
                button.data('slide-timeout', setTimeout(function() { nav.trigger('refresh'); }, 1000));
            }
            return false;
        });
        
        // Minimize button
        min.bind('click', function() {
            gal.find('li.active a').click();
            return false;
        });
        
        // Item click
        ul.find('> li > a').click(function() {
            var wid     = targetWidth(gal);
            var link    = $(this);
            var li      = link.parent('li');
            if (gal.hasClass('open')) {
                var idx = li.index();
                ul.css('margin-left', Math.floor(idx / 5) * -wid);
                gal.removeClass('open');
                clearTimeout(link.data('slide-timeout'));
                link.data('slide-timeout', setTimeout(function() { nav.trigger('refresh'); }, 1000));
            } else {
                var idx = li.index();
                ul.css('margin-left', idx * -wid);
                gal.addClass('open');
                clearTimeout(link.data('slide-timeout'));
                link.data('slide-timeout', setTimeout(function() { nav.trigger('refresh'); }, 1000));
            }
            return false;
        });
    });
    
    // Featured link
    $('a[data-featured-gallery][data-featured-index]').click(function() {
        var link = $(this);
        setTimeout(function() {
            $(link.attr('data-featured-gallery')).find('li').eq(link.attr('data-featured-index')).find('a').click();
        }, 1000);
    });
    
    // Scroll link
    $('a.s-scroll').click(function() {
        $.scrollTo({top: $($(this).attr('href')).offset().top - 120, left: 0}, 1000);
        return false;
    });
    
    // Scroll to top button
    $('.scroll-to-top').click(function() {
        $.scrollTo('header', 1000);
        return false;
    });
    
    // Skills progress bar
    $('.skill .wrapper[data-progress]').each(function() {
        $(this).width($(this).attr('data-progress'));
    });
    
    // Work experience
    $('.work-experience').each(function() {
        var exp     = $(this);
        var expFrom = parseInt(exp.attr('data-from'));
        var expTo   = parseInt(exp.attr('data-to'));
        var expAll  = expTo - expFrom;
        var layers  = exp.find('.layer').length;
        var works   = exp.find('.work').length;
        var lines   = $('<div class="lines"/>');
        var dots    = $('<div class="dots"/>');
        for(var i = 0; i <= expTo - expFrom; i++) {
            lines.append('<div class="line"/>');
            dots.append('<div class="dot"/>');
        }
        exp.prepend(dots);
        exp.prepend(lines);
        i = 0; exp.find('.lines .line').each(function() { $(this).height(layers * 53).css('left', i * 960 / expAll - (i == 0 ? 0 : 1)); i++; });
        i = 0; exp.find('.dots .dot').each(function() { $(this).attr('data-original-title', expFrom + i).attr('data-placement', 'bottom').addClass('s-tooltip').css('left', i * 960 / expAll - (i == 0 ? 0 : 1)); i++; });
        exp.find('.work').each(function() {
            var work        = $(this);
            var workFrom    = parseInt(work.attr('data-from'));
            var workTo      = parseInt(work.attr('data-to'));
            work.width(((workTo - workFrom) * 100 / expAll) + '%').css('left', ((workFrom - expFrom) * 100 / expAll) + '%');
        });
    });
    
    // Bootstrap
    $('.s-tooltip').tooltip();
});