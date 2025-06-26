
$(document).ready(function () {
    $('html, body').animate({
        scrollTop: nextScroll
    }, 1000, 'swing', function () {
        isScrolling = false;
    });
});

$(document).ready(function () {
    if (performance.navigation.type === 1) {
      $('#home')[0].scrollIntoView({ behavior: 'smooth' });
    }
});

$(document).ready(function () {
    let $sections = $('section');
    let isScrolling = false;

    $(window).on('wheel', function (e) {
        if (isScrolling) return;
        isScrolling = true;

        const delta = e.originalEvent.deltaY;
        const currentScroll = $(window).scrollTop();
        let nextScroll;

        let index = $sections.toArray().findIndex(section =>
            currentScroll >= $(section).offset().top - 10 &&
            currentScroll < $(section).offset().top + $(section).outerHeight()
        );

        if (delta > 0 && index < $sections.length - 1) {
            nextScroll = $($sections[index + 1]).offset().top;
        } else if (delta < 0 && index > 0) {
            nextScroll = $($sections[index - 1]).offset().top;
        } else {
            isScrolling = false;
            return;
        }

        $('html, body').animate({
            scrollTop: nextScroll
        }, 800, function () {
            isScrolling = false;
        });
    });
});

$(document).ready(function () {
    $('.active').on('click', function () {
        $('.active').removeClass('selected');
        $(this).addClass('selected');
    });
});

$(document).ready(function () {
    function checkVisibility() {
        $('.fade-in').each(function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop + 50 && elementTop < viewportBottom - 50) {
                $(this).addClass('show'); // Entra en pantalla
            } else {
                $(this).removeClass('show'); // Sale de pantalla
            }
        });
    }

    checkVisibility();
    $(window).on('scroll resize', checkVisibility);
});

$(document).ready(function () {
    const sections = $('section');
    const navLinks = $('.nav a');

    function updateActiveNav() {
        let currentPosition = $(window).scrollTop();

        sections.each(function () {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();

            if (currentPosition >= top && currentPosition < bottom) {
                const id = $(this).attr('id');
                navLinks.removeClass('selected');
                $('.nav a[href="#' + id + '"]').addClass('selected');
            }
        });
    }

    updateActiveNav(); // Al cargar
    $(window).on('scroll', updateActiveNav); // Al hacer scroll
});

