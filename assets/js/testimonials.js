// Slider functionality
$(document).ready(function() {
    const $track = $('#testimonialsTrack');
    const $prevBtn = $('#prevBtn');
    const $nextBtn = $('#nextBtn');
    const $dots = $('.dot');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 3;
    let totalCards = $('.testimonial-card').length;
    let maxIndex = 0;
    
    // Calcular el ancho de las tarjetas y la cantidad visible
    function calculateDimensions() {
        const containerWidth = $('.testimonials-slider-container').width();
        
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 992) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        
        // El gap es de 30px
        const totalGap = 30 * (cardsPerView - 1);
        cardWidth = (containerWidth - totalGap) / cardsPerView;
        
        // Establecer el ancho de cada tarjeta
        $('.testimonial-card').css('flex', `0 0 ${cardWidth}px`);
        
        maxIndex = Math.max(0, totalCards - cardsPerView);
        
        // Actualizar dots
        updateDots();
    }
    
    // Mover el slider
    function moveSlider(index) {
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        const moveAmount = currentIndex * (cardWidth + 30); // 30px es el gap
        $track.css('transform', `translateX(-${moveAmount}px)`);
        
        // Actualizar dots activos
        $dots.removeClass('active');
        const dotIndex = Math.floor(currentIndex / cardsPerView);
        if ($dots[dotIndex]) {
            $dots.eq(dotIndex).addClass('active');
        }
    }
    
    // Actualizar dots
    function updateDots() {
        const dotsCount = Math.ceil(totalCards / cardsPerView);
        $dots.each(function(index) {
            if (index < dotsCount) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // Event Listeners
    $prevBtn.on('click', function() {
        moveSlider(currentIndex - 1);
    });
    
    $nextBtn.on('click', function() {
        moveSlider(currentIndex + 1);
    });
    
    $dots.on('click', function() {
        const dotIndex = $(this).index();
        moveSlider(dotIndex * cardsPerView);
    });
    
    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            moveSlider(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            moveSlider(currentIndex + 1);
        }
    });
    
    // Auto-slide cada 5 segundos
    let autoSlide = setInterval(function() {
        if (currentIndex < maxIndex) {
            moveSlider(currentIndex + 1);
        } else {
            moveSlider(0);
        }
    }, 5000);
    
    // Pausar auto-slide al hacer hover
    $('.testimonials-slider-container').on('mouseenter', function() {
        clearInterval(autoSlide);
    }).on('mouseleave', function() {
        autoSlide = setInterval(function() {
            if (currentIndex < maxIndex) {
                moveSlider(currentIndex + 1);
            } else {
                moveSlider(0);
            }
        }, 5000);
    });
    
    // Recalcular al redimensionar
    $(window).on('resize', function() {
        calculateDimensions();
        moveSlider(0);
    });
    
    // Inicializar
    calculateDimensions();
    moveSlider(0);
});