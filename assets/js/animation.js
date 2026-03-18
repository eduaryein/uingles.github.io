$(document).ready(function() {
    
    // Función para verificar si un elemento está visible en la ventana
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para verificar si el elemento está cerca del viewport (para activar antes)
    function isElementNearViewport(el) {
        var rect = el.getBoundingClientRect();
        var buffer = 150; // Activar cuando esté a 150px de entrar
        
        return (
            rect.top <= (window.innerHeight + buffer) &&
            rect.bottom >= -buffer
        );
    }
    
    // Función de animación de números
    function animateNumber($element, targetNumber, suffix = '') {
        // Extraer el número actual (si ya fue animado, no hacer nada)
        if ($element.data('animated')) return;
        
        // Marcar como animado
        $element.data('animated', true);
        
        // Extraer el número base sin formato
        var targetValue = targetNumber;
        
        // Si el elemento tiene formato especial (40K+), manejar diferente
        var hasKFormat = $element.find('b').length > 0;
        var $numberElement = hasKFormat ? $element.find('b') : $element;
        
        // Valor inicial
        var startValue = 0;
        
        // Duración de la animación en ms
        var duration = 2000;
        
        // Contador de animación
        $({ Counter: startValue }).animate({
            Counter: targetValue
        }, {
            duration: duration,
            easing: 'swing',
            step: function() {
                var currentValue = Math.ceil(this.Counter);
                
                if (hasKFormat) {
                    // Para 40K+
                    $numberElement.text(currentValue);
                } else {
                    // Para 96%
                    $element.text(currentValue + suffix);
                }
            },
            complete: function() {
                if (hasKFormat) {
                    $numberElement.text(targetValue);
                } else {
                    $element.text(targetValue + suffix);
                }
            }
        });
    }
    
    // Configurar los elementos a animar
    function setupNumberAnimation() {
        // Columna 1: 40K+
        var $col1 = $('.wx-estadistica-item').eq(0);
        var $num1 = $col1.find('.wx-estadistica-numero strong');
        animateNumber($num1, 40, 'K+');
        
        // Columna 2: 96%
        var $col2 = $('.wx-estadistica-item').eq(1);
        var $num2 = $col2.find('.wx-estadistica-numero strong');
        animateNumber($num2, 96, '%');
    }
    
    // Resetear animación (útil si quieres que se reinicie al hacer scroll)
    function resetNumbers() {
        $('.wx-estadistica-numero strong').data('animated', false);
        
        // Restablecer valores iniciales (opcional)
        $('.wx-estadistica-item').eq(0).find('.wx-estadistica-numero strong').html('<b>0</b>K+');
        $('.wx-estadistica-item').eq(1).find('.wx-estadistica-numero strong').html('<b>0</b>%');
    }
    
    // Variable para controlar si ya se activó la animación
    var animationTriggered = false;
    
    // Función para verificar scroll y activar animación
    function checkScroll() {
        // Si la animación ya fue activada, no hacer nada
        if (animationTriggered) return;
        
        var $estadisticasSection = $('.wx-row.estadistica-scroll').first();
        
        // Verificar si la sección está cerca del viewport
        if (isElementNearViewport($estadisticasSection[0])) {
            animationTriggered = true;
            
            // Pequeño retraso para asegurar que el elemento está visible
            setTimeout(function() {
                setupNumberAnimation();
            }, 600);
        }
    }
    
    // Opción 1: Animar solo una vez cuando la sección entra al viewport
    $(window).on('scroll', function() {
        checkScroll();
    });
    
    // Verificar en carga inicial
    checkScroll();

    var style = `
        <style>
            .wx-estadistica-numero strong {
                display: inline-block;
                transition: all 0.3s ease;
                font-size: 1.2em;
            }
            
            /* Efecto de pulso suave al terminar la animación */
            .wx-estadistica-numero strong.animated {
                animation: numberPulse 0.5s ease;
            }
            
            @keyframes numberPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        </style>
    `;
    
    $('head').append(style);
    
    
});