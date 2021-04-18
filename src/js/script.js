window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger'),
    menuLink = document.querySelectorAll('.menu_link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem, menuLink.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    });
})

$(document).ready(function(){
    new WOW().init();

    $('[data-modal=order]').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.modal_close').on('click', function() {
        $('.overlay, #order, #thanks').fadeOut('slow');
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожайлуста, введите своё имя",
                    minlength: jQuery.validator.format("Минимальное количество символов {0}!")
                },
                phone: "Пожайлуста введите номер телефона",
                email: {
                  required: "Пожайлуста, введите свою почту",
                  email: "Неправильно введенна почта"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $("a[href=#start], a[href=#require], a[href=#footer]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});