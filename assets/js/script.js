$(document).ready(function() {
    // Hamburguer menu toggle
    $('.hamburger-1').click(function() {
        $(this).toggleClass('active');
        $('.nav-links-1').toggleClass('active');
        $('.sidenav-overlay-1').toggleClass('active');
    });

    // Close menu when clicking overlay
    $('.sidenav-overlay-1').click(function() {
        $('.hamburger-1').removeClass('active');
        $('.nav-links-1').removeClass('active');
        $(this).removeClass('active');
    });

    // Close menu when clicking a link
    $('.nav-links-1 li a').click(function() {
        $('.hamburger-1').removeClass('active');
        $('.nav-links-1').removeClass('active');
        $('.sidenav-overlay-1').removeClass('active');
    });

    // Smooth scroll
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Función para inicializar los acordeones
    function initAccordion() {
        // Por defecto, todas las respuestas están cerradas
        $('.faq-answer').removeClass('open');
        $('.faq-icon').removeClass('open');
        
        // Evento click en las preguntas
        $('.faq-question').off('click').on('click', function() {
            // Obtener elementos relacionados
            const $question = $(this);
            const $item = $question.closest('.faq-item');
            const $answer = $item.find('.faq-answer');
            const $icon = $question.find('.faq-icon');
            
            // Verificar si este item está abierto
            const isOpen = $answer.hasClass('open');
            
            if (isOpen) {
                // Cerrar este item
                $answer.removeClass('open');
                $icon.removeClass('open');
            } else {
                // Opcional: cerrar otros abiertos (comportamiento de acordeón)
                // Si quieres que solo uno esté abierto a la vez, descomenta estas líneas:
                // $('.faq-answer').removeClass('open');
                // $('.faq-icon').removeClass('open');
                
                // Abrir este item
                $answer.addClass('open');
                $icon.addClass('open');
            }
        });
    }
    
    // Inicializar el acordeón
    initAccordion();
    
    // Evento para el botón de contacto
    $('.faq-contact-btn').on('click', function() {
        alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
        // Aquí puedes redirigir a una página de contacto
        // window.location.href = '/contacto';
    });
    
    // Opcional: Manejar cambios de tamaño de ventana
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalcular alturas si es necesario
            console.log('Ventana redimensionada');
        }, 250);
    });
    
    // Opcional: Abrir un item específico (por ejemplo, desde URL)
    // const urlParams = new URLSearchParams(window.location.search);
    // const faqToOpen = urlParams.get('faq');
    // if (faqToOpen) {
    //     $(`.faq-item:eq(${faqToOpen - 1}) .faq-question`).trigger('click');
    // }

});